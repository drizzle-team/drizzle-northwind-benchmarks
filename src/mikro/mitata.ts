import { run, bench } from 'mitata';
import { Customer } from './entities/customers';
import { Detail } from './entities/details';
import { Employee } from './entities/employees';
import { Order } from './entities/orders';
import { Product } from './entities/products';
import { Supplier } from './entities/suppliers';
import { getConnection } from './index';

export const startMikroOrmBenches = async () => {
  const db = await getConnection();
  const count = new Array(100);

  bench('MikroORM Customers: getAll', async () => {
    for (const i of count) await db.find(Customer, {});
  });
  bench('MikroORM Customers: getInfo', async () => {
    for (const i of count) await db.findOne(Customer, { id: 'ALFKI' });
  });
  bench('MikroORM Customers: search', async () => {
    for (const i of count) {
      await db.find(Customer, {
        companyName: { $like: '%ha%' },
      });
    }
  });
  bench('MikroORM Employees: getAll', async () => {
    for (const i of count) await db.find(Employee, {});
  });
  bench('MikroORM Employees: getInfo', async () => {
    for (const i of count) {
      await db.findOne(
        Employee,
        { id: '1' },
        { populate: ['recipient'] },
      );
    }
  });
  bench('MikroORM Suppliers: getAll', async () => {
    for (const i of count) await db.find(Supplier, {});
  });
  bench('MikroORM Suppliers: getInfo', async () => {
    for (const i of count) await db.findOne(Supplier, { id: '1' });
  });
  bench('MikroORM Products: getAll', async () => {
    for (const i of count) await db.find(Product, {});
  });
  bench('MikroORM Products: getInfo', async () => {
    for (const i of count) {
      await db.findOne(
        Product,
        { id: '1' },
        { populate: ['supplier'] },
      );
    }
  });
  bench('MikroORM Products: search', async () => {
    for (const i of count) {
      await db.find(Product, {
        name: { $like: '%cha%' },
      });
    }
  });
  bench('MikroORM Orders: getAll', async () => {
    for (const i of count) {
      await db.find(
        Order,
        {},
        { populate: ['details'] },
      );
    }
  });
  bench('MikroORM Orders: getInfo', async () => {
    for (const i of count) {
      await db.find(
        Detail,
        { orderId: '10248' },
        { populate: ['order', 'product'] },
      );
    }
  });

  await run();
};

startMikroOrmBenches();
