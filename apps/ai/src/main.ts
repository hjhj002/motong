import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

expand(dotenv.config());

import { NestFactory } from '@nestjs/core';
import { AiModule } from './ai.module';
import { Logger } from '@nestjs/common';
import {
  AllExceptionsFilter,
  LoggingInterceptor,
  TransformInterceptor,
} from '@app/share';

async function bootstrap() {
  const app = await NestFactory.create(AiModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  const port = process.env.AI_PORT ?? 3001;
  await app.listen(port);
  logger.log(`🤖 AI 微服务已启动 → http://localhost:${port}`);
}
bootstrap();
