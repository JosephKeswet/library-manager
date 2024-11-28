import { Genre } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  genre: Genre;

  @IsNotEmpty()
  @IsString()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  libraryId: number;
}
