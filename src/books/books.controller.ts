import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard, BookDto, FilterBooksDto } from 'src/shared';
import { BooksService } from './books.service';

@UseGuards(AuthGuard)
@Controller('book')
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Post('create')
  async createBook(@Body() bookDto: BookDto, @Res() res: Response) {
    const response = await this.bookService.createBook(bookDto);

    return res.status(response.status).json(response);
  }

  @Get('get')
  async getAllBooks(@Res() res: Response, @Query() params?: FilterBooksDto) {
    if (params) {
      const response = await this.bookService.getFilteredBooks(params);
      return res.status(response.status).json(response);
    }
    const response = await this.bookService.getAllBooks();

    return res.status(response.status).json(response);
  }
}
