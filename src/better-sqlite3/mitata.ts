import fs from 'fs';
import path from 'node:path';
import { bench, run, group } from 'mitata';
import { getConnection } from './index';

export const startBetterSqlite3Benches = async () => {
  const db = getConnection();

  const count = new Array(100);
  bench('Better-sqlite3 Customers: getAll', async () => {
    for (const i of count) {
      db.prepare('select * from "customers"').all();
    }
  });
  bench('Better-sqlite3 Customers: getInfo', async () => {
    for (const i of count) {
      db.prepare('select * from "customers" where "customers"."id" = ?').get('ALFKI');
    }
  });
  bench('Better-sqlite3 Customers: search', async () => {
    for (const i of count) {
      db.prepare('select * from "customers" where "customers"."company_name" like ?').all('%ha%');
    }
  });

  bench('Better-sqlite3 Employees: getAll', async () => {
    for (const i of count) {
      db.prepare('select * from "employees"').all();
    }
  });
  bench('Better-sqlite3 Employees: getInfo', async () => {
    for (const i of count) {
      db.prepare(`select "e1".*, "e2"."last_name" as "reports_lname", "e2"."first_name" as "reports_fname"
                from "employees" as "e1" left join "employees" as "e2" on "e2"."id" = "e1"."recipient_id" where "e1"."id" = ?`).get('1');
    }
  });

  bench('Better-sqlite3 Suppliers: getAll', async () => {
    for (const i of count) {
      db.prepare('select * from "suppliers"').all();
    }
  });
  bench('Better-sqlite3 Suppliers: getInfo', async () => {
    for (const i of count) {
      db.prepare('select * from "suppliers" where "suppliers"."id" = ?').get('1');
    }
  });

  bench('Better-sqlite3 Products: getAll', async () => {
    for (const i of count) {
      db.prepare('select * from "products"').all();
    }
  });
  bench('Better-sqlite3 Products: getInfo', async () => {
    for (const i of count) {
      db.prepare(`select "products".*, "suppliers".*
                from "products" left join "suppliers" on "products"."supplier_id" = "suppliers"."id" where "products"."id" = ?`).get('1');
    }
  });
  bench('Better-sqlite3 Products: search', async () => {
    for (const i of count) {
      db.prepare('select * from "products" where "products"."name" like ?').all('%cha%');
    }
  });

  bench('Better-sqlite3 Orders: getAll', async () => {
    for (const i of count) {
      db.prepare(`select "id", "shipped_date", "ship_name", "ship_city", "ship_country", count("product_id") as "products",
              sum("quantity") as "quantity", sum("quantity" * "unit_price") as "total_price"
              from "orders" as "o" left join "order_details" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`).all();
    }
  });
  bench('Better-sqlite3 Orders: getInfo', async () => {
    for (const i of count) {
      db.prepare(`select "order_details"."unit_price", "order_details"."quantity", "order_details"."discount", "order_details"."order_id",
              "order_details"."product_id", "orders"."id", "orders"."order_date", "orders"."required_date", "orders"."shipped_date", "orders"."ship_via",
              "orders"."freight", "orders"."ship_name", "orders"."ship_city", "orders"."ship_region", "orders"."ship_postal_code", "orders"."ship_country",
              "orders"."customer_id", "orders"."employee_id", "products"."id", "products"."name", "products"."qt_per_unit", "products"."unit_price",
              "products"."units_in_stock", "products"."units_on_order", "products"."reorder_level", "products"."discontinued", "products"."supplier_id"
              from "order_details" left join "orders" on "order_details"."order_id" = "orders"."id"
              left join "products" on "order_details"."product_id" = "products"."id" where "order_details"."order_id" = ?`).get('10248');
    }
  });
  await run();
};

startBetterSqlite3Benches();
