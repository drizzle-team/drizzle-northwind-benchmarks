import { bench, run } from "mitata";
import { getConnection } from "./index";

export const startSqlite3Benches = async () => {
  const db = await getConnection();

  const count = new Array(100);

  bench("Sqlite3 Driver Customers: getAll", async () => {
    for (const i of count) {
      await db.all("select * from \"customers\"");
    }
  });
  bench("Sqlite3 Driver Customers: getInfo", async () => {
    for (const i of count) {
      await db.all("select * from \"customers\" where \"customers\".\"id\" = $1", ["ALFKI"]);
    }
  });
  bench("Sqlite3 Driver Customers: search", async () => {
    for (const i of count) {
      await db.all("select * from \"customers\" where \"customers\".\"company_name\" like ?", ["%ha%"]);
    }
  });

  bench("Sqlite3 Driver Employees: getAll", async () => {
    for (const i of count) {
      await db.all("select * from \"employees\"");
    }
  });
  bench("Sqlite3 Driver Employees: getInfo", async () => {
    for (const i of count) {
      await db.all(`select "e1".*, "e2"."last_name" as "reports_lname", "e2"."first_name" as "reports_fname"
                from "employees" as "e1" left join "employees" as "e2" on "e2"."id" = "e1"."recipient_id" where "e1"."id" = ?`, ["1"]);
    }
  });

  bench("Sqlite3 Driver Suppliers: getAll", async () => {
    for (const i of count) {
      await db.all("select * from \"suppliers\"");
    }
  });
  bench("Sqlite3 Driver Suppliers: getInfo", async () => {
    for (const i of count) {
      await db.all("select * from \"suppliers\" where \"suppliers\".\"id\" = ?", ["1"]);
    }
  });

  bench("Sqlite3 Driver Products: getAll", async () => {
    for (const i of count) {
      await db.all("select * from \"products\"");
    }
  });
  bench("Sqlite3 Driver Products: getInfo", async () => {
    for (const i of count) {
      await db.all(`select "products".*, "suppliers".*
                from "products" left join "suppliers" on "products"."supplier_id" = "suppliers"."id" where "products"."id" = ?`, ["1"]);
    }
  });
  bench("Sqlite3 Driver Products: search", async () => {
    for (const i of count) {
      await db.all("select * from \"products\" where \"products\".\"name\" like ?", ["%cha%"]);
    }
  });

  bench("Sqlite3 Driver Orders: getAll", async () => {
    for (const i of count) {
      await db.all(`select "id", "shipped_date", "ship_name", "ship_city", "ship_country", count("product_id") as "products",
              sum("quantity") as "quantity", sum("quantity" * "unit_price") as "total_price"
              from "orders" as "o" left join "order_details" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`);
    }
  });
  bench("Sqlite3 Driver Orders: getInfo", async () => {
    for (const i of count) {
      await db.all(`select "order_details"."unit_price", "order_details"."quantity", "order_details"."discount", "order_details"."order_id",
              "order_details"."product_id", "orders"."id", "orders"."order_date", "orders"."required_date", "orders"."shipped_date", "orders"."ship_via",
              "orders"."freight", "orders"."ship_name", "orders"."ship_city", "orders"."ship_region", "orders"."ship_postal_code", "orders"."ship_country",
              "orders"."customer_id", "orders"."employee_id", "products"."id", "products"."name", "products"."qt_per_unit", "products"."unit_price",
              "products"."units_in_stock", "products"."units_on_order", "products"."reorder_level", "products"."discontinued", "products"."supplier_id"
              from "order_details" left join "orders" on "order_details"."order_id" = "orders"."id"
              left join "products" on "order_details"."product_id" = "products"."id" where "order_details"."order_id" = ?`, ["10248"]);
    }
  });
  await run();
};

startSqlite3Benches();
