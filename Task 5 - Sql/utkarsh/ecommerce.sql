-- create a database for ecommerce

CREATE DATABASE Ecommerce;

CREATE TABLE Customers (
    customerid SERIAL PRIMARY KEY,
    customername VARCHAR (50),
    customercontact BIGINT,
    customeremail VARCHAR (100),
    customeraddress VARCHAR (200)  
);

CREATE TABLE Products (
    productid SERIAL PRIMARY KEY,
    productname VARCHAR (100),
    categoryid INT,
    quantity VARCHAR (200),
    price FLOAT,
    FOREIGN KEY (categoryid) REFERENCES Categories(categoryid)

);

CREATE TABLE Categories (
categoryid SERIAL PRIMARY KEY,
categoryname VARCHAR (100)
);

CREATE TABLE Orders (
    orderid SERIAL PRIMARY KEY,
    customerid INT,
    orderdate DATE,
    totalamount FLOAT,
    FOREIGN KEY (customerid) REFERENCES Customers(customerid)
);

CREATE TABLE Orderdetails (
    orderdetailsid SERIAL PRIMARY KEY,
    orderid INT,
    productid INT,
    quantity INT,
    total FLOAT,
    FOREIGN KEY (orderid) REFERENCES Orders(orderid),
    FOREIGN KEY (productid) REFERENCES Products(productid)
);

INSERT INTO Customers (customerid, customername, customercontact, customeremail, customeraddress)
values
('1', 'jack', '7363736373', 'jack16@gmail.com', 'germany'),
('2', 'john', '8252724724', 'john122@gmail.com', 'italy'),
('3', 'mark', '7233534229', 'mark54@gmail.com', 'italy'),
('4', 'heath', '8262526252', 'heath73@gmail.com', 'london'),
('5', 'mary', '32625366426', 'mary99@gmail.com', 'canada'),
('6', 'maya', '32253366426', 'maya428@gmail.com', 'germany'),
('7', 'harnold', '36343656851', 'harnold69@gmail.com', 'dubai'),
('8', 'ram', '735373533725', 'ram96@gmail.com', 'india'),
('9', 'shyam', '9953735376', 'shyam743@gmail.com', 'india'),
('10', 'sheela', '36343656851', 'sheela16@gmail.com', 'america');

INSERT INTO categories (categoryid, categoryname)
VALUES
('1', 'electronics'),
('2', 'clothing'),
('3', 'beverages'),
('4', 'toys'),
('5', 'food');

INSERT INTO Products (productid, productname, categoryid, price)
VALUES
('1', 'iphone 12pro', '1', '150000'),
('2', 'refrigirator', '1', '50999'),
('3', 'tshirt', '2', '1200'),
('4', 'dog plush', '4', '700'),
('5', 'kitkat', '5', '10'),
('6', 'shampagne', '3', '1500'),
('7', 'coke zero', '3', '45'),
('8', 'demin distressed jeans', '2', '1599'),
('9', 'microwave', '1', '11000'),
('10', 'hotwheels cars', '4', '1350');

ALTER Table products
DROP COLUMN quantity;

INSERT INTO Orders (orderid, customerid, orderdate, totalamount)
VALUES
('1','1','2000-12-12','300000'),
('2','4','2022-04-12','15000'),
('3','6','2019-04-01','86458'),
('4','7','1976-08-04','15389'),
('5','9','1976-08-04','2362'),
('6','5','2020-12-23','53438'),
('7','3','2015-09-05','885343'),
('8','7','2000-09-13','22000'),
('9','3','2012-01-09','69999'),
('10','8','1999-06-12','347');

INSERT INTO orderdetails (orderdetailsid, orderid, productid, quantity, total)
VALUES
('1', '3', '4', '5', '36999'),
('2', '2', '5', '2', '98911'),
('3', '1', '1', '4', '11020'),
('4', '5', '9', '1', '76767'),
('5', '6', '10', '7', '87753'),
('6', '9', '4', '6', '140000'),
('7', '3', '8', '9', '8788'),
('8', '3', '2', '8', '54871'),
('9', '8', '9', '3', '13500'),
('10', '10', '3', '10', '19999');

-- 1. what is the total revenue for each category?
SELECT c.categoryname, SUM(od.total)
FROM categories c
LEFT JOIN Products p ON c.categoryid = p.categoryid
LEFT JOIN orderdetails od ON p.productid = od.productid
GROUP BY c.categoryname;

-- 2. Which customer has the most orders?
SELECT c.customername, COUNT(o.orderid) FROM Customers c
LEFT JOIN Orders o ON o.customerid = c.customerid
GROUP BY c.customername;

-- 3. What is the average order value for each customer?
SELECT c.customername, AVG(o.totalamount) FROM Customers c
LEFT JOIN Orders o ON o.customerid = c.customerid
GROUP BY c.customername;

-- 4. What is the total revenue for each month?
SELECT EXTRACT(MONTH FROM o.orderdate), SUM(od.total) FROM Orders o
LEFT JOIN Orderdetails od ON od.orderid = o.orderid
GROUP BY EXTRACT(MONTH FROM o.orderdate);

-- 5. Which products have been ordered the most and how many times?
SELECT p.productname, COUNT(od.quantity) FROM Products p
LEFT JOIN orderdetails od ON od.productid = p.productid
GROUP BY p.productname;

-- 6. Which customers have ordered a particular product and how many times?
SELECT c.customername, p.productname, COUNT(*)  FROM Customers c
JOIN Orders o ON o.customerid = c.customerid
JOIN Orderdetails od ON od.orderid = o.orderid
JOIN products p ON p.productid = od.productid
GROUP BY c.customername, p.productname;

-- 7. What is the average order value for each month?
SELECT EXTRACT(MONTH FROM o.orderdate), AVG(o.totalamount) FROM Orders o
GROUP BY EXTRACT(MONTH FROM o.orderdate); 

-- 8. What is the average quantity ordered for each product?
SELECT p.productname, AVG(od.quantity) FROM Products p
LEFT JOIN Orderdetails od ON od.productid = p.productid
GROUP BY p.productname;

-- 9. Which category has the highest revenue per customer on average?
SELECT c.categoryname, cn.customername, AVG(od.total) FROM categories c 
LEFT JOIN Products p ON  p.categoryid = c.categoryid
LEFT JOIN Orderdetails od ON od.productid = p.productid
LEFT JOIN Orders o ON o.orderid = od.orderid
LEFT JOIN Customers cn ON cn.customerid = o.customerid
GROUP BY c.categoryname, cn.customername;

