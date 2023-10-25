import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ExecFileOptions } from 'child_process';
import { Request, Response } from 'express';

@Catch()
export class CognitoExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(400)
      .json({
        statusCode: 400,
        message: exception.message,
      });
  }
}