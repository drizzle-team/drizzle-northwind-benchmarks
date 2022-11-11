import { run, bench } from "mitata";
import { eq, like } from "drizzle-orm/expressions";
import { alias, SQLiteConnector } from "drizzle-orm-sqlite";

import { sql } from "drizzle-orm";
import {
  employees,
  customers,
  suppliers,
  products,
  orders,
  details,
} from "./schema";
import Database from "better-sqlite3";

const db = new SQLiteConnector(new Database("nw.sqlite")).connect();

bench("Drizzle-ORM Customers: getAll", async () => {
  db.select(customers).execute();
});

bench("Drizzle-ORM Customers: getInfo", async () => {
  db.select(customers).where(eq(customers.id, "ALFKI")).execute();
});

bench("Drizzle-ORM Customers: search", async () => {
  db.select(customers)
    .where(like(customers.companyName, `%${"ha"}%`))
    .execute();
});

bench("Drizzle-ORM Employees: getAll", async () => {
  db.select(employees).execute();
});

bench("Drizzle-ORM Employees: getInfo", async () => {
  const e2 = alias(employees, "recipient");
  const query = db
    .select(employees)
    .leftJoin(e2, eq(e2.id, employees.reportsTo))
    .where(eq(employees.id, "1"));

  query.execute();
});

bench("Drizzle-ORM Suppliers: getAll", async () => {
  db.select(suppliers).execute();
});

bench("Drizzle-ORM Suppliers: getInfo", async () => {
  db.select(suppliers).where(eq(suppliers.id, 1)).execute();
});

bench("Drizzle-ORM Products: getAll", async () => {
  db.select(products).execute();
});

bench("Drizzle-ORM Products: getInfo", async () => {
  db.select(products)
    .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
    .where(eq(products.id, 1))
    .execute();
});

bench("Drizzle-ORM Products: search", async () => {
  db.select(products)
    .where(like(products.name, `%${"cha"}%`))
    .execute();
});

bench("Drizzle-ORM Orders: getAll", async () => {
  db.select(orders)
    .fields({
      id: orders.id,
      shippedDate: orders.shippedDate,
      shipName: orders.shipName,
      shipCity: orders.shipCity,
      shipCountry: orders.shipCountry,
      products: sql`count(${details.productId})`.as<number>(),
      quantity: sql`sum(${details.quantity})`.as<number>(),
      totalPrice:
        sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
    })
    .leftJoin(details, eq(orders.id, details.orderId))
    .execute();
});

bench("Drizzle-ORM Orders: getInfo", async () => {
  db.select(details)
    .leftJoin(orders, eq(details.orderId, orders.id))
    .leftJoin(products, eq(details.productId, orders.id))
    .where(eq(details.orderId, "10248"))
    .execute();
});

const main = async () => {
  await run();
};

main();
