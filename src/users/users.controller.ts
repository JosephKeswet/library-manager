import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IResponse } from 'src/shared/types';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/shared';
import { GetUserDto } from 'src/shared/dto/user';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get('')
  async getUser(@Query() params: GetUserDto) {
    const response = await this.userService.getUser(params.userId);
    return response;
  }
}
