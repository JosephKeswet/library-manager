// email.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // service: 'Gmail',
      // auth: {
      //   user: 'jhezekiah19@gmail.com',
      //   pass: 'qcqqsdzdwzkyzjwr',
      // },
      auth: {
        user: '01b7c47ecdc7d9',
        pass: '19f6dc58267985',
      },

      host: 'sandbox.smtp.mailtrap.io',
    });
  }

  async sendEmail({
    to,
    subject,
    text,
  }: {
    to: string;
    subject: string;
    text: string;
  }) {
    const mailOptions = {
      from: 'jhezekiah19@gmail.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        msg: 'Email sent successfully',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
