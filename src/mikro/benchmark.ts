import { MikroORM, QueryOrder } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { run, bench } from "mitata";
import { customerIds, employeeIds, orderIds, productIds, searchesProduct, searchesCustomer, supplierIds } from "@/common/meta";
import { Customer } from "./entities/customers";
import { Detail } from "./entities/details";
import { Employee } from "./entities/employees";
import { Order } from "./entities/orders";
import { Product } from "./entities/products";
import { Supplier } from "./entities/suppliers";

export const startMikroOrmBenches = async () => {
  const orm = await MikroORM.init<SqliteDriver>({
    type: "sqlite",
    dbName: "nw.sqlite",
    entities: [Customer, Employee, Order, Supplier, Product, Detail],
    metadataProvider: TsMorphMetadataProvider,
  });
  const db = orm.em.fork();

  bench("MikroORM Customers: getAll", async () => {
    await db.find(Customer, {});
  });
  bench("MikroORM Customers: getInfo", async () => {
    for (const id of customerIds) { await db.findOne(Customer, { id }); }
  });
  bench("MikroORM Customers: search", async () => {
    for (const companyName of searchesProduct) {
      await db.find(Customer, {
        companyName: { $like: `%${companyName}%` },
      });
    }
  });
  bench("MikroORM Employees: getAll", async () => {
    await db.find(Employee, {});
  });
  bench("MikroORM Employees: getInfo", async () => {
    for (const id of employeeIds) {
      await db.findOne(
        Employee,
        { id },
        { populate: ["recipient"] },
      );
    }
  });
  bench("MikroORM Suppliers: getAll", async () => {
    await db.find(Supplier, {});
  });
  bench("MikroORM Suppliers: getInfo", async () => {
    for (const id of supplierIds) { await db.findOne(Supplier, { id }); }
  });
  bench("MikroORM Products: getAll", async () => {
    await db.find(Product, {});
  });
  bench("MikroORM Products: getInfo", async () => {
    for (const id of productIds) {
      await db.findOne(
        Product,
        { id },
        { populate: ["supplier"] },
      );
    }
  });
  bench("MikroORM Products: search", async () => {
    for (const name of searchesCustomer) {
      await db.find(Product, {
        name: { $like: `%${name}%` },
      });
    }
  });
  bench("MikroORM Orders: getAll", async () => {
    await db.createQueryBuilder(Order, "o")
      .select([
        "id",
        "shipped_date",
        "ship_name",
        "ship_city",
        "ship_country",
        "COUNT(product_id) AS products_count",
        "SUM(quantity) AS quantity_sum",
        "SUM(quantity * unit_price) AS total_price",
      ])
      .leftJoin("o.details", "od")
      .groupBy("o.id")
      .orderBy({ id: QueryOrder.ASC })
      .execute();
  });
  bench("MikroORM Orders: getInfo", async () => {
    for (const id of orderIds) {
      await db.find(
        Detail,
        { orderId: id },
        { populate: ["order", "product"] },
      );
    }
  });

  await run();
};

startMikroOrmBenches();
