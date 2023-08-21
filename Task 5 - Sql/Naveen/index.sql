-- Active: 1692097717903@@127.0.0.1@5432@shoppingcartdb@public


--- DATABASE CREATION
CREATE DATABASE Shoppingcartdb;

---- TABLES CREATION ----------------------------------

-- Insert data into Sellers table 
INSERT INTO Sellers (seller_name, seller_contact_info)
VALUES
    ('Hyderabad Traders', 'hydtraders@example.com'),
    ('Spice Bazaar Enterprises', 'spicebazaar@example.com'),
    ('Deccan Handicrafts', 'deccanhandicrafts@example.com'),
    ('Nizam Sweets and Snacks', 'nizamsweets@example.com'),
    ('Charminar Exports', 'charminarexports@example.com'),
    ('Hyderabadi Silks', 'hyderabadi_silks@example.com'),
    ('Pearls Paradise Jewelry', 'pearlsparadise@example.com'),
    ('Biryani Delights', 'biryanielight@example.com'),
    ('Chaiwala Teas', 'chaiwala@example.com'),
    ('Meena Bazaar Fashions', 'meenabazaar@example.com'),
    ('Osmania Arts and Crafts', 'osmaniaarts@example.com'),
    ('Hyderabad Spices Hub', 'hydspiceshub@example.com'),
    ('Royal Nizam Carpets', 'royalnizamcarpets@example.com'),
    ('Haleem House', 'haleemhouse@example.com'),
    ('Bangle Emporium', 'bangleemporium@example.com');


-- Insert data into Products table 
INSERT INTO Products (seller_id, product_name, product_price)
VALUES
    (1, 'Spices Combo Pack', 49.99),
    (3, 'Handwoven Silk Saree', 299.99),
    (2, 'Hyderabadi Biryani Mix', 9.99),
    (4, 'Silver Filigree Earrings', 79.99),
    (5, 'Charminar Embroidered Pillow', 29.99),
    (1, 'Traditional Hyderabadi Pickles', 12.99),
    (6, 'Haleem Mix', 7.99),
    (2, 'Pearl Necklace Set', 149.99),
    (3, 'Meenakari Pottery Set', 69.99),
    (5, 'Hyderabadi Spices Collection', 19.99),
    (4, 'Nawabi Perfume', 89.99),
    (7, 'Hyderabadi Dum Biryani', 14.99),
    (6, 'Handcrafted Nizami Carpet', 399.99),
    (8, 'Mithai Assortment', 24.99),
    (7, 'Charminar Wall Art', 39.99);


-- Insert data into Customers table 
INSERT INTO Customers (customer_name, customer_contact_info)
VALUES
    ('Rajesh Kumar', 'rajesh@example.com'),
    ('Deepika Verma', 'deepika@example.com'),
    ('Amit Patel', 'amit@example.com'),
    ('Priya Gupta', 'priya@example.com'),
    ('Rahul Sharma', 'rahul@example.com'),
    ('Neha Singh', 'neha@example.com'),
    ('Vikram Choudhury', 'vikram@example.com'),
    ('Anjali Reddy', 'anjali@example.com'),
    ('Arjun Mehta', 'arjun@example.com'),
    ('Nisha Khan', 'nisha@example.com'),
    ('Sanjay Mishra', 'sanjay@example.com'),
    ('Sneha Desai', 'sneha@example.com'),
    ('Alok Verma', 'alok@example.com'),
    ('Kavita Joshi', 'kavita@example.com'),
    ('Aditya Rao', 'aditya@example.com');


-- Insert data into Addresses table 
INSERT INTO Addresses (customer_id, locality, city, state, postal_code)
VALUES
    (1, 'Gachibowli', 'Hyderabad', 'Telangana', '500032'),
    (2, 'Koramangala', 'Bangalore', 'Karnataka', '560034'),
    (3, 'Malad West', 'Mumbai', 'Maharashtra', '400064'),
    (4, 'Sector 29', 'Noida', 'Uttar Pradesh', '201301'),
    (5, 'Paldi', 'Ahmedabad', 'Gujarat', '380007'),
    (6, 'Hinjewadi', 'Pune', 'Maharashtra', '411057'),
    (7, 'Salt Lake City', 'Kolkata', 'West Bengal', '700091'),
    (8, 'Kotturpuram', 'Chennai', 'Tamil Nadu', '600085'),
    (9, 'Vijayanagar', 'Bangalore', 'Karnataka', '560040'),
    (10, 'Vaishali Nagar', 'Jaipur', 'Rajasthan', '302021'),
    (11, 'Indiranagar', 'Bangalore', 'Karnataka', '560038'),
    (12, 'Saket', 'New Delhi', 'Delhi', '110017'),
    (13, 'Jayanagar', 'Bangalore', 'Karnataka', '560041'),
    (14, 'Karol Bagh', 'New Delhi', 'Delhi', '110005'),
    (15, 'Gomti Nagar', 'Lucknow', 'Uttar Pradesh', '226010');



