import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService, getTuzfalEntries, postTuzfalEntry } from './app.service.js';
import type { TuzfalDto, TuzfalEntry } from './models.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("index")
  @Render('index')
  async getHello() {
    const tuzfalEntries: TuzfalEntry[] = (await getTuzfalEntries())
      .toSorted(
        (a, b) => a.priority - b.priority
      );

    return {
      data: tuzfalEntries
    }
  }

  @Post("index")
  @Render('index')
  async postHello(@Body() body: TuzfalDto) {
    const tuzfalEntries: TuzfalEntry[] = (await getTuzfalEntries())
      .toSorted(
        (a, b) => a.priority - b.priority
      );

    const tuzfal: TuzfalEntry = {
      id: Math.max(...tuzfalEntries.map(item => item.id)) + 1,
      priority: parseInt(body.priority),
      mac: body.mac,
      enabled: body.enabled == "on" ? true : false
    }

    await postTuzfalEntry(tuzfal);

    return { data: await getTuzfalEntries() };
  }
}
