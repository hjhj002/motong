import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { formatDate } from '../utils/date.util';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let code: number;
    let message: string;

    if (exception instanceof HttpException) {
      code = exception.getStatus();
      const res = exception.getResponse();
      message =
        typeof res === 'string'
          ? res
          : (res as any).message || exception.message;
      if (Array.isArray(message)) {
        message = (message as string[]).join('; ');
      }
    } else {
      code = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '服务器内部错误';
    }

    this.logger.error(
      `${code} - ${message}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(code).json({
      code,
      message,
      data: null,
      timestamp: formatDate(),
    });
  }
}
