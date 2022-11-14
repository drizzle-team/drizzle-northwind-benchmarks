import { MikroORM } from "@mikro-orm/core";
import fs from "fs";
import path from "node:path";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Customer } from "./entities/customers";
import { Employee } from "./entities/employees";
import { Order } from "./entities/orders";
import { Supplier } from "./entities/suppliers";
import { Product } from "./entities/products";
import { Detail } from "./entities/details";

export const getConnection = async () => {
  const orm = await MikroORM.init<SqliteDriver>({
    type: "sqlite",
    dbName: ":memory:",
    entities: [Customer, Employee, Order, Supplier, Product, Detail],
    metadataProvider: TsMorphMetadataProvider,
  });
  await orm.getSchemaGenerator().updateSchema();
  const em = orm.em.fork();
  const customers = fs.readFileSync(path.resolve("data/customers.sql"), "utf8");
  await em.execute(customers);
  const employees = fs.readFileSync(path.resolve("data/employees.sql"), "utf8");
  await em.execute(employees);
  const orders = fs.readFileSync(path.resolve("data/orders.sql"), "utf8");
  await em.execute(orders);
  const suppliers = fs.readFileSync(path.resolve("data/suppliers.sql"), "utf8");
  await em.execute(suppliers);
  const products = fs.readFileSync(path.resolve("data/products.sql"), "utf8");
  await em.execute(products);
  const orderDetails = fs.readFileSync(path.resolve("data/order_details.sql"), "utf8");
  await em.execute(orderDetails);

  return em;
};
