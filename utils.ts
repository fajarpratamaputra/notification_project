// utils.ts

import nodemailer from 'nodemailer';

// Placeholder for generating a unique promo code
export function generateUniquePromoCode(): string {
    // Characters that can be used in the promo code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    // Length of the promo code
    const codeLength = 8;
  
    let promoCode = '';
  
    // Generate a random promo code
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      promoCode += characters.charAt(randomIndex);
    }
  
    // This is a placeholder and should be replaced with actual logic to ensure uniqueness
    // For simplicity, let's assume the generated code is always unique in this example
    return promoCode;
  }
  
  // Placeholder for sending an email
export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }): Promise<void> {
    // Create a nodemailer transporter using your email service provider details
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Update with your email service provider
      auth: {
        user: 'your_email@gmail.com', // Replace with your email
        pass: 'your_email_password', // Replace with your email password
      },
    });
  
    // Email options
    const mailOptions = {
      from: 'your_email@gmail.com', // Replace with your email
      to,
      subject,
      text: body,
    };
  
    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      throw error;
    }
  }