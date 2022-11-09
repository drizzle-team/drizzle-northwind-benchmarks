PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS customers (
	"id" varchar(5) PRIMARY KEY NOT NULL,
	"company_name" varchar NOT NULL,
	"contact_name" varchar NOT NULL,
	"contact_title" varchar NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"postal_code" varchar,
	"region" varchar,
	"country" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"fax" varchar
);

CREATE TABLE IF NOT EXISTS order_details (
	"unit_price" double precision NOT NULL,
	"quantity" integer NOT NULL,
	"discount" double precision NOT NULL,
	"order_id" varchar NOT NULL,
	"product_id" varchar NOT NULL,
	FOREIGN KEY(order_id) REFERENCES orders(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS employees (
	"id" varchar PRIMARY KEY NOT NULL,
	"last_name" varchar NOT NULL,
	"first_name" varchar,
	"title" varchar NOT NULL,
	"title_of_courtesy" varchar NOT NULL,
	"birth_date" date NOT NULL,
	"hire_date" date NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"postal_code" varchar NOT NULL,
	"country" varchar NOT NULL,
	"home_phone" varchar NOT NULL,
	"extension" integer NOT NULL,
	"notes" text NOT NULL,
	"recipient_id" varchar,
	FOREIGN KEY(recipient_id) REFERENCES employees(id)
	
);

CREATE TABLE IF NOT EXISTS orders (
	"id" varchar PRIMARY KEY NOT NULL,
	"order_date" date NOT NULL,
	"required_date" date NOT NULL,
	"shipped_date" date,
	"ship_via" integer NOT NULL,
	"freight" double precision NOT NULL,
	"ship_name" varchar NOT NULL,
	"ship_city" varchar NOT NULL,
	"ship_region" varchar,
	"ship_postal_code" varchar,
	"ship_country" varchar NOT NULL,
	"customer_id" varchar NOT NULL,
	"employee_id" varchar NOT NULL,
	FOREIGN KEY(customer_id) REFERENCES customers(id),
	FOREIGN KEY(employee_id) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS products (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"qt_per_unit" varchar NOT NULL,
	"unit_price" double precision NOT NULL,
	"units_in_stock" integer NOT NULL,
	"units_on_order" integer NOT NULL,
	"reorder_level" integer NOT NULL,
	"discontinued" integer NOT NULL,
	"supplier_id" varchar NOT NULL,
	FOREIGN KEY(supplier_id) REFERENCES suppliers(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
	"id" varchar PRIMARY KEY NOT NULL,
	"company_name" varchar NOT NULL,
	"contact_name" varchar NOT NULL,
	"contact_title" varchar NOT NULL,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"region" varchar,
	"postal_code" varchar NOT NULL,
	"country" varchar NOT NULL,
	"phone" varchar NOT NULL
);