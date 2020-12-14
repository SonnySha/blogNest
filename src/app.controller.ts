/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET
  @Get('/welcome')
  getWelcome(): object {
    return ['Valentin', 'Julien'];
  }

  // POST
  @Post('/ok')
  postOk(): string {
    return 'ok';
  }

  // POST
  @Post('/hello/:prenom')
  postHello(@Param('id') prenom: string): string {
    return prenom;
  }

  // POST
  @Post('/message')
  postMessage(@Body() body): string {
    return body.message;
  }

}
