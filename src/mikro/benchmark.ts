import { run, bench } from "mitata";
import { Customer } from "./entities/customers";
import { Detail } from "./entities/details";
import { Employee } from "./entities/employees";
import { Order } from "./entities/orders";
import { Product } from "./entities/products";
import { Supplier } from "./entities/suppliers";
import { getConnection } from "./index";

export const startMikroOrmBenches = async () => {
  const db = await getConnection();

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
      { id: "1" },
      { populate: ["recipient"] },
    );
  });
  bench("MikroORM Suppliers: getAll", async () => {
    await db.find(Supplier, {});
  });
  bench("MikroORM Suppliers: getInfo", async () => {
    await db.findOne(Supplier, { id: "1" });
  });
  bench("MikroORM Products: getAll", async () => {
    await db.find(Product, {});
  });
  bench("MikroORM Products: getInfo", async () => {
    await db.findOne(
      Product,
      { id: "1" },
      { populate: ["supplier"] },
    );
  });
  bench("MikroORM Products: search", async () => {
    await db.find(Product, {
      name: { $like: "%cha%" },
    });
  });
  bench("MikroORM Orders: getAll", async () => {
    await db.find(
      Order,
      {},
      { populate: ["details"] },
    );
  });
  bench("MikroORM Orders: getInfo", async () => {
    await db.find(
      Detail,
      { orderId: "10248" },
      { populate: ["order", "product"] },
    );
  });

  await run();
};

startMikroOrmBenches();
