import { bench, run } from "mitata";
import Database from "better-sqlite3";
import {
  customerIds,
  employeeIds,
  orderIds,
  productIds,
  customerSearches,
  productSearches,
  supplierIds,
} from "@/common/meta";

const db = new Database("nw.sqlite");

bench("Better-sqlite3 Customers: getAll", () => {
  db.prepare('SELECT * FROM "customer"').all();
});

bench("Better-sqlite3 Customers: getInfo", () => {
  customerIds.forEach((it) => {
    db.prepare("SELECT * FROM customer WHERE customer.id = ?").get(it);
  });
});

bench("Better-sqlite3 Customers: search", () => {
  customerSearches.forEach((it) => {
    db.prepare("SELECT * FROM customer WHERE LOWER(customer.company_name) LIKE ?").all(
      `%${it}%`
    );
  });
});

bench("Better-sqlite3 Employees: getAll", () => {
  db.prepare("SELECT * FROM employee").all();
});

bench("Better-sqlite3 Employees: getInfo", () => {
  employeeIds.forEach((it) => {
    db.prepare(
      `SELECT e1.*,
      e2.id AS e2_id,
      e2.last_name AS e2_last_name,
      e2.first_name AS e2_first_name,
      e2.title AS e2_title,
      e2.title_of_courtesy AS e2_title_of_courtesy,
      e2.birth_date AS e2_birth_date,
      e2.hire_date AS e2_hire_date,
      e2.address AS e2_address,
      e2.city AS e2_city,
      e2.postal_code AS e2_postal_code,
      e2.country AS e2_country,
      e2.home_phone AS e2_home_phone,
      e2.extension AS e2_extension,
      e2.notes AS e2_notes,
      e2.reports_to AS e2_reports_to
      FROM employee AS e1
      LEFT JOIN employee AS e2
      ON e2.id = e1.reports_to
      WHERE e1.id = ?`
    ).get(it);
  });
});

bench("Better-sqlite3 Suppliers: getAll", () => {
  db.prepare("SELECT * FROM supplier").all();
});

bench("Better-sqlite3 Suppliers: getInfo", () => {
  supplierIds.forEach((it) => {
    db.prepare("SELECT * FROM supplier WHERE supplier.id = ?").get(it);
  });
});

bench("Better-sqlite3 Products: getAll", () => {
  db.prepare("SELECT * FROM product").all();
});

bench("Better-sqlite3 Products: getInfo", () => {
  productIds.forEach((it) => {
    db.prepare(
      `SELECT * FROM product LEFT JOIN supplier
      ON product.supplier_id = supplier.id
      WHERE product.id = ?`
    ).get(it);
  });
});

bench("Better-sqlite3 Products: search", () => {
  productSearches.forEach((it) => {
    db.prepare("SELECT * FROM product WHERE LOWER(product.name) LIKE ?").all(
      `%${it}%`
    );
  });
});

bench("Better-sqlite3 order: getAll", () => {
  db.prepare(
    `SELECT o.id, o.shipped_date, o.ship_name, o.ship_city, o.ship_country,
      COUNT(od.product_id) AS products_count,
      SUM(od.quantity) AS quantity_sum,
      SUM(od.quantity * unit_price) AS total_price
      FROM "order" AS o LEFT JOIN "order_detail" AS od ON od.order_id = o.id
      GROUP BY o.id
      ORDER BY o.id ASC`
  ).all();
});

bench("Better-sqlite3 order: getInfo", async () => {
  orderIds.forEach((it) => {
    db.prepare(
      `SELECT * FROM order_detail AS od
      LEFT JOIN "product" AS p ON od.product_id = p.id
      LEFT JOIN "order" AS o ON od.order_id = o.id
      WHERE od.order_id = ?`
    ).all(it);
  });
});

const main = async () => {
  // await run();

  const data = db.prepare(
    `SELECT e1.*,
    e2.* as 'sd'
    FROM employee AS e1
    LEFT JOIN employee AS e2
    ON e2.id = e1.reports_to
    WHERE e1.id = ?`
  ).get('1');
  console.log(data);
  
};
main();
