/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogControllerController } from './blog-controller/blog-controller.controller';
import { BlogService } from './blog/blog.service';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AppController, BlogControllerController],
  providers: [AppService, BlogService],
})
export class AppModule { }
