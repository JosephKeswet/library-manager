import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail({
    message,
    subject,
    to,
  }: {
    message: string;
    to: string;
    subject: string;
  }) {
    // const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;

    this.mailService.sendMail({
      from: 'Joseph Keswet <jhezekiah19@@gmail.com>',
      to,
      subject,
      text: message,
    });
  }
}
