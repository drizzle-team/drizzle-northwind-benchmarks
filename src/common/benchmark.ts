import { bench, group, run } from "mitata";
import Database from "better-sqlite3";
import { eq, ilike, like } from "drizzle-orm/expressions";
import { alias, SQLiteConnector } from "drizzle-orm-sqlite";
import { sql } from "drizzle-orm";
import { placeholder } from "drizzle-orm/sql";
import knx from "knex";
import { DataSource } from "typeorm";
import { PrismaClient } from "@prisma/client";
import {
  employees,
  customers,
  suppliers,
  products,
  orders,
  details,
} from "../drizzle/schema";
import { customerIds, searchesCustomer } from "./meta";
import { Customer } from "@/typeorm/entities/customers";
import { Employee } from "@/typeorm/entities/employees";
import { Supplier } from "@/typeorm/entities/suppliers";
import { Order } from "@/typeorm/entities/orders";
import { Product } from "@/typeorm/entities/products";
import { Detail } from "@/typeorm/entities/details";

const instance = new Database("nw.sqlite");
const drizzle = new SQLiteConnector(new Database("nw.sqlite")).connect();

const knex = knx({
  client: "better-sqlite3",
  // client: "sqlite3",
  connection: {
    filename: "nw.sqlite",
  },
  useNullAsDefault: true,
});

const typeorm = new DataSource({
  type: "sqlite",
  database: "nw.sqlite",
  entities: [Customer, Employee, Supplier, Order, Product, Detail],
});

const prisma = new PrismaClient();

group("select * from customer", () => {
  bench("b3", () => {
    instance.prepare("select * from \"customer\"").all();
  });

  const sql = instance.prepare("select * from \"customer\"");
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
    await knex("customer");
  });

  const repo = typeorm.getRepository(Customer);
  bench("typeorm", async () => {
    await repo.find();
  });

  bench("prisma", async () => {
    await prisma.customer.findMany();
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
    .where(eq(customers.id, ":userId"))
    .prepare();

  bench("drizzle:p", () => {
    customerIds.forEach((id) => {
      prepared.execute({ userId: id });
    });
  });

  bench("knex", async () => {
    for (const id of customerIds) {
      await knex("customer").where({ id });
    }
  });
  const repo = typeorm.getRepository(Customer);
  bench("typeorm", async () => {
    for (const id of customerIds) {
      await repo.createQueryBuilder().where("id = :id", { id }).getOne();
    }
  });

  bench("prisma", async () => {
    for (const id of customerIds) {
      await prisma.customer.findMany({
        where: {
          id,
        },
      });
    }
  });
});

group("select * from customer where company_name like ?", () => {
  const sql1 = instance.prepare(
    "select * from customer where lower(company_name) like ?",
  );

  bench("b3", () => {
    searchesCustomer.forEach((it) => {
      sql1.all(`%${it}%`);
    });
  });

  const drz = drizzle
    .select(customers)
    .where(sql`lower(${customers.companyName}) like ${placeholder("name")}`)
    .prepare();

  bench("drizzle", () => {
    searchesCustomer.forEach((it) => {
      drz.execute({ name: `%${it}%` });
    });
  });

  bench("knex", async () => {
    for (const it of searchesCustomer) {
      await knex("customer").whereRaw("lower(company_name) LIKE ?", [`%${it}%`]);
    }
  });

  const repo = typeorm.getRepository(Customer);
  bench("typeorm", async () => {
    for (const it of searchesCustomer) {
      await repo
        .createQueryBuilder()
        .where("lower(company_name) like :company", { company: `%${it}%` })
        .getMany();
    }
  });

  bench("prisma", async () => {
    for (const it of searchesCustomer) {
      await prisma.customer.findMany({
        where: {
          companyName: {
            contains: it,
          },
        },
      });
    }
  });
});

const main = async () => {
  await typeorm.initialize();

  await run();
  process.exit(1);
};
main();

const test = async () => {
  await typeorm.initialize();

  const drz = drizzle
    .select(customers)
    .where(sql`lower(${customers.companyName}) like ${placeholder("name")}`)
    .prepare();

  console.log(
    typeorm
      .getRepository(Customer)
      .createQueryBuilder()
      .where("company_name like :company")
      .getSql(),
  );
  // console.log(db("customer").whereRaw("lower(company_name) LIKE %ha%"))
  process.exit(1);
};
// test();
