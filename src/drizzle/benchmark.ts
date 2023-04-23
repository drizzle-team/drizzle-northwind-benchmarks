import { run, bench } from "mitata";
import { asc, eq, ilike, like } from "drizzle-orm/expressions";
import { alias } from "drizzle-orm/sqlite-core";
import { drizzle as drizzleDb } from "drizzle-orm/better-sqlite3/driver";
import { sql } from "drizzle-orm";

import Database from "better-sqlite3";
import {
  employees,
  customers,
  suppliers,
  products,
  orders,
  details,
} from "./schema";
import {
  customerIds,
  employeeIds,
  orderIds,
  productIds,
  customerSearches,
  productSearches,
  supplierIds,
} from "@/common/meta";

const db = drizzleDb(new Database("nw.sqlite"));

bench("Drizzle-ORM Customers: getAll", () => {
  db.select().from(customers).all();
});

bench("Drizzle-ORM Customers: getInfo", () => {
  customerIds.forEach((id) => {
    db.select().from(customers).where(eq(customers.id, id)).all();
  });
});

bench("Drizzle-ORM Customers: search", () => {
  customerSearches.forEach((it) => {
    db.select()
      .from(customers)
      .where(sql`lower(${customers.companyName}) like "%${it}%"`)
      .all();
  });
});

bench("Drizzle-ORM Employees: getAll", () => {
  db.select().from(employees).all();
});

bench("Drizzle-ORM Employees: getInfo", () => {
  const e2 = alias(employees, "recipient");

  employeeIds.forEach((id) => {
    db.select()
      .from(employees)
      .leftJoin(e2, eq(e2.id, employees.reportsTo))
      .where(eq(employees.id, id))
      .all();
  });
});

bench("Drizzle-ORM Suppliers: getAll", () => {
  db.select().from(suppliers).all();
});

bench("Drizzle-ORM Suppliers: getInfo", () => {
  supplierIds.forEach((id) => {
    db.select().from(suppliers).where(eq(suppliers.id, id)).all();
  });
});

bench("Drizzle-ORM Products: getAll", () => {
  db.select().from(products).all();
});

bench("Drizzle-ORM Products: getInfo", () => {
  productIds.forEach((id) => {
    db.select()
      .from(products)
      .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
      .where(eq(products.id, id))
      .all();
  });
});

bench("Drizzle-ORM Products: search", () => {
  productSearches.forEach((it) => {
    db.select()
      .from(products)
      .where(sql`lower(${products.name}) like "%${it}%"`)
      .all();
  });
});

bench("Drizzle-ORM Orders: getAll", () => {
  db.select({
    id: orders.id,
    shippedDate: orders.shippedDate,
    shipName: orders.shipName,
    shipCity: orders.shipCity,
    shipCountry: orders.shipCountry,
    productsCount: sql`count(${details.productId})`.as<number>(),
    quantitySum: sql`sum(${details.quantity})`.as<number>(),
    totalPrice:
      sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
  })
    .from(orders)
    .leftJoin(details, eq(orders.id, details.orderId))
    .groupBy(orders.id)
    .orderBy(asc(orders.id))
    .all();
});

bench("Drizzle-ORM Orders: getInfo", () => {
  orderIds.forEach((id) => {
    db.select()
      .from(details)
      .leftJoin(orders, eq(details.orderId, orders.id))
      .leftJoin(products, eq(details.productId, products.id))
      .where(eq(details.orderId, id))
      .all();
  });
});

const main = async () => {
  await run();
  process.exit(1);
};

main();
