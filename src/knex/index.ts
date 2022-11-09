import knex from 'knex';
import path from 'node:path';
import fs from 'fs';

export const getConnection = async () => {
  const db = knex({
    client: 'better-sqlite3', // 'sqlite3'
    connection: {
      filename: ':memory:',
    },
    migrations: {
      tableName: 'migrations',
      directory: 'src/knex/migrations',
    },
    useNullAsDefault: true,
  });
  await db.migrate.latest();
  const customers = fs.readFileSync(path.resolve('data/customers.sql'), 'utf8');
  await db.raw(customers);
  const employees = fs.readFileSync(path.resolve('data/employees.sql'), 'utf8');
  await db.raw(employees);
  const orders = fs.readFileSync(path.resolve('data/orders.sql'), 'utf8');
  await db.raw(orders);
  const suppliers = fs.readFileSync(path.resolve('data/suppliers.sql'), 'utf8');
  await db.raw(suppliers);
  const products = fs.readFileSync(path.resolve('data/products.sql'), 'utf8');
  await db.raw(products);
  const orderDetails = fs.readFileSync(path.resolve('data/order_details.sql'), 'utf8');
  await db.raw(orderDetails);
  return db;
};
