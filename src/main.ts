import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // await app.listen(3000, '0,0,0,0');
  app.use('/upload', express.static(join(__dirname, '../upload')));
  await app.listen(8000);
}
bootstrap();
