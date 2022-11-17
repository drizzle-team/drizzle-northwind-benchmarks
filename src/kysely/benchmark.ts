import { run, bench } from "mitata";
import { Kysely, sql, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { Database as DatabaseInit } from "./db";
import {
  customerIds,
  employeeIds,
  orderIds,
  productIds,
  productSearches,
  customerSearches,
  supplierIds,
} from "@/common/meta";

const db = new Kysely<DatabaseInit>({
  dialect: new SqliteDialect({
    database: new Database("nw.sqlite"),
  }),
});

bench("Kysely ORM Customers: getAll", async () => {
  await db.selectFrom("customer").selectAll().execute();
});
bench("Kysely ORM Customers: getInfo", async () => {
  for (const id of customerIds) {
    await db
      .selectFrom("customer")
      .selectAll()
      .where("customer.id", "=", id)
      .execute();
  }
});
bench("Kysely ORM Customers: search", async () => {
  for (const it of customerSearches) {
    await db
      .selectFrom("customer")
      .selectAll()
      .where(sql`lower(company_name)`, "like", `%${it}%`)
      .execute();
  }
});

bench("Kysely ORM Employees: getAll", async () => {
  await db.selectFrom("employee").selectAll().execute();
});
bench("Kysely ORM Employees: getInfo", async () => {
  for (const id of employeeIds) {
    await db
      .selectFrom("employee as e1")
      .selectAll()
      .where("e1.id", "=", id)
      .leftJoin(
        db
          .selectFrom("employee as e2")
          .select([
            "id as e2_id",
            "last_name as e2_last_name",
            "first_name as e2_first_name",
            "title as e2_title",
            "title_of_courtesy as e2_title_of_courtesy",
            "birth_date as e2_birth_date",
            "hire_date as e2_hire_date",
            "address as e2_address",
            "city as e2_city",
            "postal_code as e2_postal_code",
            "country as e2_country",
            "home_phone as e2_home_phone",
            "extension as e2_extension",
            "notes as e2_notes",
            "reports_to as e2_reports_to",
          ])
          .as("e2"),
        "e2.e2_id",
        "e1.reports_to"
      )
      .execute();
  }
});

bench("Kysely ORM Suppliers: getAll", async () => {
  await db.selectFrom("supplier").selectAll().execute();
});
bench("Kysely ORM Suppliers: getInfo", async () => {
  for (const id of supplierIds) {
    await db
      .selectFrom("supplier")
      .selectAll()
      .where("supplier.id", "=", id)
      .execute();
  }
});

bench("Kysely ORM Products: getAll", async () => {
  await db.selectFrom("product").selectAll().execute();
});
bench("Kysely ORM Products: getInfo", async () => {
  for (const id of productIds) {
    await db
      .selectFrom("product")
      .selectAll()
      .where("product.id", "=", id)
      .leftJoin(
        db
          .selectFrom("supplier")
          .select([
            "id as s_id",
            "company_name",
            "contact_name",
            "contact_title",
            "address",
            "city",
            "region",
            "postal_code",
            "country",
            "phone",
          ])
          .as("s1"),
        "s1.s_id",
        "product.supplier_id"
      )
      .execute();
  }
});
bench("Kysely ORM Products: search", async () => {
  for (const it of productSearches) {
    await db
      .selectFrom("product")
      .selectAll()
      .where(sql`lower(name)`, "like", `%${it}%`)
      .execute();
  }
});

bench("Kysely ORM Orders: getAll", async () => {
  await db
    .selectFrom("order")
    .select([
      "order.id",
      "order.shipped_date",
      "order.ship_name",
      "order.ship_city",
      "order.ship_country",
      db.fn.count("product_id").as("products_count"),
      db.fn.sum("quantity").as("quantity_sum"),
      sql`SUM(quantity * unit_price)`.as("total_price"),
    ])
    .leftJoin("order_detail", "order_detail.order_id", "order.id")
    .groupBy("order.id")
    .orderBy("order.id", "asc")
    .execute();
});

bench("Kysely ORM Orders: getInfo", async () => {
  for (const id of orderIds) {
    await db
      .selectFrom("order_detail")
      .selectAll()
      .where("order_id", "=", id)
      .leftJoin(
        db
          .selectFrom("order")
          .select([
            "order.id as o_id",
            "order_date",
            "required_date",
            "shipped_date",
            "ship_via",
            "freight",
            "ship_name",
            "ship_city",
            "ship_region",
            "ship_postal_code",
            "ship_country",
            "customer_id",
            "employee_id",
          ])
          .as("o"),
        "o.o_id",
        "order_detail.order_id"
      )
      .leftJoin(
        db
          .selectFrom("product")
          .select([
            "product.id as p_id",
            "name",
            "quantity_per_unit",
            "product.unit_price as p_unit_price",
            "units_in_stock",
            "units_on_order",
            "reorder_level",
            "discontinued",
            "supplier_id",
          ])
          .as("p"),
        "p.p_id",
        "order_detail.product_id"
      )
      .execute();
  }
});

const main = async () => {
  await run();
};
main();
