import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from 'src/shared/dto';
import { AuthGuard } from 'src/shared';
import { Response } from 'express';
import { IResponse } from 'src/shared/types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const response: IResponse = await this.authService.signIn(signInDto);

    return res.status(response.status).json(response);
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const response: IResponse = await this.authService.signUp(signUpDto);
    return res.status(response.status).json(response);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
