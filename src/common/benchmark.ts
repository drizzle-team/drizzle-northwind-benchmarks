import { bench, group, run } from "mitata";
import Database from "better-sqlite3";
import { eq, ilike, like } from "drizzle-orm/expressions";
import { alias, SQLiteConnector } from "drizzle-orm-sqlite";
import { sql } from "drizzle-orm";
import {
  employees,
  customers,
  suppliers,
  products,
  orders,
  details,
} from "../drizzle/schema";
import { placeholder } from "drizzle-orm/sql";
import { customerIds, searches } from "./meta";
import knex from "knex";

const instance = new Database("nw.sqlite");
const drizzle = new SQLiteConnector(new Database("nw.sqlite")).connect();

const db = knex({
  client: "better-sqlite3",
  // client: "sqlite3",
  connection: {
    filename: "nw.sqlite",
  },
  useNullAsDefault: true,
});

group("select * from customer", () => {
  bench("b3", () => {
    instance.prepare('select * from "customer"').all();
  });

  const sql = instance.prepare('select * from "customer"');
  bench("b3:p", () => {
    sql.all();
  });

  bench("drizzle", () => {
    drizzle.select(customers).execute();
  });

  const prep = drizzle.select(customers);
  bench("drizzle:p", () => {
    prep.execute();
  });

  bench("knex", async () => {
    await db("customer").select();
  });
});

group("select * from customer where id = ?", () => {
  bench("b3", () => {
    customerIds.forEach((id) => {
      instance.prepare("select * from customer where id = ?").get(id);
    });
  });

  const sql = instance.prepare("select * from customer where id = ?");

  bench("b3:p", () => {
    customerIds.forEach((id) => {
      sql.get(id);
    });
  });

  bench("drizzle", () => {
    customerIds.forEach((id) => {
      drizzle.select(customers).where(eq(customers.id, id)).execute();
    });
  });

  const prepared = drizzle
    .select(customers)
    .where(eq(customers.id, placeholder("userId")))
    .prepare();

  bench("drizzle:p", () => {
    customerIds.forEach((id) => {
      prepared.execute({ userId: id });
    });
  });

  bench("knex", async () => {
    for (let id of customerIds) {
      await db("customer").where({ id }).first();
    }
  });
});

group("select * from customer where company_name like ?", () => {
  const sql1 = instance.prepare(
    "select * from customer where lower(company_name) like ?"
  );

  bench("b3", () => {
    searches.forEach((it) => {
      sql1.all(`%${it}%`);
    });
  });

  const drz = drizzle
    .select(customers)
    .where(sql`lower(${customers.companyName}) like ${placeholder("name")}`)
    .prepare();

  bench("drizzle", () => {
    searches.forEach((it) => {
      drz.execute({ name: `%${it}%` });
    });
  });

  bench("knex", async () => {
    for (const it of searches) {
      await db("customer")
        .whereRaw("company_name LIKE ?", [`%${it}%`])
        .select();
    }
  });
});

const main = async () => {
  await run();
};
// main();

const test = async () => {
  const drz = drizzle
    .select(customers)
    .where(sql`lower(${customers.companyName}) like ${placeholder("name")}`)
    .prepare();
  console.log("drizzle:", drz.execute({ name: "%ha%" })[0]);
  console.log("knex:",
    await db("customer").whereRaw("lower(company_name) like %ha%")    
  );
  console.log(db("customer").whereRaw("lower(company_name) LIKE %ha%"))
};
test();
