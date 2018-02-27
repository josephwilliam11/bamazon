CREATE DATABASE IF NOT EXISTS  bamazon_DB;

USE bamazon_DB;

CREATE TABLE IF NOT EXISTS  products (
	item_id INT(20) NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30),
    price DECIMAL (10,2),
    stock_quantity INT (100),
    product_sales DECIMAL (10,2),
    PRIMARY KEY (item_id)
);

CREATE TABLE IF NOT EXISTS departments (
	department_id INT (20) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    over_head_costs DECIMAL (10,2) NOT NULL,
    PRIMARY KEY (department_id)
    );

SELECT * FROM products;
    

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1234, "jordan 3s", "shoes", 200.00, 20)

,(1235, "Ultraboost", "shoes", 180.00, 10)

, (1236, "NMD", "shoes", 130.00, 30)

, (1237, "Yeezy 350", "shoes", 700.00, 20)

, (1238, "Yeezy 750", "shoes", 800.00, 50)

, (1239, "Air Max", "shoes", 210.00, 15)

, (2234, "Timberlands", "shoes", 150.00, 25)

, (2235, "Vans", "shoes", 60.00, 40)

, (2236, "Lebrons", "shoes", 140.00, 20)

, (2237, "KDs", "shoes", 130.00, 22);
