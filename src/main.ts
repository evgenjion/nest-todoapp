import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './middlewares/http-exceptions.filter';

async function bootstrap() {
  // TODO: fastify?
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('v1'); // possible to exclude some handlers
  app.useGlobalPipes(new ValidationPipe()); // validation https://docs.nestjs.com/techniques/validation
  app.useGlobalFilters(new HttpExceptionFilter());
  app.set('trust proxy'); // TODO: fastify trust proxy

  await app.listen(3000);
}
bootstrap();
