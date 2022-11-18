import { bench, group, run } from "mitata";
import Database from "better-sqlite3";
import { asc, eq, like } from "drizzle-orm/expressions";
import { alias, SQLiteConnector } from "drizzle-orm-sqlite";
import { sql } from "drizzle-orm";
import { placeholder } from "drizzle-orm/sql";
import {
  employees,
  customers,
  suppliers,
  products,
  orders,
  details,
} from "./drizzle/schema";
import {
  customerIds,
  customerSearches,
  employeeIds,
  orderIds,
  productSearches,
} from "./common/meta";

const instance = new Database("nw.sqlite");
const drizzle = new SQLiteConnector(new Database("nw.sqlite")).connect();

const sql1 = instance.prepare('select * from "customer"');
const sql2 = instance.prepare("select * from customer where id = ?");
const sql3 = instance.prepare(
  "select * from customer where company_name like ?"
);
const sql4 = instance.prepare("SELECT * FROM employee");
const sql5 = instance.prepare(
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
);
const sql6 = instance.prepare("SELECT * FROM supplier");
const sql7 = instance.prepare("SELECT * FROM product");
const sql8 = instance.prepare(
  "SELECT * FROM product WHERE product.name LIKE ?"
);

const sql9 = instance.prepare(
  `SELECT * FROM "order" AS o
 LEFT JOIN "order_detail" AS od ON od.order_id = o.id
 LEFT JOIN "product" AS p ON od.product_id = p.id
 WHERE o.id = ?`
);

const sql10 = instance.prepare(
  `SELECT o.id, o.shipped_date, o.ship_name, o.ship_city, o.ship_country,
      COUNT(od.product_id) AS products_count,
      SUM(od.quantity) AS quantity_sum,
      SUM(od.quantity * unit_price) AS total_price
      FROM "order" AS o LEFT JOIN "order_detail" AS od ON od.order_id = o.id
      GROUP BY o.id
      ORDER BY o.id ASC`
);

group({ name: "better-sqlite3", summary: false }, () => {
  bench("select * from customer", () => {
    sql1.all();
  });

  bench("select * from customer where id = ?", () => {
    customerIds.forEach((id) => {
      sql2.get(id);
    });
  });

  bench("select * from customer where company_name like ?", () => {
    customerSearches.forEach((it) => {
      sql3.all(`%${it}%`);
    });
  });

  bench("SELECT * FROM employee", () => {
    sql4.all();
  });

  bench("select * from employee where id = ? left join reportee", () => {
    employeeIds.forEach((id) => {
      sql5.all(id);
    });
  });

  bench("SELECT * FROM supplier", () => {
    sql6.all();
  });

  bench("SELECT * FROM product", () => {
    sql7.all();
  });

  bench("SELECT * FROM product WHERE product.name LIKE ?", () => {
    productSearches.forEach((it) => {
      sql8.all(`%${it}%`);
    });
  });

  bench(
    "SELECT * FROM order WHERE order_id = ? LEFT JOIN details and products",
    () => {
      orderIds.forEach((it) => {
        sql9.all(it);
      });
    }
  );


  bench("select all order with sum and count", () => {
    sql10.all();
  });
});

const d1 = drizzle.select(customers).prepare();
const d2 = drizzle
  .select(customers)
  .where(eq(customers.id, placeholder("userId")))
  .prepare();
const d3 = drizzle
  .select(customers)
  .where(sql`${customers.companyName} like ${placeholder("name")}`)
  .prepare();
const d4 = drizzle.select(employees).prepare();

const e2 = alias(employees, "recipient");
const d5 = drizzle
  .select(employees)
  .leftJoin(e2, eq(e2.id, employees.reportsTo))
  .where(eq(employees.id, placeholder("employeeId")))
  .prepare();

const d6 = drizzle.select(suppliers).prepare();
const d7 = drizzle.select(products).prepare();
const d8 = drizzle
  .select(products)
  .where(sql`${products.name} like ${placeholder("name")}`)
  .prepare();

const d9 = drizzle
  .select(orders)
  .leftJoin(details, eq(orders.id, details.orderId))
  .leftJoin(products, eq(details.productId, products.id))
  .where(eq(orders.id, placeholder("orderId")))
  .prepare();

const d10 = drizzle
  .select(orders)
  .fields({
    id: orders.id,
    shippedDate: orders.shippedDate,
    shipName: orders.shipName,
    shipCity: orders.shipCity,
    shipCountry: orders.shipCountry,
    productsCount: sql`count(${details.productId})`.as<number>(),
    quantitySum: sql`sum(${details.quantity})`.as<number>(),
    totalPrice:
      sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
  })
  .leftJoin(details, eq(orders.id, details.orderId))
  .groupBy(orders.id)
  .orderBy(asc(orders.id))
  .prepare();

group({ name: "drizzle", summary: false }, () => {
  bench("select * from customer", () => {
    d1.execute();
  });
  bench("select * from customer where id = ?", () => {
    customerIds.forEach((id) => {
      d2.execute({ userId: id });
    });
  });

  bench("select * from customer where company_name like ?", () => {
    customerSearches.forEach((it) => {
      d3.execute({ name: `%${it}%` });
    });
  });

  bench("SELECT * FROM employee", () => {
    d4.execute();
  });

  bench("select * from employee where id = ? left join reportee", () => {
    employeeIds.forEach((id) => {
      d5.execute({ employeeId: id });
    });
  });
  bench("SELECT * FROM supplier", () => {
    d6.execute();
  });

  bench("SELECT * FROM product", () => {
    d7.execute();
  });

  bench("SELECT * FROM product WHERE product.name LIKE ?", () => {
    productSearches.forEach((it) => {
      d8.execute({ name: `%${it}%` });
    });
  });

  bench(
    "SELECT * FROM order WHERE order_id = ? LEFT JOIN details and products",
    () => {
      orderIds.forEach((id) => {
        d9.execute({ orderId: id });
      });
    }
  );

  bench("select all order with sum and count", () => {
    d10.execute();
  });
});

const main = async () => {
  await run();
  process.exit(1);
};
main();
