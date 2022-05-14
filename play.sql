-- CREATE database student;
-- USE student;
-- CREATE TABLE Food (id INT AUTO_INCREMENT, name VARCHAR(50), price DECIMAL(5,2) unsigned, PRIMARY KEY(id));
-- INSERT INTO Food VALUES ( 'Pizza', 6.25);
-- INSERT INTO Food VALUES(NULL, 'Pizza', 6.25),(NULL, 'Chips', 2.00);
-- INSERT INTO Food (name, price) VALUES ('Pizza', 6.25);

-- INSERT INTO Food VALUES ( 'Pizza', 6.25);

--  SHOW DATABASES;

--  CREATE DATABASE myRestaurantMenu;

USE myRestaurantMenu;
--  CREATE TABLE dishes (id INT AUTO_INCREMENT, name VARCHAR(50), price 
-- DECIMAL(5, 2) unsigned, is_vegetarian BOOLEAN, is_vegan BOOLEAN ,PRIMARY 
-- KEY(id)); 
--  SHOW TABLES; 
--  describe dishes;
-- INSERT into dishes (name, price, is_vegetarian, is_vegan)VALUES('pizza margherita', 10.99, 1, 0),
-- ('soya burger', 9.50, 1, 1);
-- select * from dishes LIMIT 1 ;
-- INSERT into dishes (name, price, is_vegetarian, is_vegan) VALUES (
-- 'cheese sandwitch', 4.99, 1, 0)

select * from dishes;
-- USE myBookShop;
-- select * from books

-- UPDATE books SET price=25.50 WHERE id=1

--  UPDATE dishes SET price = 8.90 WHERE id = 1;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;



