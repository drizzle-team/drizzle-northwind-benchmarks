import { run, bench, group, baseline } from 'mitata';
import { eq, like } from 'drizzle-orm/expressions';
import { alias } from 'drizzle-orm-sqlite';

import { sql } from 'drizzle-orm';
import { employees, customers, suppliers, products, orders, details } from './schema';
import { getConnection } from './index';

export const startDrizzleOrmBenches = async () => {
  const db = await getConnection();
  const count = new Array(100);

  bench('Drizzle-ORM Customers: getAll', async () => {
    for (const i of count) db.select(customers).execute();
  });
  bench('Drizzle-ORM Customers: getInfo', async () => {
    for (const i of count) {
      db.select(customers)
        .where(eq(customers.id, 'ALFKI'))
        .execute();
    }
  });
  bench('Drizzle-ORM Customers: search', async () => {
    for (const i of count) {
      db.select(customers)
        .where(like(customers.companyName, `%${'ha'}%`))
        .execute();
    }
  });

  bench('Drizzle-ORM Employees: getAll', async () => {
    for (const i of count) db.select(employees).execute();
  });
  bench('Drizzle-ORM Employees: getInfo', async () => {
    const e2 = alias(employees, 'recipient');
    const query = db.select(employees)
      .leftJoin(e2, eq(e2.id, employees.recipientId))
      .where(eq(employees.id, '1'));

    for (const i of count) {
      query.execute();
    }
  });

  bench('Drizzle-ORM Suppliers: getAll', async () => {
    for (const i of count) db.select(suppliers).execute();
  });
  bench('Drizzle-ORM Suppliers: getInfo', async () => {
    for (const i of count) {
      db.select(suppliers)
        .where(eq(suppliers.id, 1))
        .execute();
    }
  });

  bench('Drizzle-ORM Products: getAll', async () => {
    for (const i of count) {
      db.select(products).execute();
    }
  });
  bench('Drizzle-ORM Products: getInfo', async () => {
    for (const i of count) {
      db.select(products)
        .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
        .where(eq(products.id, 1))
        .execute();
    }
  });
  bench('Drizzle-ORM Products: search', async () => {
    for (const i of count) {
      db.select(products)
        .where(like(products.name, `%${'cha'}%`))
        .execute();
    }
  });

  bench('Drizzle-ORM Orders: getAll', async () => {
    for (const i of count) {
      const command = sql`select "id", "shipped_date", "ship_name", "ship_city", "ship_country",
              count("product_id") as "products", sum("quantity") as "quantity", sum("quantity" * "unit_price") as "total_price"
              from "orders" as "o" left join "order_details" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`;
      db.all(command);
    }
  });
  bench('Drizzle-ORM Orders: getInfo', async () => {
    for (const i of count) {
      db.select(details)
        .leftJoin(orders, eq(details.orderId, orders.id))
        .leftJoin(products, eq(details.productId, orders.id))
        .where(eq(details.orderId, '10248'))
        .execute();
    }
  });
  await run();
};

startDrizzleOrmBenches();
