/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
// import * as config from './console.json';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  const configService: ConfigService = app.get(ConfigService);


  const adminConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };


  // admin.initializeApp({
  //   credential: admin.credential.cert(config),
  //   databaseURL: "https://blog-e410e-default-rtdb.firebaseio.com"
  // });


}
bootstrap();
