import { bench, run } from "mitata";
import Database from "better-sqlite3";
import { customerIds, employeeIds, orderIds, productIds, searchesCustomer, searchesProduct, supplierIds } from "@/common/meta";

const db = new Database("nw.sqlite");

bench("Better-sqlite3 Customers: getAll", () => {
  db.prepare("select * from \"customer\"").all();
});

bench("Better-sqlite3 Customers: getInfo", async () => {
  for (const id of customerIds) {
    await db.prepare("select * from \"customer\" where \"customer\".\"id\" = ?").get(id);
  }
});

bench("Better-sqlite3 Customers: search", () => {
  searchesCustomer.forEach((companyName) => {
    db.prepare(
      "select * from \"customer\" where \"customer\".\"company_name\" like ?",
    ).all(`%${companyName}%`);
  });
});

bench("Better-sqlite3 Employees: getAll", () => {
  db.prepare("select * from \"employee\"").all();
});

bench("Better-sqlite3 Employees: getInfo", async () => {
  for (const id of employeeIds) {
    await db.prepare(
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
    ).get(id);
  }
});

bench("Better-sqlite3 Suppliers: getAll", () => {
  db.prepare("select * from \"supplier\"").all();
});

bench("Better-sqlite3 Suppliers: getInfo", async () => {
  for (const id of supplierIds) {
    await db.prepare("select * from \"supplier\" where \"supplier\".\"id\" = ?").get(id);
  }
});

bench("Better-sqlite3 Products: getAll", () => {
  db.prepare("select * from \"product\"").all();
});

bench("Better-sqlite3 Products: getInfo", async () => {
  for (const id of productIds) {
    await db.prepare(
      `select product.*, supplier.id as s_id, company_name, contact_name, 
    contact_title, address, city, region, postal_code, country, phone from product 
    left join supplier on product.supplier_id = supplier.id where product.id = ?`,
    ).get(id);
  }
});

bench("Better-sqlite3 Products: search", () => {
  searchesProduct.forEach((name) => {
    db.prepare("select * from \"product\" where \"product\".\"name\" like ?").all(`%${name}%`);
  });
});

bench("Better-sqlite3 order: getAll", () => {
  db.prepare(
    `select "o"."id", "shipped_date", "ship_name", "ship_city", "ship_country",
    count("product_id") as "products_count", sum("quantity") as "quantity_sum", sum("quantity" * "unit_price") as "total_price"
    from "order" as "o" left join "order_detail" as "od" on "od"."order_id" = "o"."id" group by "o"."id" order by "o"."id" asc`,
  ).all();
});

bench("Better-sqlite3 order: getInfo", async () => {
  console.log(orderIds);
  for (const id of orderIds) {
    await db.prepare(
      `select "order_detail"."unit_price", "quantity", "discount", "order_id", "product_id",
    "order"."id" as "o_id", "order_date", "required_date", "shipped_date", "ship_via", "freight", "ship_name",
    "ship_city", "ship_region", "ship_postal_code", "ship_country", "customer_id", "employee_id",
    "product"."id" as "p_id", "name", "quantity_per_unit", product."unit_price" as "p_unit_price", 
    "units_in_stock", "units_on_order", "reorder_level", "discontinued", "supplier_id"
    from "order_detail" 
    left join "order" on "order_detail"."order_id" = "order"."id"
    left join "product" on "order_detail"."product_id" = "product"."id" 
    where "order_detail"."order_id" = ?`,
    ).all(id);
  }
});

const main = async () => {
  await run();
};
main();
