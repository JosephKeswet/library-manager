import { Genre } from '@prisma/client';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsInt()
  libraryId: number;
}

export class FilterBooksDto {
  @IsNotEmpty()
  @IsString()
  genre: Genre;
}
