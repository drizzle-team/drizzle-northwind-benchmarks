import knex from "knex";
import { bench, run } from "mitata";

const db = knex({
  client: "better-sqlite3", // 'sqlite3'
  connection: {
    filename: "nw.sqlite",
  },
  useNullAsDefault: true,
});

bench("Knex ORM customer: getAll", async () => {
  await db("customer").select();
});
bench("Knex ORM customer: getInfo", async () => {
  await db("customer").where({ id: "ALFKI" }).first();
});
bench("Knex ORM customer: search", async () => {
  await db("customer").whereRaw("company_name LIKE ?", ["%ha%"]).select();
});

bench("Knex ORM Employees: getAll", async () => {
  await db("employee").select();
});
bench("Knex ORM Employees: getInfo", async () => {
  await db("employee as e1")
    .whereRaw("e1.id = (?)", ["1"])
    .leftJoin("employee as e2", "e1.reports_to", "e2.id")
    .select([
      "e1.*",
      "e2.id as e_id",
      "e2.last_name as e_last_name",
      "e2.first_name as e_first_name",
    ]);
});

bench("Knex ORM Suppliers: getAll", async () => {
  await db("supplier").select();
});
bench("Knex ORM Suppliers: getInfo", async () => {
  await db("supplier").where({ id: "1" }).first();
});

bench("Knex ORM Products: getAll", async () => {
  await db("product").select();
});

bench("Knex ORM Products: getInfo", async () => {
  await db("product")
    .select([
      "product.*",
      "supplier.id as s_id",
      "supplier.company_name as s_company_name",
    ])
    .whereRaw("product.id = (?)", ["1"])
    .leftJoin("supplier", "product.supplier_id", "supplier.id");
});

bench("Knex ORM Products: search", async () => {
  await db("product").whereRaw("name LIKE ?", ["%cha%"]).select();
});

bench("Knex ORM Orders: getAll", async () => {
  // Query with agregate columns
  await db("order")
    .select([
      "order.id",
      "order.shipped_date",
      "order.ship_name",
      "order.ship_city",
      "order.ship_country",
    ])
    .leftJoin("order_detail", "order_detail.order_id", "order.id")
    .count("product_id as product")
    .sum("quantity as quantity")
    .sum(db.raw("?? * ??", ["quantity", "unit_price"]))
    .groupBy("order.id")
    .orderBy("order.id", "asc");
    
});
bench("Knex ORM Orders: getInfo", async () => {
  await db("order_detail as od")
    .whereRaw("od.order_id = (?)", ["10248"])
    .leftJoin("order as o", "o.id", "od.order_id")
    .leftJoin("product as p", "p.id", "od.product_id")
    .select([
      "o.*",

      "od.unit_price as od_uprice",
      "od.quantity as od_quantity",
      "od.discount as od_discount",

      "p.id as p_id",
      "p.name as p_name",
    ]);
});

const main = async () => {
  await run();
};
main();
