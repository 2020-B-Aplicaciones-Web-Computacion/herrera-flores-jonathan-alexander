import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Query,
  Req,
  Res,
  Session
} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  @Get()
  getHello(
      @Res()
      response
  ){
    response.redirect("/fabricante/fabricantes");
  }
}