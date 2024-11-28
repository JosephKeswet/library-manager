import { Injectable } from '@nestjs/common';
import { Genre } from '@prisma/client';
import { BookDto, FilterBooksDto, PrismaService } from 'src/shared';
import { IResponse } from 'src/shared/types';
import { isValidGenre } from 'src/utils';

@Injectable()
export class BooksService {
  constructor(private data: PrismaService) {}

  async createBook(bookDto: BookDto): Promise<IResponse> {
    const { userId, title, author, genre } = bookDto;

    const userExists = await this.data.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExists) {
      return {
        message: 'User not found',
        status: 404,
      };
    }
    const bookIdentifier = `${userId}${title}`;

    const [libraryExists, bookExists] = await Promise.all([
      this.data.library.findFirst(),
      this.data.book.findUnique({
        where: {
          bookIdentifier,
        },
      }),
    ]);
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

    if (!isValidGenre(genre)) {
      return {
        message: 'Invalid genre',
        status: 400,
      };
    }

    const book = await this.data.book.create({
      data: {
        title: bookDto.title,
        author: bookDto.author,
        genre: bookDto.genre,
        userId: bookDto.userId,
        libraryId: libraryExists?.id,
        bookIdentifier,
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
    if (!isValidGenre(params.genre)) {
      return {
        message: 'Invalid genre',
        status: 400,
      };
    }
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
