import { run, bench } from 'mitata';
import { sql } from 'kysely';
import { getConnection } from './index';

export const startKyselyOrmBenches = async () => {
  const db = await getConnection();
  const count = new Array(100);

  bench('Kysely ORM Customers: getAll', async () => {
    for (const i of count) {
      await db.selectFrom('customers').selectAll().execute();
    }
  });
  bench('Kysely ORM Customers: getInfo', async () => {
    for (const i of count) {
      await db.selectFrom('customers')
        .selectAll()
        .where('customers.id', '=', 'ALFKI')
        .limit(1)
        .execute();
    }
  });
  bench('Kysely ORM Customers: search', async () => {
    for (const i of count) {
      await db.selectFrom('customers')
        .selectAll()
        .where(sql`company_name`, 'like', '%ha%')
        .execute();
    }
  });

  bench('Kysely ORM Employees: getAll', async () => {
    for (const i of count) {
      await db.selectFrom('employees').selectAll().execute();
    }
  });
  bench('Kysely ORM Employees: getInfo', async () => {
    for (const i of count) {
      await db.selectFrom('employees as e1')
        .selectAll()
        .where('e1.id', '=', '1')
        .leftJoin(
          db.selectFrom('employees as e2')
            .select(['id as e_id', 'last_name as e_last_name', 'first_name as e_first_name'])
            .as('e2'),
          'e2.e_id',
          'e1.recipient_id',
        )
        .execute();
    }
  });

  bench('Kysely ORM Suppliers: getAll', async () => {
    for (const i of count) {
      await db.selectFrom('suppliers').selectAll().execute();
    }
  });
  bench('Kysely ORM Suppliers: getInfo', async () => {
    for (const i of count) {
      await db.selectFrom('suppliers')
        .selectAll()
        .where('suppliers.id', '=', '1')
        .limit(1)
        .execute();
    }
  });

  bench('Kysely ORM Products: getAll', async () => {
    for (const i of count) {
      await db.selectFrom('products').selectAll().execute();
    }
  });
  bench('Kysely ORM Products: getInfo', async () => {
    for (const i of count) {
      await db.selectFrom('products')
        .selectAll()
        .where('products.id', '=', '1')
        .limit(1)
        .leftJoin(
          db.selectFrom('suppliers')
            .select(['suppliers.id as s_id', 'suppliers.company_name as s_company_name'])
            .as('s1'),
          's1.s_id',
          'products.supplier_id',
        )
        .execute();
    }
  });
  bench('Kysely ORM Products: search', async () => {
    for (const i of count) {
      await db.selectFrom('products')
        .selectAll()
        .where(sql`name`, 'like', `%${'cha'.toLowerCase()}%`)
        .execute();
    }
  });

  bench('Kysely ORM Orders: getAll', async () => {
    for (const i of count) {
      await db.selectFrom('orders')
        .selectAll()
        .leftJoin(
          db.selectFrom('order_details')
            .select(['quantity', 'unit_price', 'order_id'])
            .as('e'),
          'e.order_id',
          'orders.id',
        ).execute();
    }
  });
  bench('Kysely ORM Orders: getInfo', async () => {
    for (const i of count) {
      await db.selectFrom('order_details')
        .selectAll()
        .where('order_id', '=', '10248')
        .leftJoin(
          db.selectFrom('orders')
            .select([
              'ship_name',
              'ship_via',
              'freight',
              'order_date',
              'required_date',
              'shipped_date',
              'ship_city',
              'ship_region',
              'ship_postal_code',
              'ship_country',
              'customer_id',
              'id',
            ])
            .as('o'),
          'o.id',
          'order_details.order_id',
        )
        .leftJoin(
          db.selectFrom('products')
            .select(['id as p_id', 'name as p_name'])
            .as('p'),
          'p.p_id',
          'order_details.product_id',
        )
        .execute();
    }
  });

  await run();
};

startKyselyOrmBenches();
