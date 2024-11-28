import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
