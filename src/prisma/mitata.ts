import { run, bench } from 'mitata';
import { getConnection } from './index';

export const startPrismaOrmBenches = async () => {
  const db = await getConnection();
  const count = new Array(100);

  bench('Prisma ORM Customers: getAll', async () => {
    for (const i of count) {
      await db.customer.findMany();
    }
  });
  bench('Prisma ORM Customers: getInfo', async () => {
    for (const i of count) {
      await db.customer.findUnique({
        where: {
          id: 'ALFKI',
        },
      });
    }
  });
  bench('Prisma ORM Customers: search', async () => {
    for (const i of count) {
      await db.customer.findMany({
        where: {
          companyName: {
            contains: 'ha',
          },
        },
      });
    }
  });
  bench('Prisma ORM Employees: getAll', async () => {
    for (const i of count) {
      await db.employee.findMany();
    }
  });
  bench('Prisma ORM Employees: getInfo', async () => {
    for (const i of count) {
      await db.employee.findUnique({
        where: {
          id: '1',
        },
        include: {
          recipient: true,
        },
      });
    }
  });
  bench('Prisma ORM Suppliers: getAll', async () => {
    for (const i of count) {
      await db.supplier.findMany();
    }
  });
  bench('Prisma ORM Suppliers: getInfo', async () => {
    for (const i of count) {
      await db.supplier.findUnique({
        where: {
          id: '1',
        },
      });
    }
  });
  bench('Prisma ORM Products: getAll', async () => {
    for (const i of count) {
      await db.product.findMany();
    }
  });
  bench('Prisma ORM Products: getInfo', async () => {
    for (const i of count) {
      await db.product.findUnique({
        where: {
          id: '1',
        },
        include: {
          supplier: true,
        },
      });
    }
  });
  bench('Prisma ORM Products: search', async () => {
    for (const i of count) {
      await db.product.findMany({
        where: {
          name: {
            contains: 'cha',
          },
        },
      });
    }
  });
  bench('Prisma ORM Orders: getAll', async () => {
    for (const i of count) {
      await db.order.findMany({
        include: {
          details: true,
        },
      });
    }
  });
  bench('Prisma ORM Orders: getInfo', async () => {
    for (const i of count) {
      await db.detail.findMany({
        where: {
          orderId: '10248',
        },
        include: {
          order: true,
          product: true,
        },
      });
    }
  });

  await run({});
};

startPrismaOrmBenches();
