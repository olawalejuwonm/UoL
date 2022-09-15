-- CREATE database exam;
-- use exam;
-- CREATE TABLE shirts (StockId INT NOT NULL auto_increment primary key,
-- Style CHAR(8) NOT NULL,
-- Size ENUM ('xs', 's', 'm', 'l', 'xl'),
-- StoreLocation VARCHAR(255) default 'London',
-- Remaining INT DEFAULT 0);
-- INSERT INTO Shirts VALUES ('Hawaiian', 'xs',10);
-- select * from shirts;
-- INSERT INTO Shirts VALUES (255, 'Hawaiian', 'xs', 'Helsinki', 10);
-- -- CREATE ROW IN Shirts (255, 'Hawaiian', 'xs', 'Helsinki', 10);
-- INSERT INTO Shirts (Style, Size) VALUES ('Hawaiian', 'xs');
-- INSERT INTO Shirts (Style, Size, Created) VALUES ('Hawaiian', 'xs', 10);

create database reliable;
use reliable;
-- CREATE TABLE Customers (customer_id INT NOT NULL auto_increnent, name, address)
