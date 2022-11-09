import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema
    .createTable('customers', (table) => {
      table.string('id').primary();
      table.string('company_name').notNullable();
      table.string('contact_name').notNullable();
      table.string('contact_title').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('postal_code').nullable();
      table.string('region').nullable();
      table.string('country').notNullable();
      table.string('phone').notNullable();
      table.string('fax').nullable();
    })
    .createTable('employees', (table) => {
      table.string('id').primary();
      table.string('last_name').notNullable();
      table.string('first_name').nullable();
      table.string('title').notNullable();
      table.string('title_of_courtesy').notNullable();
      table.dateTime('birth_date').notNullable();
      table.dateTime('hire_date').nullable();
      table.string('address').nullable();
      table.string('city').notNullable();
      table.string('postal_code').notNullable();
      table.string('country').notNullable();
      table.string('home_phone').notNullable();
      table.integer('extension').notNullable();
      table.text('notes').notNullable();
      table.string('recipient_id').nullable().references('id').inTable('employees');
    })
    .createTable('orders', (table) => {
      table.string('id').primary();
      table.dateTime('order_date').notNullable();
      table.dateTime('required_date').notNullable();
      table.dateTime('shipped_date').nullable();
      table.integer('ship_via').notNullable();
      table.decimal('freight', 14, 2).notNullable();
      table.string('ship_name').notNullable();
      table.string('ship_city').notNullable();
      table.string('ship_region').nullable();
      table.string('ship_postal_code').nullable();
      table.string('ship_country').notNullable();

      table.string('customer_id').notNullable().references('id').inTable('customers')
        .onDelete('CASCADE');
      table.string('employee_id').notNullable().references('id').inTable('employees')
        .onDelete('CASCADE');
    })
    .createTable('suppliers', (table) => {
      table.string('id').primary();
      table.string('company_name').notNullable();
      table.string('contact_name').notNullable();
      table.string('contact_title').notNullable();
      table.string('address').notNullable();
      table.string('city').notNullable();
      table.string('region').nullable();
      table.string('postal_code').nullable();
      table.string('country').notNullable();
      table.string('phone').notNullable();
    })
    .createTable('products', (table) => {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('qt_per_unit').notNullable();
      table.decimal('unit_price', 10, 2).notNullable();
      table.integer('units_in_stock').notNullable();
      table.integer('units_on_order').notNullable();
      table.integer('reorder_level').notNullable();
      table.integer('discontinued').notNullable();

      table.string('supplier_id').notNullable().references('id').inTable('suppliers')
        .onDelete('CASCADE');
    })
    .createTable('order_details', (table) => {
      table.string('id').primary();
      table.decimal('unit_price', 10, 2).notNullable();
      table.integer('quantity').notNullable();
      table.decimal('discount', 10, 2).notNullable();

      table.string('order_id').primary().references('id').inTable('orders')
        .onDelete('CASCADE');
      table.string('product_id').primary().references('id').inTable('products')
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema
    .dropTableIfExists('order_details')
    .dropTableIfExists('orders')
    .dropTableIfExists('customers')
    .dropTableIfExists('employees')
    .dropTableIfExists('products')
    .dropTableIfExists('suppliers');
}
