import { NestFactory } from '@nestjs/core';
import { AiModule } from './ai.module';
import { LoggingInterceptor, TransformInterceptor } from '@app/share';

async function bootstrap() {
  const app = await NestFactory.create(AiModule);

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
