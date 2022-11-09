import { SQLiteConnector } from 'drizzle-orm-sqlite';
import Database from 'better-sqlite3';

export const getConnection = async () => {
  const connect = new SQLiteConnector(new Database('src/drizzle/drizzle.db'));
  return connect.connect();
};
