import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './shared';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    UsersModule,
    BooksModule,
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'sandbox.smtp.mailtrap.io',
    //     // host: process.env.EMAIL_HOST,
    //     port: 25,
    //     auth: {
    //       // user: process.env.EMAIL_USERNAME,
    //       user: '01b7c47ecdc7d9',
    //       pass: '19f6dc58267985',
    //       // pass: process.env.EMAIL_PASSWORD,
    //     },
    //   },
    // }),
  ],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, PrismaService, EmailService],
})
export class AppModule {}