-- Insert data into Orders table 
INSERT INTO Orders (customer_id, order_date)
VALUES
    (3, '2023-08-01'),
    (7, '2023-08-02'),
    (5, '2023-08-03'),
    (12, '2023-08-04'),
    (10, '2023-08-05'),
    (2, '2023-08-06'),
    (8, '2023-08-07'),
    (11, '2023-08-08'),
    (1, '2023-08-09'),
    (9, '2023-08-10'),
    (15, '2023-08-11'),
    (4, '2023-08-12'),
    (6, '2023-08-13'),
    (14, '2023-08-14'),
    (13, '2023-08-15');


-- Insert data into Order_Items table 
INSERT INTO Order_Items (order_id, product_id, quantity, total_price)
VALUES
    (1, 3, 2, 99.98),
    (2, 5, 1, 29.99),
    (3, 8, 3, 449.97),
    (4, 2, 1, 299.99),
    (5, 10, 2, 39.98),
    (6, 12, 1, 89.99),
    (7, 15, 5, 124.95),
    (8, 1, 1, 12.99),
    (9, 7, 3, 44.97),
    (10, 6, 1, 399.99),
    (11, 4, 2, 159.98),
    (12, 9, 2, 139.98),
    (13, 11, 1, 89.99),
    (14, 14, 4, 99.96),
    (15, 13, 3, 164.97);


-- Insert 15 values into the Payments table
INSERT INTO Payments (order_id, payment_date, amount)
VALUES
    (1, '2023-08-01', 100.00),
    (2, '2023-08-02', 150.50),
    (3, '2023-08-03', 200.25),
    (4, '2023-08-04', 75.20),
    (5, '2023-08-05', 300.00),
    (6, '2023-08-06', 50.75),
    (7, '2023-08-07', 120.90),
    (8, '2023-08-08', 80.00),
    (9, '2023-08-09', 250.60),
    (10, '2023-08-10', 180.30),
    (11, '2023-08-11', 90.25),
    (12, '2023-08-12', 160.50),
    (13, '2023-08-13', 40.00),
    (14, '2023-08-14', 220.75),
    (15, '2023-08-15', 75.80);


-- ANSWER 1
SELECT
    c.customer_id,
    c.customer_name,
    c.customer_contact_info
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY c.customer_id, c.customer_name, c.customer_contact_info
ORDER BY COUNT(o.order_id) DESC
LIMIT 1;

-- ANSWER 2
SELECT
    c.customer_id,
    c.customer_name,
    c.customer_contact_info
FROM Customers c
JOIN Orders o ON c.customer_id = o.customer_id
WHERE TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY c.customer_id, c.customer_name, c.customer_contact_info
ORDER BY COUNT(o.order_id) asc
LIMIT 1;

--  ANSWER 3
SELECT
    s.seller_name,
    s.seller_contact_info AS mobile,
    COUNT(DISTINCT o.order_id) AS order_count
FROM Sellers s
JOIN Products p ON s.seller_id = p.seller_id
JOIN Order_Items oi ON p.product_id = oi.product_id
JOIN Orders o ON oi.order_id = o.order_id
WHERE TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY s.seller_name, s.seller_contact_info
ORDER BY order_count ASC
LIMIT 1


--ANSWER 4 (A)

SELECT
    s.seller_name,
    s.seller_contact_info AS mobile,
    COUNT(DISTINCT o.order_id) AS order_count
FROM Sellers s
JOIN Products p ON s.seller_id = p.seller_id
JOIN Order_Items oi ON p.product_id = oi.product_id
JOIN Orders o ON oi.order_id = o.order_id
WHERE TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY s.seller_name, s.seller_contact_info
ORDER BY order_count DESC
LIMIT 1;

--ANSWER 4 (B)

SELECT
    o.order_id,
    o.order_date,
    c.customer_id,
    c.customer_name,
    c.customer_contact_info AS customer_mobile,
    s.seller_id,
    s.seller_name,
    s.seller_contact_info AS seller_mobile,
    p.product_id,
    p.product_name,
    p.product_price,
    oi.quantity,
    oi.total_price AS item_total_price,
    pm.payment_id,
    pm.payment_date,
    pm.amount AS payment_amount
FROM
    Orders o
JOIN
    Customers c ON o.customer_id = c.customer_id
JOIN
    Order_Items oi ON o.order_id = oi.order_id
JOIN
    Products p ON oi.product_id = p.product_id
JOIN
    Sellers s ON p.seller_id = s.seller_id
JOIN
    Payments pm ON o.order_id = pm.order_id;




-- ANSWER 5
SELECT
    p.product_name,
    p.product_id AS sku,
    p.product_price AS price
FROM
    Products p
JOIN
    Order_Items oi ON p.product_id = oi.product_id
JOIN
    Orders o ON oi.order_id = o.order_id
WHERE
    TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY
    p.product_name, p.product_id, p.product_price
ORDER BY
    COUNT(oi.order_item_id) DESC;



--- ANSWER 6  
SELECT
    p.product_name,
    p.product_id AS sku,
    p.product_price AS price
FROM
    Products p
JOIN
    Order_Items oi ON p.product_id = oi.product_id
JOIN
    Orders o ON oi.order_id = o.order_id
WHERE
    TO_CHAR(o.order_date, 'YYYY-MM') = '2023-08'
GROUP BY
    p.product_name, p.product_id, p.product_price
ORDER BY
    COUNT(oi.order_item_id);
