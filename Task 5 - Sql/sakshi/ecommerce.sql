CREATE DATABASE Ecommerce;

create TABLE categories(
    categoryID SERIAL PRIMARY KEY,
    categoryName VARCHAR(50) 
);
 
create TABLE products(
    productID SERIAL PRIMARY KEY,
    productName VARCHAR(50),
    categoryID INT,
    price FLOAT,
    FOREIGN KEY(categoryID) REFERENCES categories(categoryID)
);
create TABLE customers (
    customerID INT PRIMARY KEY,
    customerName VARCHAR(50),
    customerEmail VARCHAR(100) UNIQUE,
    customerContact VARCHAR(10),
    customerAddress VARCHAR(100)
);
create TABLE orders (
    orderID INT PRIMARY KEY,
    customerID INT,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (customerID) REFERENCES customers(customerID)
);
create TABLE Orderitems(
    orderitemID INT PRIMARY KEY,
    orderID INT,
    productID INT,
    quantity INT,
    Total FLOAT,
    FOREIGN KEY (orderID) REFERENCES orders(orderID),
    FOREIGN KEY (productID) REFERENCES products(productID)
);

INSERT INTO categories (categoryName)
VALUES
    ('Mobiles'),
    ('Apparel'),
    ('Groceries'),
    ('Furniture');
SELECT * FROM categories;

INSERT INTO customers (customerID, customerName, customerEmail, customerContact, customerAddress)
VALUES
    (1, 'Maria Anders', 'maria@example.com', '1234567890', '123 Main St'),
    (2, 'Ana Trujillo', 'ana@example.com', '9876543210', '456 Elm St'),
    (3, 'Antonio Moreno', 'antonio@example.com', '4566783210', '2312 Mataderos'),
    (4, 'Hanna Moos', 'hanna@example.com', '1234567890', '57 Forsterstr'),
    (5, 'Martín Sommer', 'mart@example.com', '9876543210', '68 Araquil'),
    (6, 'Elizabeth Lincoln', 'liz@example.com', '9986543210', '23 Tsawassen Blvd.'),
    (7, 'Victoria Ashworth', 'vicky@example.com', '9873693210', 'Fauntleroy Circus'),
    (8, 'Francisco Chang', 'chang@example.com', '9636547410', '9993 Sierras de Granada'),
    (9, 'Diego Roel', 'diego@example.com', '9878523210', '86 Moralzarzal'),
    (10,'Peter Franken', 'peter@example.com', '1472583690', '43 Berliner Platz');

    INSERT INTO products (productID, productName, categoryID, price)
VALUES
    (1, 'OnePlus Nord 3 5G', 1, 39999.00),
    (2, 'Samsung Galaxy Z Flip5 5G', 1, 99999.00),
    (3, 'Denim Jacket', 2, 1500.99),
    (4, 'Nescafe Gold Instant Coffee', 3, 717.00),
    (5, 'Quaker Oats', 3, 336.00),
    (6, 'Kapiva Amla Juice', 3, 269.00),
    (7, 'Wakefit Study Table', 4, 3512.99),
    (8, 'Couch Cell Recliner', 4, 16000.00);

    INSERT INTO orders (orderID, customerID, OrderDate, TotalAmount)
VALUES
    (1, 1, '2023-08-14', 39999.00),
    (2, 2, '2023-08-15', 4565.00),
    (3, 3, '2023-08-16', 16269.00),
    (4, 4, '2023-08-17', 3001.98),
    (5, 5, '2023-08-18', 3512.99);

    INSERT INTO OrderItems (orderitemID, orderID, productID, Quantity, Total)
VALUES
    (1, 1, 1, 1, 39999.00),
    (2, 2, 3, 3, 4500.00),
    (3, 3, 8, 1, 16000.00),
    (4, 4, 3, 2, 3001.98),
    (5, 5, 7, 1, 3512.99);

-- what is the total revenue for each category?
SELECT c.categoryName, SUM(oi.Total) AS TotalRevenue
FROM categories c
JOIN products p ON c.categoryID = p.categoryID
JOIN orderitems oi ON p.productID = oi.productID
GROUP BY c.categoryName;


-- Which customer has the most orders?
SELECT c.customerName, COUNT(o.orderID) AS OrderCount
FROM customers c
JOIN orders o ON c.customerID = o.customerID
GROUP BY c.customerName
ORDER BY OrderCount DESC
LIMIT 1;


-- What is the average order value for each customer?
SELECT c.customerName, AVG(o.TotalAmount) AS AvgOrderValue
FROM customers c
JOIN orders o ON c.customerID = o.customerID
GROUP BY c.customerName;


-- What is the total revenue for each month?
SELECT EXTRACT(MONTH FROM OrderDate) AS Month, SUM(TotalAmount) AS TotalRevenue
FROM orders
GROUP BY Month
ORDER BY Month;


-- Which products have been ordered the most and how many times?
SELECT p.productName, SUM(oi.quantity) AS TotalQuantityOrdered
FROM products p
JOIN orderitems oi ON p.productID = oi.productID
GROUP BY p.productName
ORDER BY TotalQuantityOrdered DESC;


--  Which customers have ordered a particular product and how many times?
SELECT c.customerName, oi.Quantity
FROM customers c
JOIN orders o ON c.customerID = o.customerID
JOIN orderitems oi ON o.orderID = oi.orderID
WHERE oi.productID = 3; 


-- What is the average order value for each month?
SELECT EXTRACT(MONTH FROM OrderDate) AS Month, AVG(TotalAmount) AS AvgOrderValue
FROM orders
GROUP BY Month
ORDER BY Month;


-- What is the average quantity ordered for each product?
SELECT p.productName, AVG(oi.Quantity) AS AvgQuantityOrdered
FROM products p
JOIN orderitems oi ON p.productID = oi.productID
GROUP BY p.productName;


-- Which category has the highest revenue per customer on average?
SELECT c.categoryName, AVG(o.TotalAmount) / COUNT(DISTINCT o.customerID) AS AvgRevenuePerCustomer
FROM categories c
JOIN products p ON c.categoryID = p.categoryID
JOIN orderitems oi ON p.productID = oi.productID
JOIN orders o ON oi.orderID = o.orderID
GROUP BY c.categoryName
ORDER BY AvgRevenuePerCustomer DESC
LIMIT 1;


-- What is the total revenue for each status and month combination?
-- Don't have the status column.