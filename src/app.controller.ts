import { Controller, Get, Render } from '@nestjs/common';
import { AppService, getTuzfalEntries } from './app.service.js';
import { TuzfalEntry } from './models.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  async getHello() {
    const tuzfalEntries: TuzfalEntry[] = await getTuzfalEntries();

    return {
      data: tuzfalEntries
    }
  }
}
