import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared';
import { SignInDto, SignUpDto } from 'src/shared/dto';
import { IResponse } from 'src/shared/types';
import * as argon2 from 'argon2';
import { MailService } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private data: PrismaService,
    private mailService: MailService,
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
    const { email, username, password } = signUpDto;

    // Check if email or username already exists
    const existingUser = await this.data.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? 'Email' : 'Username';
      return {
        message: `${conflictField} already exists`,
        status: 409,
      };
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create new user
    const { password: userPassword, ...user } = await this.data.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    // this.mailService.sendMail({
    //   message: `Welcome to the Library System, ${username}! Please verify your email address by clicking on the link below:
    //   http://localhost:3000/verify-email/${user.id}`,
    //   to: 'jhezekiah19@gmail.com',
    //   subject: 'Library System - Verify Email',
    // });

    return {
      data: user,
      message: 'User created successfully',
      status: 200,
    };
  }

  async verifyEmail(email: string): Promise<IResponse> {
    return;
  }
}
