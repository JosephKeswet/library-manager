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

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService, PrismaService],
})
export class AppModule {}
