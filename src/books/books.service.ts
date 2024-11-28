import { Injectable } from '@nestjs/common';
import { BookDto, FilterBooksDto, PrismaService } from 'src/shared';
import { IResponse } from 'src/shared/types';

@Injectable()
export class BooksService {
  constructor(private data: PrismaService) {}

  async createBook(bookDto: BookDto): Promise<IResponse> {
    // Check if any library exists
    const libraryExists = await this.data.library.findFirst();
    const bookExists = await this.data.book.findUnique({
      where: {
        title: bookDto.title,
      },
    });
    // If no library exists, create one (optional based on your logic)
    if (!libraryExists) {
      await this.data.library.create({
        data: {},
      });
    }

    if (bookExists) {
      return {
        message: 'Book already exists',
        status: 409,
      };
    }

    const book = await this.data.book.create({
      data: {
        title: bookDto.title,
        author: bookDto.author,
        genre: bookDto.genre,
        userId: bookDto.userId,
        libraryId: libraryExists?.id,
      },
    });
    return {
      data: book,
      message: 'Book created successfully',
      status: 200,
    };
  }

  async getAllBooks(): Promise<IResponse> {
    try {
      const books = await this.data.book.findMany();
      return {
        data: books,
        message: 'Books fetched successfully',
        status: 200,
      };
    } catch (err) {
      return {
        message: "Couldn't find books",
        status: 400,
      };
    }
  }
  async getFilteredBooks(params: FilterBooksDto): Promise<IResponse> {
    try {
      const books = await this.data.book.findMany({
        where: {
          genre: params.genre,
        },
      });

      if (books.length === 0) {
        return {
          message: 'No books found',
          data: books,
          status: 201,
        };
      }
      return {
        data: books,
        message: 'Books fetched successfully',
        status: 200,
      };
    } catch (err) {
      return {
        message: "Couldn't find books",
        status: 400,
      };
    }
  }
}
