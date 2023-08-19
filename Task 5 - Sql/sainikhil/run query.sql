-- details of all the sellers who are selling home and decor products.

SELECT
    seller_name,
    category_name
FROM sellers
    LEFT JOIN products ON sellers.seller_id = products.seller_id
    LEFT JOIN categories ON products.category_id = categories.category_id
WHERE
    categories.category_name = 'Home Decor';

    

-- details of users who have address in hyderabad.

SELECT * FROM customer_address WHERE city = 'Hyderabad';



-- all the products list which have more then 100 items in inventory

SELECT * FROM products WHERE inventory >100;



-- all the users list who have orders greater than 10 with in one week

SELECT
    c.first_name || '' || c.last_name AS customer_name
FROM customers c
    INNER JOIN orders o ON c.customer_id = o.customer_id
WHERE
    CURRENT_DATE - o.order_date <= 7
GROUP BY c.customer_id
HAVING COUNT(o.order_id) > 10;



-- all the orders which have delivery time more than 5 days

SELECT * FROM orders WHERE promised_delivery_date - order_date > 5;



-- all the details of users who have purchased products using same credit card more than 5 times.

SELECT ca.card_id, c.first_name || '' || c.last_name as customer_name FROM cards ca
LEFT JOIN customers c ON ca.customer_id = c.customer_id
LEFT JOIN orders o ON ca.card_id = o.card_id
WHERE ca.card_type = 'Credit'
GROUP BY ca.card_id,c.customer_id HAVING
count(ca.card_id) >5;