SHOW DATABASES;
use mysecondbookshop;
use myrestaurantmenu;
show tables;
describe dishes;
select * from dishes;
select COUNT(id) from dishes where is_vegetarian=true;
SELECT SUM(price) FROM Book;
-- Min and Max
use mysecondbookshop;
describe book;
select * from book;
SELECT MIN(price) FROM Book;
SELECT * FROM Book;
SELECT MAX(price), name FROM Book;

-- Left and right join in sql
CREATE DATABASE myfirstArt;
SHOW DATABASES;
use myfirstArt;
CREATE TABLE Museum (id INT AUTO_INCREMENT, name VARCHAR(50), address 
VARCHAR(100) , website VARCHAR(100), PRIMARY KEY(id));
CREATE TABLE Artwork ( id INT AUTO_INCREMENT, museum_id INT, name VARCHAR(50), 
artist VARCHAR(50), PRIMARY KEY (id), FOREIGN KEY(museum_id) REFERENCES 
Museum(id) ); 
SHOW TABLES;
drop table museum;
describe museum;
INSERT INTO Museum(name, address, website) values ('National museum','Somewhere1','Some 
www1'),('Art museum','Somewhere2','Some www2'),('Modern museum','Somewhere3','Some 
www3'); 
INSERT INTO Artwork (museum_id, name, artist) VALUES (NULL, 'My smile','JJ Arty'); 
INSERT INTO Artwork (museum_id, name, artist) VALUES ((SELECT id FROM Museum 
WHERE Museum.name='Art museum'), 'Colour madness','Junior Picasso'); 
INSERT INTO Artwork (museum_id, name, artist) VALUES ((SELECT id FROM Museum 
WHERE Museum.name='National museum'), 'Beautiful lake','Luke Real');
select * from artwork;
select * from museum;
SELECT Artwork.name, Artwork.artist, Museum.name FROM Artwork JOIN Museum ON 
Artwork.museum_id = Museum.id;
SELECT Artwork.name, Artwork.artist, Museum.*  FROM Artwork LEFT JOIN Museum ON 
Artwork.museum_id = Museum.id;
SELECT Artwork.name, Artwork.artist, Museum.name FROM Artwork RIGHT JOIN Museum ON 
Artwork.museum_id = Museum.id;
-- Nested select in sql
SHOW DATABASES;
USE mysecondBookshop;
select * from book;
SELECT name, price FROM Book WHERE price > (SELECT price FROM Book WHERE name = 
'Node.js Book'); 
use myRestaurantMenu;
show tables;
select * from dishes;