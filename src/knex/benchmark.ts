import knex from "knex";
import { bench, run } from "mitata";
import { customerIds, employeeIds, orderIds, productIds, productSearches, customerSearches, supplierIds } from "@/common/meta";

const db = knex({
  client: "better-sqlite3", // 'sqlite3'
  connection: {
    filename: "nw.sqlite",
  },
  useNullAsDefault: true,
});

bench("Knex ORM customer: getAll", async () => {
  await db("customer");
});
bench("Knex ORM customer: getInfo", async () => {
  for (const id of customerIds) { await db("customer").where({ id }).first(); }
});
bench("Knex ORM customer: search", async () => {
  for (const it of customerSearches) { await db("customer").whereRaw("company_name LIKE ?", [`%${it}%`]); }
});

bench("Knex ORM Employees: getAll", async () => {
  await db("employee");
});
bench("Knex ORM Employees: getInfo", async () => {
  for (const id of employeeIds) {
    await db("employee as e1")
      .select([
        "e1.*",
        "e2.id as e2_id",
        "e2.last_name as e2_last_name",
        "e2.first_name as e2_first_name",
        "e2.title as e2_title",
        "e2.title_of_courtesy as e2_title_of_courtesy",
        "e2.birth_date as e2_birth_date",
        "e2.hire_date as e2_hire_date",
        "e2.address as e2_address",
        "e2.city as e2_city",
        "e2.postal_code as e2_postal_code",
        "e2.country as e2_country",
        "e2.home_phone as e2_home_phone",
        "e2.extension as e2_extension",
        "e2.notes as e2_notes",
        "e2.reports_to as e2_reports_to",
      ])
      .whereRaw("e1.id = ?", [id])
      .leftJoin("employee as e2", "e1.reports_to", "e2.id");
  }
});

bench("Knex ORM Suppliers: getAll", async () => {
  await db("supplier");
});
bench("Knex ORM Suppliers: getInfo", async () => {
  for (const id of supplierIds) { await db("supplier").where({ id }).first(); }
});

bench("Knex ORM Products: getAll", async () => {
  await db("product");
});

bench("Knex ORM Products: getInfo", async () => {
  for (const id of productIds) {
    await db("product")
      .select([
        "product.*",
        "supplier.id as s_id",
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
      .whereRaw("product.id = ?", [id])
      .leftJoin("supplier", "supplier.id", "product.supplier_id");
  }
});

bench("Knex ORM Products: search", async () => {
  for (const it of productSearches) { await db("product").whereRaw("name LIKE ?", [`%${it}%`]); }
});

bench("Knex ORM Orders: getAll", async () => {
  await db("order")
    .select([
      "order.id",
      "order.shipped_date",
      "order.ship_name",
      "order.ship_city",
      "order.ship_country",
    ])
    .leftJoin("order_detail", "order_detail.order_id", "order.id")
    .count("product_id as products_count")
    .sum("quantity as quantity_sum")
    .sum({ total_price: db.raw("?? * ??", ["quantity", "unit_price"]) })
    .groupBy("order.id")
    .orderBy("order.id", "asc");
});
bench("Knex ORM Orders: getInfo", async () => {
  for (const id of orderIds) {
    await db("order_detail")
      .select([
        "order_detail.*",
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
      .whereRaw("order_detail.order_id = ?", id)
      .leftJoin("product", "product.id", "order_detail.product_id")
      .leftJoin("order", "order.id", "order_detail.order_id");
  }
});

const main = async () => {
  await run();
};
main();
