import { run, bench } from "mitata";
import { sql } from "kysely";
import { getConnection } from "./index";

export const startKyselyOrmBenches = async () => {
  const db = await getConnection();

  bench("Kysely ORM Customers: getAll", async () => {
    await db.selectFrom("customer").selectAll().execute();
  });
  bench("Kysely ORM Customers: getInfo", async () => {
    await db.selectFrom("customer")
      .selectAll()
      .where("customer.id", "=", "ALFKI")
      .limit(1)
      .execute();
  });
  bench("Kysely ORM Customers: search", async () => {
    await db.selectFrom("customer")
      .selectAll()
      .where(sql`company_name`, "like", "%ha%")
      .execute();
  });

  bench("Kysely ORM Employees: getAll", async () => {
    await db.selectFrom("employee").selectAll().execute();
  });
  bench("Kysely ORM Employees: getInfo", async () => {
    await db.selectFrom("employee as e1")
      .selectAll()
      .where("e1.id", "=", 1)
      .leftJoin(
        db.selectFrom("employee as e2")
          .select(["id as e_id", "last_name as e_last_name", "first_name as e_first_name"])
          .as("e2"),
        "e2.e_id",
        "e1.recipient_id",
      )
      .execute();
  });

  bench("Kysely ORM Suppliers: getAll", async () => {
    await db.selectFrom("supplier").selectAll().execute();
  });
  bench("Kysely ORM Suppliers: getInfo", async () => {
    await db.selectFrom("supplier")
      .selectAll()
      .where("supplier.id", "=", 1)
      .limit(1)
      .execute();
  });

  bench("Kysely ORM Products: getAll", async () => {
    await db.selectFrom("product").selectAll().execute();
  });
  bench("Kysely ORM Products: getInfo", async () => {
    await db.selectFrom("product")
      .selectAll()
      .where("product.id", "=", 1)
      .limit(1)
      .leftJoin(
        db.selectFrom("supplier")
          .select(["supplier.id as s_id", "supplier.company_name as s_company_name"])
          .as("s1"),
        "s1.s_id",
        "product.supplier_id",
      )
      .execute();
  });
  bench("Kysely ORM Products: search", async () => {
    await db.selectFrom("product")
      .selectAll()
      .where(sql`name`, "like", `%${"cha".toLowerCase()}%`)
      .execute();
  });

  bench("Kysely ORM Orders: getAll", async () => {
    await db.selectFrom("order")
      .selectAll()
      .leftJoin(
        db.selectFrom("order_detail")
          .select(["quantity", "unit_price", "order_id"])
          .as("e"),
        "e.order_id",
        "order.id",
      ).execute();
  });

  bench("Kysely ORM Orders: getInfo", async () => {
    await db.selectFrom("order_detail")
      .selectAll()
      .where("order_id", "=", 10248)
      .leftJoin(
        db.selectFrom("order")
          .select([
            "ship_name",
            "ship_via",
            "freight",
            "order_date",
            "required_date",
            "shipped_date",
            "ship_city",
            "ship_region",
            "ship_postal_code",
            "ship_country",
            "customer_id",
            "id",
          ])
          .as("o"),
        "o.id",
        "order_detail.order_id",
      )
      .leftJoin(
        db.selectFrom("product")
          .select(["id as p_id", "name as p_name"])
          .as("p"),
        "p.p_id",
        "order_detail.product_id",
      )
      .execute();
  });

  await run();
};

startKyselyOrmBenches();
