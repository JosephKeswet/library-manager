import { HttpStatus } from '@nestjs/common';

export type ISuccessResponse = {
  message: string;
  token?: string;
  data: Record<string, any> | string | number;
  status?: HttpStatus;
};

export type IErrorResponse = {
  status?: HttpStatus;
  message: string;
  error?: null;
};
export type IResponse = ISuccessResponse | IErrorResponse;
