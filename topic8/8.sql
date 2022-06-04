SHOW databases;
CREATE DATABASE mysecondBookshop;
use mysecondBookshop;
CREATE TABLE Publisher (id INT AUTO_INCREMENT, name VARCHAR(50), address 
VARCHAR(100) , PRIMARY KEY(id));
CREATE TABLE Book ( id INT AUTO_INCREMENT, publisher_id INT, name VARCHAR(50), 
price DECIMAL(5, 2) unsigned, PRIMARY KEY (id), FOREIGN KEY(publisher_id) 
REFERENCES Publisher(id) ); 
SHOW TABLES;
describe book;
INSERT INTO Publisher (name, address) VALUES ('McGrawHill', 'Somewhere1'); 
INSERT INTO Book (publisher_id, name, price) VALUES ((SELECT id FROM Publisher WHERE 
Publisher.name = 'McGrawHill'), 'Database Book', 40.25); 
SELECT * FROM book;
SELECT * FROM publisher;
INSERT INTO Publisher (name, address) VALUES ('Cambridge press',
'somewhere3');
INSERT INTO book (publisher_id, name, price) VALUES ((select id from publisher 
where name='Oxford press'), 'Express book', 31.99);
UPDATE book SET publisher_id=(select id from publisher 
where name='Oxford press') where id=3;
SELECT Book.name, Book.price, Publisher.name as pubname FROM Book JOIN Publisher ON Book.publisher_id = 
Publisher.id WHERE Publisher.name = 'McGrawHill'; 