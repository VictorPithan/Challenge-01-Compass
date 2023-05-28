import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Api Infos')
@Controller({ path: 'api', version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getInfos() {
    return {
      environment: process.env.ENV,
      version: process.env.VERSION
    };
  }
}
