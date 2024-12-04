import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared';
import { SignInDto, SignUpDto, verificationDto } from 'src/shared/dto';
import { IResponse } from 'src/shared/types';
import * as argon2 from 'argon2';
import { EmailService } from 'src/email/email.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private data: PrismaService,
    private emailService: EmailService,
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
    if (user.isVerified === false) {
      return {
        message: 'Please verify your account',
        status: 400,
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

    if (
      existingUser &&
      existingUser.email === email &&
      existingUser.username === username
    ) {
      return {
        message: 'Email and Username already exists',
        status: 409,
      };
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // otp
    const otp = crypto.randomBytes(40).toString('hex');
    const hasedOtp = await argon2.hash(otp);

    // Create new user
    const { password: userPassword, ...user } = await this.data.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        verificationOtp: hasedOtp,
      },
    });

    await this.emailService.sendEmail({
      text: `Welcome to the Library System, ${username}! Please verify your email address by clicking on the link below:
      http://localhost:3000/verify-email/${otp}`,
      to: `${user.email}`,
      subject: 'Library System - Verify Email',
    });

    return {
      data: user,
      message: 'User created successfully',
      status: 200,
    };
  }

  async verifyOtp(verificationDto: verificationDto): Promise<IResponse> {
    const { email, verificationOtp } = verificationDto;

    // Check if email exists
    const user = await this.data.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        message: 'No user with email please sign up!!!!!',
        status: 409,
      };
    }

    const isOtpVerified = await argon2.verify(
      user.verificationOtp,
      verificationOtp,
    );

    if (!isOtpVerified) {
      return {
        message: 'Invalid otp',
        status: 403,
      };
    }

    await this.data.user.update({
      where: { email },
      data: {
        isVerified: true,
        verificationOtp: '',
      },
    });

    const jwtPayload = {
      id: user.id,
      email: user.email,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return {
      message: 'User has been verified',
      token,
      status: 200,
    };
  }
}
