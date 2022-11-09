import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

export const getConnection = async () => {
  const prisma = new PrismaClient();
  execSync('npx prisma generate --schema src/prisma/schema.prisma', { stdio: 'inherit' });
  execSync('npx prisma migrate dev --name dev  --schema src/prisma/schema.prisma', { stdio: 'inherit' });
  try {
    const customers = fs.readFileSync(path.resolve('data/customers.sql'), 'utf8');
    await prisma.$executeRawUnsafe(customers);
    const employees = fs.readFileSync(path.resolve('data/employees.sql'), 'utf8');
    await prisma.$executeRawUnsafe(employees);
    const orders = fs.readFileSync(path.resolve('data/orders.sql'), 'utf8');
    await prisma.$executeRawUnsafe(orders);
    const suppliers = fs.readFileSync(path.resolve('data/suppliers.sql'), 'utf8');
    await prisma.$executeRawUnsafe(suppliers);
    const products = fs.readFileSync(path.resolve('data/products.sql'), 'utf8');
    await prisma.$executeRawUnsafe(products);
    const orderDetails = fs.readFileSync(path.resolve('data/order_details.sql'), 'utf8');
    await prisma.$executeRawUnsafe(orderDetails);
  } catch (error) {
    return prisma;
  }
};
