import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Module({
  providers: [PrismaService],
})
export class BooksModule {}
