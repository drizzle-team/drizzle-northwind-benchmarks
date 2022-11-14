import { run, bench } from "mitata";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

bench("Prisma ORM Customers: getAll", async () => {
  await prisma.customer.findMany();
});
bench("Prisma ORM Customers: getInfo", async () => {
  await prisma.customer.findUnique({
    where: {
      id: "ALFKI",
    },
  });
});
bench("Prisma ORM Customers: search", async () => {
  await prisma.customer.findMany({
    where: {
      companyName: {
        contains: "ha",
      },
    },
  });
});
bench("Prisma ORM Employees: getAll", async () => {
  await prisma.employee.findMany();
});
bench("Prisma ORM Employees: getInfo", async () => {
  await prisma.employee.findUnique({
    where: {
      id: 1,
    },
    include: {
      recipient: true,
    },
  });
});
bench("Prisma ORM Suppliers: getAll", async () => {
  await prisma.supplier.findMany();
});
bench("Prisma ORM Suppliers: getInfo", async () => {
  await prisma.supplier.findUnique({
    where: {
      id: 1,
    },
  });
});
bench("Prisma ORM Products: getAll", async () => {
  await prisma.product.findMany();
});
bench("Prisma ORM Products: getInfo", async () => {
  await prisma.product.findUnique({
    where: {
      id: 1,
    },
    include: {
      supplier: true,
    },
  });
});
bench("Prisma ORM Products: search", async () => {
  await prisma.product.findMany({
    where: {
      name: {
        contains: "cha",
      },
    },
  });
});

bench("Prisma ORM Orders: getAll", async () => {
  await prisma.$queryRaw`
    select o.id, o.shipped_date, o.ship_name, o.ship_city, o.ship_country,
      count(od.product_id) as products_count, 
      sum(od.quantity) as quantity_sum, 
      sum(od.quantity * od.unit_price) as total_price
    from "order" as o left join "order_detail" as od on o.id = od.order_id
    group by o.id 
    order by o.id asc`;
});

bench("Prisma ORM Orders: getInfo", async () => {
  await prisma.detail.findMany({
    where: {
      orderId: 10248,
    },
    include: {
      order: true,
      product: true,
    },
  });
});

const main = async () => {
  await run();
};

main();
