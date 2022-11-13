import { run, bench } from "mitata";
import { Customer } from "./entities/customers";
import { Employee } from "./entities/employees";
import { Supplier } from "./entities/suppliers";
import { Product } from "./entities/products";
import { Order } from "./entities/orders";
import { Detail } from "./entities/details";
import { DataSource } from "typeorm";

const db = new DataSource({
  type: "sqlite",
  database: "nw.sqlite",
  entities: [Customer, Employee, Supplier, Order, Product, Detail],
});

export const main = async () => {
  await db.initialize();

  bench("TypeORM Customers: getAll", async () => {
    await db.getRepository(Customer).createQueryBuilder("customers").getMany();
  });
 
  bench("TypeORM Customers: getInfo", async () => {
    await db
      .getRepository(Customer)
      .createQueryBuilder("customers")
      .where("customers.id = :id", { id: "ALFKI" })
      .getOne();
  });
  bench("TypeORM Customers: search", async () => {
    await db
      .getRepository(Customer)
      .createQueryBuilder("customers")
      .where("customers.company_name like :company", { company: "%ha%" })
      .getMany();
  });

  bench("TypeORM Employees: getAll", async () => {
    await db.getRepository(Employee).createQueryBuilder("employees").getMany();
  });
  bench("TypeORM Employees: getInfo", async () => {
    await db
      .getRepository(Employee)
      .createQueryBuilder("employees")
      .leftJoinAndSelect("employees.recipient", "recipients")
      .where("employees.id = :id", { id: "1" })
      .getOne();
  });
  bench("TypeORM Suppliers: getAll", async () => {
    await db.getRepository(Supplier).createQueryBuilder("suppliers").getMany();
  });
  bench("TypeORM Suppliers: getInfo", async () => {
    await db
      .getRepository(Supplier)
      .createQueryBuilder("suppliers")
      .where("suppliers.id = :id", { id: "1" })
      .getOne();
  });
  bench("TypeORM Products: getAll", async () => {
    await db.getRepository(Product).createQueryBuilder("products").getMany();
  });
  bench("TypeORM Products: getInfo", async () => {
    await db
      .getRepository(Product)
      .createQueryBuilder("products")
      .leftJoinAndSelect("products.supplier", "suppliers")
      .where("products.id = :id", { id: "1" })
      .getOne();
  });
  bench("TypeORM Products: search", async () => {
    await db
      .getRepository(Product)
      .createQueryBuilder("products")
      .where("products.name like :name", { name: "%cha%" })
      .getMany();
  });

  bench("TypeORM Orders: getAll", async () => {
    await db
      .getRepository(Order)
      .createQueryBuilder("orders")
      .leftJoinAndSelect("orders.details", "order_details")
      .getMany();
  });
  bench("TypeORM Orders: getInfo", async () => {
    await db
      .getRepository(Detail)
      .createQueryBuilder("order_details")
      .leftJoinAndSelect("order_details.order", "orders")
      .leftJoinAndSelect("order_details.product", "products")
      .where("order_details.order_id = :id", { id: "10248" })
      .getMany();
  });

  await run();
};

main();
