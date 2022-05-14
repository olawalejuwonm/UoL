use myBookShop;
select * from books;
INSERT INTO books (name, price) VALUES ("Musick's Monument", 19.5);
UPDATE books SET price=18.99 where id=2;
DELETE from books where id=123;
SELECT * FROM books WHERE id=123;  
DELETE FROM books WHERE name="Express book";


Use myRestaurantMenu;
Show tables;
select * from dishes;
UPDATE dishes SET name='cheese and bacon sandwich',price=3.50,
is_vegetarian=0,is_vegan=0 where id=3;
DELETE from dishes where id=3;