import { connectToDatabase } from './database';
import { User, Promo } from './models';
import { generateUniquePromoCode, sendEmail } from './utils';

interface UserFilterField {
  email?: string;
  verifiedStatus?: boolean;
  isBirthday?: boolean;
}

interface CreatePromoField {
  name: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  validUsersID: number[];
}

interface NotificationParams {
  notificationType: string;
  subject: string;
  body: string;
  target: { email?: string; phoneNumber?: string };
}

async function fetchUsers({ email, verifiedStatus, isBirthday }: UserFilterField): Promise<User[]> {
  const connection = await connectToDatabase();
  let queryString = `SELECT * FROM users`;

  if (email) {
    queryString += ` WHERE email = '${email}'`;
  }

  if (verifiedStatus !== undefined) {
    queryString += ` AND verified_status = ${verifiedStatus}`;
  }

  if (isBirthday !== undefined) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    queryString += ` WHERE MONTH(date_of_birth) = ${currentMonth} AND DAY(date_of_birth) = ${currentDay}`;
  }

  const result = await connection.query(queryString);
  const users: User[] = [];

  for (const row of result) {
    users.push(new User({
      userId: row.user_id,
      email: row.email,
      verifiedStatus: row.verified_status,
      dateOfBirth: row.date_of_birth,
    }));
  }

  await connection.close();
  return users;
}

async function generatePromoCode({ name, startDate, endDate, amount, validUsersID }: CreatePromoField): Promise<Promo> {
  const promoCode = generateUniquePromoCode();
  const promo = new Promo({
    name,
    startDate,
    endDate,
    amount,
    validUsersID,
    promoCode,
  });

  const connection = await connectToDatabase();
  await connection.query(`
    INSERT INTO promos (name, start_date, end_date, amount, valid_users_id, promo_code)
    VALUES ('${promo.name}', '${promo.startDate}', '${promo.endDate}', ${promo.amount}, '${JSON.stringify(promo.validUsersID)}', '${promo.promoCode}')
  `);

  await connection.close();
  return promo;
}

async function sendNotification({ notificationType, subject, body, target }: NotificationParams): Promise<void> {
  if (notificationType === 'email') {
    await sendEmail({
      to: target.email ?? '',
      subject,
      body,
    });
  } else if (notificationType === 'whatsapp') {
    throw new Error('WhatsApp notifications are not implemented yet.');
  } else {
    throw new Error(`Invalid notification type: ${notificationType}`);
  }
}
