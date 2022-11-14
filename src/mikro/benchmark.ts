import { MikroORM, QueryOrder } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { run, bench } from "mitata";
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
    await db.findOne(Customer, { id: "ALFKI" });
  });
  bench("MikroORM Customers: search", async () => {
    await db.find(Customer, {
      companyName: { $like: "%ha%" },
    });
  });
  bench("MikroORM Employees: getAll", async () => {
    await db.find(Employee, {});
  });
  bench("MikroORM Employees: getInfo", async () => {
    await db.findOne(
      Employee,
      { id: 1 },
      { populate: ["recipient"] },
    );
  });
  bench("MikroORM Suppliers: getAll", async () => {
    await db.find(Supplier, {});
  });
  bench("MikroORM Suppliers: getInfo", async () => {
    await db.findOne(Supplier, { id: 1 });
  });
  bench("MikroORM Products: getAll", async () => {
    await db.find(Product, {});
  });
  bench("MikroORM Products: getInfo", async () => {
    await db.findOne(
      Product,
      { id: 1 },
      { populate: ["supplier"] },
    );
  });
  bench("MikroORM Products: search", async () => {
    await db.find(Product, {
      name: { $like: "%cha%" },
    });
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
    const b = await db.find(
      Detail,
      { orderId: 10248 },
      { populate: ["order", "product"] },
    );
    console.log(b);
  });

  await run();
};

startMikroOrmBenches();
