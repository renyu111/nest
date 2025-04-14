import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('wechat')
  async sendToWechat(@Query() query: Record<string, any>): Promise<string> {
    return this.appService.sendToWechat(query);
  }
}
