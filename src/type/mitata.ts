import { run, bench, group } from 'mitata';
import { Customer } from './entities/customers';
import { Employee } from './entities/employees';
import { Supplier } from './entities/suppliers';
import { Product } from './entities/products';
import { Order } from './entities/orders';
import { Detail } from './entities/details';
import { getConnection } from './index';

export const startTypeOrmBenches = async () => {
  const db = await getConnection();
  const count = new Array(100);

  bench('TypeORM Customers: getAll', async () => {
    for (const i of count) {
      await db.getRepository(Customer).createQueryBuilder('customers').getMany();
    }
  });
  bench('TypeORM Customers: getInfo', async () => {
    for (const i of count) {
      await db.getRepository(Customer).createQueryBuilder('customers')
        .where('customers.id = :id', { id: 'ALFKI' })
        .getOne();
    }
  });
  bench('TypeORM Customers: search', async () => {
    for (const i of count) {
      await db.getRepository(Customer).createQueryBuilder('customers')
        .where('customers.company_name like :company', { company: '%ha%' })
        .getMany();
    }
  });

  bench('TypeORM Employees: getAll', async () => {
    for (const i of count) {
      await db.getRepository(Employee).createQueryBuilder('employees').getMany();
    }
  });
  bench('TypeORM Employees: getInfo', async () => {
    for (const i of count) {
      await db.getRepository(Employee).createQueryBuilder('employees')
        .leftJoinAndSelect(
          'employees.recipient',
          'recipients',
        ).where('employees.id = :id', { id: '1' })
        .getOne();
    }
  });
  bench('TypeORM Suppliers: getAll', async () => {
    for (const i of count) {
      await db.getRepository(Supplier).createQueryBuilder('suppliers').getMany();
    }
  });
  bench('TypeORM Suppliers: getInfo', async () => {
    for (const i of count) {
      await db.getRepository(Supplier).createQueryBuilder('suppliers')
        .where('suppliers.id = :id', { id: '1' })
        .getOne();
    }
  });
  bench('TypeORM Products: getAll', async () => {
    for (const i of count) {
      await db.getRepository(Product).createQueryBuilder('products').getMany();
    }
  });
  bench('TypeORM Products: getInfo', async () => {
    for (const i of count) {
      await db.getRepository(Product).createQueryBuilder('products')
        .leftJoinAndSelect(
          'products.supplier',
          'suppliers',
        ).where('products.id = :id', { id: '1' })
        .getOne();
    }
  });
  bench('TypeORM Products: search', async () => {
    for (const i of count) {
      await db.getRepository(Product).createQueryBuilder('products')
        .where('products.name like :name', { name: '%cha%' })
        .getMany();
    }
  });

  bench('TypeORM Orders: getAll', async () => {
    for (const i of count) {
      await db.getRepository(Order)
        .createQueryBuilder('orders')
        .leftJoinAndSelect(
          'orders.details',
          'order_details',
        ).getMany();
    }
  });
  bench('TypeORM Orders: getInfo', async () => {
    for (const i of count) {
      await db.getRepository(Detail)
        .createQueryBuilder('order_details')
        .leftJoinAndSelect(
          'order_details.order',
          'orders',
        ).leftJoinAndSelect(
          'order_details.product',
          'products',
        )
        .where('order_details.order_id = :id', { id: '10248' })
        .getMany();
    }
  });

  await run();
};

startTypeOrmBenches();
