use myBookShop;
select * from books;
UPDATE books SET price=18.99 where id=2;
DELETE from books where id=2;


Use myRestaurantMenu;
Show tables;
select * from dishes;
UPDATE dishes SET name='cheese and bacon sandwich',price=3.50,
is_vegetarian=0,is_vegan=0 where id=3;
DELETE from dishes where id=1;