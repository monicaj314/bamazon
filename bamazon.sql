-- CREATE DATABASE Bamazon; --
use Bamazon;

CREATE TABLE products (
item_id INTEGER(10) auto_increment NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Holy Water 5oz bottle", "spiritual", 10, 100),
("Wooden Stake","weapons", 15, 50),
("Silver Bullets 10ct","ammunition", 20, 75),
("Wooden Cross - cedar","spiritual", 17, 35),
("Wooden Cross - pine","spiritual", 17,40),
("Wooden Cross - cypress","spiritual", 17,5),
("Silver Cross","spiritual", 25, 20),
("Gold Cross","spiritual", 150, 45),
("Garlic Spray","weapons", 5,60),
("Voodoo Doll","spiritual", 8, 1);

SELECT * from products;