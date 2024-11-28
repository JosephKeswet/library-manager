import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';
import { IResponse } from 'src/shared/types';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private data: PrismaService) {}

  async getUser(userId: string): Promise<IResponse> {
    console.log('userId', userId);
    const { password, ...user } = await this.data.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });
    return {
      data: user,
      message: 'User details retrieved',
      status: 200,
    };
  }
}
