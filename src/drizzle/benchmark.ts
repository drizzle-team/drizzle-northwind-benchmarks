import { run, bench } from "mitata";
import { asc, eq, like } from "drizzle-orm/expressions";
import { alias, SQLiteConnector } from "drizzle-orm-sqlite";

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
import { customerIds, employeeIds, orderIds, productIds, customerSearches, productSearches, supplierIds } from "@/common/meta";

const db = new SQLiteConnector(new Database("nw.sqlite")).connect();

bench("Drizzle-ORM Customers: getAll", () => {
  db.select(customers).execute();
});

bench("Drizzle-ORM Customers: getInfo", () => {
  customerIds.forEach((id) => {
    db.select(customers).where(eq(customers.id, id)).execute();
  });
});

bench("Drizzle-ORM Customers: search", () => {
  customerSearches.forEach((it) => {
    db.select(customers)
      .where(like(customers.companyName, `%${it}%`))
      .execute();
  });
});

bench("Drizzle-ORM Employees: getAll", () => {
  db.select(employees).execute();
});

bench("Drizzle-ORM Employees: getInfo", () => {
  const e2 = alias(employees, "recipient");

  employeeIds.forEach((id) => {
    db.select(employees)
      .leftJoin(e2, eq(e2.id, employees.reportsTo))
      .where(eq(employees.id, id))
      .execute();
  });
});

bench("Drizzle-ORM Suppliers: getAll", () => {
  db.select(suppliers).execute();
});

bench("Drizzle-ORM Suppliers: getInfo", () => {
  supplierIds.forEach((id) => {
    db.select(suppliers).where(eq(suppliers.id, id)).execute();
  });
});

bench("Drizzle-ORM Products: getAll", () => {
  db.select(products).execute();
});

bench("Drizzle-ORM Products: getInfo", () => {
  productIds.forEach((id) => {
    db.select(products)
      .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
      .where(eq(products.id, id))
      .execute();
  });
});

bench("Drizzle-ORM Products: search", () => {
  productSearches.forEach((it) => {
    db.select(products)
      .where(like(products.name, `%${it}%`))
      .execute();
  });
});

bench("Drizzle-ORM Orders: getAll", () => {
  db.select(orders)
    .fields({
      id: orders.id,
      shippedDate: orders.shippedDate,
      shipName: orders.shipName,
      shipCity: orders.shipCity,
      shipCountry: orders.shipCountry,
      productsCount: sql`count(${details.productId})`.as<number>(),
      quantitySum: sql`sum(${details.quantity})`.as<number>(),
      totalPrice: sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
    })
    .leftJoin(details, eq(orders.id, details.orderId))
    .groupBy(orders.id)
    .orderBy(asc(orders.id))
    .execute();
});

bench("Drizzle-ORM Orders: getInfo", () => {
  orderIds.forEach((id) => {
    db.select(details)
      .leftJoin(orders, eq(details.orderId, orders.id))
      .leftJoin(products, eq(details.productId, products.id))
      .where(eq(details.orderId, id))
      .execute();
  });
});

const main = async () => {
  await run();
};

main();
