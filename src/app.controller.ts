import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import mysql from 'mysql2/promise';
import { TuzfalEntry } from './models.js';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tuzfal',
});


export async function getTuzfalEntries() {
  const [results] = await mysqlConnection.execute(
    'SELECT * FROM blocklist',
  );

  const rows = results as TuzfalEntry[];
  return rows;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      data: getTuzfalEntries()
    }
  }
}
