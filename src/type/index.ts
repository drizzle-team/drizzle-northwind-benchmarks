import path from 'path';
import fs from 'fs';
import { DataSource } from 'typeorm';
import { Customer } from './entities/customers';
import { Detail } from './entities/details';
import { Employee } from './entities/employees';
import { Order } from './entities/orders';
import { Product } from './entities/products';
import { Supplier } from './entities/suppliers';

export const getConnection = async () => {
  const ds = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [Customer, Employee, Supplier, Order, Product, Detail],
    synchronize: true,
  });
  await ds.initialize();
  const queryRunner = await ds.createQueryRunner();

  const customers = fs.readFileSync(path.resolve('data/customers.sql'), 'utf8');
  await queryRunner.manager.query(customers);
  const employees = fs.readFileSync(path.resolve('data/employees.sql'), 'utf8');
  await queryRunner.manager.query(employees);
  const orders = fs.readFileSync(path.resolve('data/orders.sql'), 'utf8');
  await queryRunner.manager.query(orders);
  const suppliers = fs.readFileSync(path.resolve('data/suppliers.sql'), 'utf8');
  await queryRunner.manager.query(suppliers);
  const products = fs.readFileSync(path.resolve('data/products.sql'), 'utf8');
  await queryRunner.manager.query(products);
  const orderDetails = fs.readFileSync(path.resolve('data/order_details.sql'), 'utf8');
  await queryRunner.manager.query(orderDetails);

  return ds;
};
