import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { TuzfalEntry } from './models.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tuzfal',
});


export async function getTuzfalEntries() {
  const [results] = await mysqlConnection.execute(
    'SELECT * FROM blocklist'
  );

  const rows = results as TuzfalEntry[];
  return rows;
}

export async function postTuzfalEntry(item: TuzfalEntry) {
  const [results] = await mysqlConnection.execute(
    'INSERT INTO blocklist (id, priority, mac, enabled) VALUES (?, ?, ?, ?)',
    [item.id, item.priority, item.mac, item.enabled]
  );
}
