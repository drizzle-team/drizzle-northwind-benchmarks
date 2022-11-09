import { bench, run, group } from 'mitata';
import fs from 'fs';
import path from 'node:path';
import { getConnection } from './index';
import { up } from './migrations/20221008203229_init';

export const startKnexOrmBenches = async () => {
  const db = await getConnection();

  const count = new Array(100);

  bench('Knex ORM Customers: getAll', async () => {
    for (const i of count) {
      await db('customers').select();
    }
  });
  bench('Knex ORM Customers: getInfo', async () => {
    for (const i of count) {
      await db('customers').where({ id: 'ALFKI' }).first();
    }
  });
  bench('Knex ORM Customers: search', async () => {
    for (const i of count) {
      await db('customers')
        .whereRaw('company_name LIKE ?', ['%ha%']).select();
    }
  });

  bench('Knex ORM Employees: getAll', async () => {
    for (const i of count) {
      await db('employees').select();
    }
  });
  bench('Knex ORM Employees: getInfo', async () => {
    for (const i of count) {
      await db('employees as e1')
        .whereRaw('e1.id = (?)', ['1'])
        .leftJoin(
          'employees as e2',
          'e1.recipient_id',
          'e2.id',
        )
        .select(['e1.*', 'e2.id as e_id', 'e2.last_name as e_last_name', 'e2.first_name as e_first_name']);
    }
  });

  bench('Knex ORM Suppliers: getAll', async () => {
    for (const i of count) {
      await db('suppliers').select();
    }
  });
  bench('Knex ORM Suppliers: getInfo', async () => {
    for (const i of count) {
      await db('suppliers').where({ id: '1' }).first();
    }
  });

  bench('Knex ORM Products: getAll', async () => {
    for (const i of count) {
      await db('products').select();
    }
  });
  bench('Knex ORM Products: getInfo', async () => {
    for (const i of count) {
      await db('products')
        .select(['products.*', 'suppliers.id as s_id', 'suppliers.company_name as s_company_name'])
        .whereRaw('products.id = (?)', ['1'])
        .leftJoin(
          'suppliers',
          'products.supplier_id',
          'suppliers.id',
        );
    }
  });
  bench('Knex ORM Products: search', async () => {
    for (const i of count) {
      await db('products')
        .whereRaw('name LIKE ?', ['%cha%']).select();
    }
  });

  bench('Knex ORM Orders: getAll', async () => {
    // Query with agregate columns
    for (const i of count) {
      await db('orders')
        .select([
          'orders.id',
          'orders.shipped_date',
          'orders.ship_name',
          'orders.ship_city',
          'orders.ship_country',
        ])
        .leftJoin(
          'order_details',
          'order_details.order_id',
          'orders.id',
        )
        .count('product_id as products')
        .sum('quantity as quantity')
        .sum(db.raw('?? * ??', ['quantity', 'unit_price']))
        .groupBy('orders.id')
        .orderBy('orders.id', 'asc');
    }
  });
  bench('Knex ORM Orders: getInfo', async () => {
    for (const i of count) {
      await db('order_details as od')
        .whereRaw('od.order_id = (?)', ['10248'])
        .leftJoin(
          'orders as o',
          'o.id',
          'od.order_id',
        )
        .leftJoin(
          'products as p',
          'p.id',
          'od.product_id',
        )
        .select([
          'o.*',

          'od.unit_price as od_uprice',
          'od.quantity as od_quantity',
          'od.discount as od_discount',

          'p.id as p_id',
          'p.name as p_name',
        ]);
    }
  });
  await run();
};

startKnexOrmBenches();
