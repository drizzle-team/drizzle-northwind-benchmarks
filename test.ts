import Database from "better-sqlite3";

const instance = new Database("nw.sqlite");
const ids = instance
  .prepare('select * from "customer"')
  .all()
  .map((it) => it.id);

const shuffled = ids
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

console.log(shuffled);
