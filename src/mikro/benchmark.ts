import { MikroORM, QueryOrder } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { run, bench } from "mitata";
import {
  customerIds,
  employeeIds,
  orderIds,
  productIds,
  productSearches,
  customerSearches,
  supplierIds,
} from "@/common/meta";
import { Customer } from "./entities/customers";
import { Detail } from "./entities/details";
import { Employee } from "./entities/employees";
import { Order } from "./entities/orders";
import { Product } from "./entities/products";
import { Supplier } from "./entities/suppliers";
import { details } from "@/drizzle/schema";

let db;

const getConnect = async () => {
  const orm = await MikroORM.init<SqliteDriver>({
    type: "sqlite",
    dbName: "nw.sqlite",
    entities: [Customer, Employee, Order, Supplier, Product, Detail],
    metadataProvider: TsMorphMetadataProvider,
  });
  db = orm.em.fork();
};

bench("MikroORM Customers: getAll", async () => {
  await db.find(Customer, {});
});
bench("MikroORM Customers: getInfo", async () => {
  for (const id of customerIds) {
    await db.findOne(Customer, { id });
  }
});
bench("MikroORM Customers: search", async () => {
  for (const it of customerSearches) {
    await db.find(Customer, {
      companyName: { $like: `%${it}%` },
    });
  }
});
bench("MikroORM Employees: getAll", async () => {
  await db.find(Employee, {});
});
bench("MikroORM Employees: getInfo", async () => {
  for (const id of employeeIds) {
    await db.findOne(Employee, { id }, { populate: ["recipient"] });
  }
});
bench("MikroORM Suppliers: getAll", async () => {
  await db.find(Supplier, {});
});
bench("MikroORM Suppliers: getInfo", async () => {
  for (const id of supplierIds) {
    await db.findOne(Supplier, { id });
  }
});
bench("MikroORM Products: getAll", async () => {
  await db.find(Product, {});
});
bench("MikroORM Products: getInfo", async () => {
  for (const id of productIds) {
    await db.findOne(Product, { id }, { populate: ["supplier"] });
  }
});
bench("MikroORM Products: search", async () => {
  for (const it of productSearches) {
    await db.find(Product, {
      name: { $like: `%${it}%` },
    });
  }
});

// bench("MikroORM Orders: getAll", async () => {
//   await db.find(Order, {}, { populate: ["details"] });
// });

bench("MikroORM Orders: getInfo", async () => {
  for (const id of orderIds) {
    await db.find(Detail, { orderId: id }, { populate: ["order", "product"] });
  }
});

const main = async () => {
  // await getConnect()

  const orm = await MikroORM.init<SqliteDriver>({
    type: "sqlite",
    dbName: "nw.sqlite",
    entities: [Customer, Employee, Order, Supplier, Product, Detail],
    metadataProvider: TsMorphMetadataProvider,
  });
  const db = orm.em.fork();
  const repo = db.getRepository(Order);
  console.log(await repo.find({}, { populate: ["details"] }));

  console.log(
    JSON.stringify(await db.find(Order, {}, { populate: ["details"] }))
  );
  // console.log( await db.find(Detail, {}, { populate: ["order", "product"] }));

  // await run();
};
main();
