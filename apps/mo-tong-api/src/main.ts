import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

expand(dotenv.config());

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  AllExceptionsFilter,
  LoggingInterceptor,
  TransformInterceptor,
} from '@app/share';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('Mo-Tong API')
    .setDescription('Mo-Tong 学习规划应用 API 文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.APP_PORT ?? 3000;
  await app.listen(port);
  logger.log(`🚀 Mo-Tong 主应用已启动 → http://localhost:${port}`);
  logger.log(`📚 Swagger 文档 → http://localhost:${port}/api-docs`);
}
bootstrap();
