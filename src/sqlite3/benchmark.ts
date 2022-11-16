import { bench, run } from "mitata";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { customerIds, employeeIds, orderIds, productIds, productSearches, customerSearches, supplierIds } from "@/common/meta";

export const startSqlite3Benches = async () => {
  const db = await open({
    filename: "nw.sqlite",
    driver: sqlite3.Database,
  });

  bench("Sqlite3 Driver Customers: getAll", async () => {
    await db.all('SELECT * FROM "customer"')
  });
  bench("Sqlite3 Driver Customers: getInfo", async () => {
    for (const id of customerIds) {
      await db.all("SELECT * FROM customer WHERE customer.id = $1", [id]);
    }
  });
  bench("Sqlite3 Driver Customers: search", async () => {
    for (const companyName of customerSearches) {
      await db.all("SELECT * FROM customer WHERE customer.company_name LIKE ?", [`%${companyName}%`]);
    }
  });

  bench("Sqlite3 Driver Employees: getAll", async () => {
    await db.all("select * from \"employee\"");
  });
  bench("Sqlite3 Driver Employees: getInfo", async () => {
    for (const id of employeeIds) {
      await db.all(
        `select e1.*,
      e2.id as e2_id,
      e2.last_name as e2_last_name,
      e2.first_name as e2_first_name,
      e2.title as e2_title,
      e2.title_of_courtesy as e2_title_of_courtesy,
      e2.birth_date as e2_birth_date,
      e2.hire_date as e2_hire_date,
      e2.address as e2_address,
      e2.city as e2_city,
      e2.postal_code as e2_postal_code,
      e2.country as e2_country,
      e2.home_phone as e2_home_phone,
      e2.extension as e2_extension,
      e2.notes as e2_notes,
      e2.reports_to as e2_reports_to
      from employee as e1
      left join employee as e2
      on e2.id = e1.reports_to
      where e1.id = ?`,
        [id],
      );
    }
  });

  bench("Sqlite3 Driver Suppliers: getAll", async () => {
    await db.all("select * from \"supplier\"");
  });
  bench("Sqlite3 Driver Suppliers: getInfo", async () => {
    for (const id of supplierIds) { await db.all("select * from \"supplier\" where \"supplier\".\"id\" = ?", [id]); }
  });

  bench("Sqlite3 Driver Products: getAll", async () => {
    await db.all("select * from \"product\"");
  });
  bench("Sqlite3 Driver Products: getInfo", async () => {
    for (const id of productIds) {
      await db.all(
        `select product.*, supplier.id as s_id, company_name, contact_name,
      contact_title, address, city, region, postal_code, country, phone from product
      left join supplier on product.supplier_id = supplier.id where product.id = ?`,
        [id],
      );
    }
  });
  bench("Sqlite3 Driver Products: search", async () => {
    for (const name of productSearches) { await db.all("select * from \"product\" where \"product\".\"name\" like ?", [`%${name}%`]); }
  });

  bench("Sqlite3 Driver Orders: getAll", async () => {
    await db.all(
      `select "o"."id", "shipped_date", "ship_name", "ship_city", "ship_country",
      count("product_id") as "products_count", sum("quantity") as "quantity_sum", sum("quantity" * "unit_price") as "total_price"
      from "order" as "o" left join "order_detail" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`,
    );
  });
  bench("Sqlite3 Driver Orders: getInfo", async () => {
    for (const id of orderIds) {
      await db.all(
        `select "order_detail"."unit_price", "quantity", "discount", "order_id", "product_id",
      "order"."id" as "o_id", "order_date", "required_date", "shipped_date", "ship_via", "freight", "ship_name",
      "ship_city", "ship_region", "ship_postal_code", "ship_country", "customer_id", "employee_id",
      "product"."id" as "p_id", "name", "quantity_per_unit", product."unit_price" as "p_unit_price",
      "units_in_stock", "units_on_order", "reorder_level", "discontinued", "supplier_id"
      from "order_detail"
      left join "order" on "order_detail"."order_id" = "order"."id"
      left join "product" on "order_detail"."product_id" = "product"."id"
      where "order_detail"."order_id" = ?`,
        [id],
      );
    }
  });
  await run();
};

startSqlite3Benches();
