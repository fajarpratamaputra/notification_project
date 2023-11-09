// models.ts

// Placeholder for the User model
export class User {
    userId: number;
    email: string;
    verifiedStatus: boolean;
    dateOfBirth: Date;
  
    constructor({ userId, email, verifiedStatus, dateOfBirth }: Partial<User> = {}) {
      this.userId = userId || 0;
      this.email = email || '';
      this.verifiedStatus = verifiedStatus || false;
      this.dateOfBirth = dateOfBirth || new Date();
    }
  }
  
  // Placeholder for the Promo model
  export class Promo {
    promoId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    validUsersID: number[];
    promoCode: string;
  
    constructor({ promoId, name, startDate, endDate, amount, validUsersID, promoCode }: Partial<Promo> = {}) {
      this.promoId = promoId || 0;
      this.name = name || '';
      this.startDate = startDate || new Date();
      this.endDate = endDate || new Date();
      this.amount = amount || 0;
      this.validUsersID = validUsersID || [];
      this.promoCode = promoCode || '';
    }
  }
  