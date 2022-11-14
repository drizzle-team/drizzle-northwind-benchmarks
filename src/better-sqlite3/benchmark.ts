import { bench, run } from "mitata";
import Database from "better-sqlite3";
import { searches } from "@/common/meta";

const db = new Database("nw.sqlite");

bench("Better-sqlite3 Customers: getAll", async () => {
  db.prepare("select * from \"customer\"").all();
});

bench("Better-sqlite3 Customers: getInfo", async () => {
  db.prepare("select * from \"customer\" where \"customer\".\"id\" = ?").get("ALFKI");
});

bench("Better-sqlite3 Customers: search", async () => {
  searches.forEach((it) => {
    db.prepare(
      "select * from \"customer\" where \"customer\".\"company_name\" like ?",
    ).all(`%${it}%`);
  });
});

bench("Better-sqlite3 Employees: getAll", async () => {
  db.prepare("select * from \"employee\"").all();
});

bench("Better-sqlite3 Employees: getInfo", async () => {
  db.prepare(
    `select "e1".*, "e2"."last_name" as "reports_lname", "e2"."first_name" as "reports_fname"
                from "employee" as "e1" left join "employee" as "e2" on "e2"."id" = "e1"."reports_to" where "e1"."id" = ?`,
  ).get("1");
});

bench("Better-sqlite3 Suppliers: getAll", async () => {
  db.prepare("select * from \"supplier\"").all();
});

bench("Better-sqlite3 Suppliers: getInfo", async () => {
  db.prepare("select * from \"supplier\" where \"supplier\".\"id\" = ?").get("1");
});

bench("Better-sqlite3 Products: getAll", async () => {
  db.prepare("select * from \"product\"").all();
});

bench("Better-sqlite3 Products: getInfo", async () => {
  db.prepare(
    `select "product".*, "supplier".*
                from "product" left join "supplier" on "product"."supplier_id" = "supplier"."id" where "product"."id" = ?`,
  ).get("1");
});

bench("Better-sqlite3 Products: search", async () => {
  db.prepare("select * from \"product\" where \"product\".\"name\" like ?").all(
    "%cha%",
  );
});

bench("Better-sqlite3 order: getAll", async () => {
  db.prepare(
    `select "o"."id", "shipped_date", "ship_name", "ship_city", "ship_country", count("product_id") as "products_count",
              sum("quantity") as "quantity", sum("quantity" * "unit_price") as "total_price"
              from "order" as "o" left join "order_detail" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`,
  ).all();
});

bench("Better-sqlite3 order: getInfo", async () => {
  db.prepare(
    `select "order_detail"."unit_price", "order_detail"."quantity", "order_detail"."discount", "order_detail"."order_id",
              "order_detail"."product_id", "order"."id", "order"."order_date", "order"."required_date", "order"."shipped_date", "order"."ship_via",
              "order"."freight", "order"."ship_name", "order"."ship_city", "order"."ship_region", "order"."ship_postal_code", "order"."ship_country",
              "order"."customer_id", "order"."employee_id", "product"."id", "product"."name", "product"."quantity_per_unit", "product"."unit_price",
              "product"."units_in_stock", "product"."units_on_order", "product"."reorder_level", "product"."discontinued", "product"."supplier_id"
              from "order_detail" left join "order" on "order_detail"."order_id" = "order"."id"
              left join "product" on "order_detail"."product_id" = "product"."id" where "order_detail"."order_id" = ?`,
  ).get("10248");
});

const main = async () => {
  await run();
};
main();
