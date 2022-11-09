import fs from 'fs/promises';
import path from 'path';
import { FileMigrationProvider, Kysely, Migrator, sql, SqliteDialect } from 'kysely';
import Database from 'better-sqlite3';
import { Database as DatabaseInit } from './db';

export const getConnection = async () => {
  const db = new Kysely<DatabaseInit>({
    dialect: new SqliteDialect({
      database: new Database(':memory:'),
    }),
  });
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.resolve('src/kysely/migrations'),
    }),
  });
  await migrator.migrateToLatest();

  const customers = await fs.readFile(path.resolve('data/customers.sql'), 'utf8');
  await sql`${sql.raw(customers)}`.execute(db);
  const employees = await fs.readFile(path.resolve('data/employees.sql'), 'utf8');
  await sql`${sql.raw(employees)}`.execute(db);
  const orders = await fs.readFile(path.resolve('data/orders.sql'), 'utf8');
  await sql`${sql.raw(orders)}`.execute(db);
  const suppliers = await fs.readFile(path.resolve('data/suppliers.sql'), 'utf8');
  await sql`${sql.raw(suppliers)}`.execute(db);
  const products = await fs.readFile(path.resolve('data/products.sql'), 'utf8');
  await sql`${sql.raw(products)}`.execute(db);
  const orderDetails = await fs.readFile(path.resolve('data/order_details.sql'), 'utf8');
  await sql`${sql.raw(orderDetails)}`.execute(db);

  return db;
};
