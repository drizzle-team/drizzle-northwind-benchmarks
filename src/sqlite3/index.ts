import sqlite3 from "sqlite3";
import fs from "fs";
import path from "node:path";
import { open } from "sqlite";

export const getConnection = async () => {
  const db = await open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
  const migration = fs.readFileSync(path.resolve("data/createTb.sql"), "utf8");
  await db.exec(migration);

  const data = fs.readFileSync(path.resolve("data/allTablesData.sql"), "utf8");
  await db.exec(data);
  return db;
};
