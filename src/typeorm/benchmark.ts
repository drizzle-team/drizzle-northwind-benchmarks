import { run, bench } from "mitata";
import { DataSource } from "typeorm";
import { Customer } from "./entities/customers";
import { Employee } from "./entities/employees";
import { Supplier } from "./entities/suppliers";
import { Product } from "./entities/products";
import { Order } from "./entities/orders";
import { Detail } from "./entities/details";

const db = new DataSource({
  type: "sqlite",
  database: "nw.sqlite",
  entities: [Customer, Employee, Supplier, Order, Product, Detail],
});

export const main = async () => {
  await db.initialize();

  bench("TypeORM Customers: getAll", async () => {
    await db.getRepository(Customer).find();
  });

  bench("TypeORM Customers: getInfo", async () => {
    await db.getRepository(Customer).findOneBy({ id: "ALFKI" });
  });
  bench("TypeORM Customers: search", async () => {
    await db
      .getRepository(Customer)
      .createQueryBuilder("customer")
      .where("customer.company_name LIKE :company", { company: "%ha%" })
      .getMany();
  });

  bench("TypeORM Employees: getAll", async () => {
    await db.getRepository(Employee).find();
  });
  bench("TypeORM Employees: getInfo", async () => {
    await db
      .getRepository(Employee)
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.recipient", "recipients")
      .where("employee.id = :id", { id: 1 })
      .getOne();
  });
  bench("TypeORM Suppliers: getAll", async () => {
    await db.getRepository(Supplier).find();
  });
  bench("TypeORM Suppliers: getInfo", async () => {
    await db.getRepository(Supplier).findOneBy({ id: 1 });
  });
  bench("TypeORM Products: getAll", async () => {
    await db.getRepository(Product).find();
  });
  bench("TypeORM Products: getInfo", async () => {
    await db
      .getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.supplier", "supplier")
      .where("product.id = :id", { id: 1 })
      .getOne();
  });
  bench("TypeORM Products: search", async () => {
    await db
      .getRepository(Product)
      .createQueryBuilder("product")
      .where("product.name like :name", { name: "%cha%" })
      .getMany();
  });

  bench("TypeORM Orders: getAll", async () => {
    await db
      .getRepository(Order)
      .createQueryBuilder("order")
      .leftJoin("order.details", "order_detail")
      .addSelect([
        "COUNT(product_id) AS products_count",
        "SUM(quantity) AS quantity_sum",
        "SUM(quantity * unit_price) AS total_price",
      ])
      .addGroupBy("order.id")
      .orderBy("order.id")
      .getRawMany();
  });
  bench("TypeORM Orders: getInfo", async () => {
    await db
      .getRepository(Detail)
      .createQueryBuilder("order_detail")
      .leftJoinAndSelect("order_detail.order", "orders")
      .leftJoinAndSelect("order_detail.product", "products")
      .where("order_detail.order_id = :id", { id: 10248 })
      .getMany();
  });

  await run();
};

main();
