import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'node:path';

export const getConnection = () => {
  const db = new Database(':memory:');
  const migration = fs.readFileSync(path.resolve('data/createTb.sql'), 'utf8');
  db.exec(migration);
  const data = fs.readFileSync(path.resolve('data/allTablesData.sql'), 'utf8');
  db.exec(data);
  return db;
};
