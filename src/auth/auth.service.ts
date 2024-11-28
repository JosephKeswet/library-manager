import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared';
import { SignInDto, SignUpDto } from 'src/shared/dto';
import { IResponse } from 'src/shared/types';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private data: PrismaService,
  ) {}
  async signIn(signInDto: SignInDto): Promise<IResponse> {
    const user = await this.data.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        status: 404,
      };
    }

    const correctPassword: boolean = await argon2.verify(
      user.password,
      signInDto.password,
    );

    if (!correctPassword) {
      return {
        message: `You entered an incorrect login Password, please try again or click on 'Forgot Password'`,
        status: 400,
      };
    }
    const { password, ...result } = user;
    const jwtPayload = {
      id: user.id,
      email: user.email,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return {
      data: result,
      message: 'Logged in successfully',
      status: 200,
      token,
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<IResponse> {
    const password = await argon2.hash(signUpDto.password);
    const username = signUpDto.username;
    const email = signUpDto.email;

    const existingUser = await this.data.user.findUnique({
      where: {
        username,
        email,
      },
    });
    if (existingUser) {
      return {
        message: 'Username or email already exists',
        status: 409,
      };
    }
    const { password: userPassword, ...user } = await this.data.user.create({
      data: {
        email,
        username,
        password,
      },
    });
    return {
      data: user,
      message: 'User created successfully',
      status: 200,
    };
  }
}
