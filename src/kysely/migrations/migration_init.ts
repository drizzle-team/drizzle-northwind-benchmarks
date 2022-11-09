import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('customers')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('company_name', 'varchar', (col) => col.notNull())
    .addColumn('contact_name', 'varchar', (col) => col.notNull())
    .addColumn('contact_title', 'varchar', (col) => col.notNull())
    .addColumn('address', 'varchar', (col) => col.notNull())
    .addColumn('city', 'varchar', (col) => col.notNull())
    .addColumn('postal_code', 'varchar')
    .addColumn('region', 'varchar')
    .addColumn('country', 'varchar', (col) => col.notNull())
    .addColumn('phone', 'varchar', (col) => col.notNull())
    .addColumn('fax', 'varchar')
    .execute();

  await db.schema
    .createTable('employees')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('last_name', 'varchar', (col) => col.notNull())
    .addColumn('first_name', 'varchar')
    .addColumn('title', 'varchar', (col) => col.notNull())
    .addColumn('title_of_courtesy', 'varchar', (col) => col.notNull())
    .addColumn('birth_date', 'date', (col) => col.notNull())
    .addColumn('hire_date', 'date', (col) => col.notNull())
    .addColumn('address', 'varchar')
    .addColumn('city', 'varchar', (col) => col.notNull())
    .addColumn('postal_code', 'varchar', (col) => col.notNull())
    .addColumn('country', 'varchar', (col) => col.notNull())
    .addColumn('home_phone', 'varchar', (col) => col.notNull())
    .addColumn('extension', 'integer', (col) => col.notNull())
    .addColumn('notes', 'text', (col) => col.notNull())
    .addColumn('recipient_id', 'text')
    .addForeignKeyConstraint(
      'recipient_id_fk',
      ['recipient_id'],
      'employees',
      ['id'],
    )
    .execute();

  await db.schema
    .createIndex('employee_recipient_id_index')
    .on('employees')
    .column('recipient_id')
    .execute();

  await db.schema
    .createTable('orders')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('order_date', 'date', (col) => col.notNull())
    .addColumn('required_date', 'date', (col) => col.notNull())
    .addColumn('shipped_date', 'date')
    .addColumn('ship_via', 'integer', (col) => col.notNull())
    .addColumn('freight', 'decimal', (col) => col.notNull())
    .addColumn('ship_name', 'varchar', (col) => col.notNull())
    .addColumn('ship_city', 'varchar', (col) => col.notNull())
    .addColumn('ship_region', 'varchar')
    .addColumn('ship_postal_code', 'varchar')
    .addColumn('ship_country', 'varchar', (col) => col.notNull())
    .addColumn('customer_id', 'varchar', (col) => col.notNull())
    .addForeignKeyConstraint(
      'customer_id_fk',
      ['customer_id'],
      'customers',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addColumn('employee_id', 'varchar', (col) => col.notNull())
    .addForeignKeyConstraint(
      'employee_id_fk',
      ['employee_id'],
      'employees',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('order_employee_id_index')
    .on('orders')
    .column('employee_id')
    .execute();

  await db.schema
    .createIndex('order_customer_id_index')
    .on('orders')
    .column('customer_id')
    .execute();

  await db.schema
    .createTable('suppliers')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('company_name', 'varchar', (col) => col.notNull())
    .addColumn('contact_name', 'varchar', (col) => col.notNull())
    .addColumn('contact_title', 'varchar', (col) => col.notNull())
    .addColumn('address', 'varchar', (col) => col.notNull())
    .addColumn('city', 'varchar', (col) => col.notNull())
    .addColumn('postal_code', 'varchar')
    .addColumn('region', 'varchar')
    .addColumn('country', 'varchar', (col) => col.notNull())
    .addColumn('phone', 'varchar', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('products')
    .addColumn('id', 'varchar', (col) => col.primaryKey())
    .addColumn('name', 'varchar', (col) => col.notNull())
    .addColumn('qt_per_unit', 'varchar', (col) => col.notNull())
    .addColumn('unit_price', 'decimal', (col) => col.notNull())
    .addColumn('units_in_stock', 'integer', (col) => col.notNull())
    .addColumn('units_on_order', 'integer', (col) => col.notNull())
    .addColumn('reorder_level', 'integer', (col) => col.notNull())
    .addColumn('discontinued', 'integer', (col) => col.notNull())
    .addColumn('supplier_id', 'varchar', (col) => col.notNull())
    .addForeignKeyConstraint(
      'supplier_id_fk',
      ['supplier_id'],
      'suppliers',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('product_supplier_id_index')
    .on('products')
    .column('supplier_id')
    .execute();

  await db.schema
    .createTable('order_details')
    .addColumn('unit_price', 'decimal', (col) => col.notNull())
    .addColumn('quantity', 'integer', (col) => col.notNull())
    .addColumn('discount', 'decimal', (col) => col.notNull())
    .addColumn('order_id', 'varchar', (col) => col.notNull())
    .addForeignKeyConstraint(
      'order_id_fk',
      ['order_id'],
      'orders',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .addColumn('product_id', 'varchar', (col) => col.notNull())
    .addForeignKeyConstraint(
      'product_id_fk',
      ['product_id'],
      'products',
      ['id'],
      (cb) => cb.onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('detail_order_id_index')
    .on('order_details')
    .column('order_id')
    .execute();

  await db.schema
    .createIndex('detial_product_id_index')
    .on('order_details')
    .column('product_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('order_details').execute();
  await db.schema.dropTable('products').execute();
  await db.schema.dropTable('suppliers').execute();
  await db.schema.dropTable('orders').execute();
  await db.schema.dropTable('employees').execute();
  await db.schema.dropTable('customers').execute();
}
