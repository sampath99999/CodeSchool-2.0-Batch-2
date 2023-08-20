CREATE TABLE
    Users (
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(255) NOT NULL,
        dob DATE,
        phone_no BIGINT,
        email VARCHAR(255) UNIQUE NOT NULL
    );

CREATE TABLE
    Products (
        product_id SERIAL PRIMARY KEY,
        product_name VARCHAR(20) NOT NULL,
        category_id INT REFERENCES Categories(category_id)
    );

CREATE TABLE
    Categories (
        category_id SERIAL PRIMARY KEY,
        category_name VARCHAR(100) NOT NULL
    );

CREATE TABLE
    Orders (
        order_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id),
        product_id INT REFERENCES Products(product_id),
        card_id INT REFERENCES carddetails(card_id),
        order_date DATE NOT NULL,
        delivery_time TIMESTAMP NOT NULL
    );

CREATE TABLE
    Sellers (
        seller_id SERIAL PRIMARY KEY,
        seller_name VARCHAR(30)
    );

CREATE TABLE
    SellerProductDetails (
        seller_product_id SERIAL PRIMARY KEY,
        product_id INT REFERENCES Products(product_id),
        seller_id INT REFERENCES Sellers(seller_id)
    )

CREATE TABLE
    UserAddresses (
        user_id INT REFERENCES Users(user_id),
        address VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        pincode INT NOT NULL
    );

CREATE TABLE
    CardDetails (
        card_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(user_id),
        card_no BIGINT NOT NULL,
        expiry_date DATE NOT NULL,
        card_type VARCHAR(10) NOT NULL
    );

ALTER TABLE users
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE useraddresses
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE sellers
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE
    sellerproductdetails
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE products
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE orders
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE categories
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE carddetails
ADD
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

INSERT INTO
    Users (user_name, dob, phone_no, email)
VALUES (
        'Rajesh',
        '1995-03-10',
        9876543210,
        'raj@gmail.com'
    ), (
        'Arjun',
        '2000-12-05',
        9876540123,
        'arjun@gmail.com'
    ), (
        'Sai',
        '2002-01-01',
        9876501234,
        'sai@gmail.com'
    ), (
        'Varun',
        '2000-08-20',
        9876012345,
        'varun@gmail.com'
    ), (
        'Amulya',
        '2002-02-20',
        9870123456,
        'amulya@gmail.com'
    ), (
        'Navya',
        '2002-09-13',
        9801234567,
        'navya@gmail.com'
    ), (
        'Krishna',
        '2000-05-18',
        8907654321,
        'krishna@gmail.com'
    ), (
        'Nithin',
        '2002-06-27',
        9390021789,
        'nithin@gmail.com'
    ), (
        'Vishwan',
        '2002-08-12',
        9398902176,
        'vishwan@gmail.com'
    ), (
        'Ananya',
        '1995-04-30',
        7896543210,
        'ananya@gmail.com'
    ), (
        'Mallesh',
        '2003-10-02',
        7098654321,
        'mallesh@gmail.com'
    ), (
        'Vinil',
        '2002-11-13',
        7878906541,
        'vinil@gmail.com'
    ), (
        'Kavya',
        '1998-02-28',
        7658903412,
        'kavya@gmail.com'
    );

INSERT INTO
    Categories (category_name)
VALUES ('Electronics'), ('Clothing'), ('Books'), ('Home and Decor'), ('Beauty'), ('Toys'), ('Sports'), ('Food'), ('Music'), ('Furniture');

INSERT INTO
    Products (product_name, category_id)
VALUES ('Smartphone', 1), ('Laptop', 1), ('Headphones', 1), ('Tablet', 1), ('Camera', 1), ('Jeans', 2), ('T-Shirt', 2), ('Dress', 2), ('Jacket', 2), ('Shoes', 2), ('Novel', 3), ('Textbook', 3), ('Cookbook', 3), ('Science Fiction', 3), ('Romance', 3), ('Sofa', 4), ('Coffee Table', 4), ('Lamp', 4), ('Cushion', 4), ('Rug', 4), ('Lipstick', 5), ('Foundation', 5), ('Eyeshadow', 5), ('Mascara', 5), ('Nail Polish', 5), ('Action Figure', 6), ('Puzzle', 6), ('Board Game', 6), ('Stuffed Animal', 6), ('Building Blocks', 6), ('Football', 7), ('Basketball', 7), ('Tennis Racket', 7), ('Running Shoes', 7), ('Yoga Mat', 7), ('Chocolate Bar', 8), ('Chips', 8), ('Fruit Basket', 8), ('Bottled Water', 8), ('Canned Soup', 8), ('Vinyl Record', 9), ('CD Album', 9), ('Digital Music Download', 9), ('Concert DVD', 9), ('Music Poster', 9), ('Dining Table', 10), ('Bookshelf', 10), ('Wardrobe', 10), ('Bed Frame', 10), ('Dresser', 10);

INSERT INTO
    sellers (seller_name)
VALUES ('Electronics Emporium'), ('Fashion & Beauty'), ('Your World'), ('Home & Decor Network'), ('Sportika'), ('Food Mart');

INSERT INTO
    sellerproductdetails (product_id, seller_id)
VALUES (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 2), (7, 2), (8, 2), (9, 2), (10, 2), (11, 3), (12, 3), (13, 3), (14, 3), (15, 3), (16, 4), (17, 4), (18, 4), (19, 4), (20, 4), (21, 2), (22, 2), (23, 2), (24, 2), (25, 2), (26, 5), (27, 5), (28, 5), (29, 5), (30, 5), (31, 5), (32, 5), (33, 5), (34, 5), (35, 5), (36, 6), (37, 6), (38, 6), (39, 6), (40, 6), (41, 3), (42, 3), (43, 3), (44, 3), (45, 3), (46, 4), (47, 4), (48, 4), (49, 4), (50, 4);

INSERT INTO
    Orders (
        user_id,
        product_id,
        order_date,
        delivery_time
    )
VALUES (
        1,
        1,
        '2023-08-13',
        '2023-08-14'
    ), (
        1,
        4,
        '2023-08-12',
        '2023-08-12'
    ), (
        1,
        38,
        '2023-08-14',
        '2023-08-14'
    ), (
        1,
        27,
        '2023-08-13',
        '2023-08-13'
    ), (
        1,
        7,
        '2023-08-14',
        '2023-08-20'
    ), (
        1,
        45,
        '2023-08-12',
        '2023-08-18'
    ), (
        1,
        16,
        '2023-08-14',
        '2023-08-17'
    ), (
        1,
        21,
        '2023-08-12',
        '2023-08-17'
    ), (
        1,
        1,
        '2023-08-14',
        '2023-08-16'
    ), (
        1,
        46,
        '2023-08-12',
        '2023-08-15'
    ), (
        1,
        31,
        '2023-08-12',
        '2023-08-18'
    ), (
        2,
        2,
        '2023-08-12',
        '2023-08-15'
    ), (
        2,
        4,
        '2023-08-12',
        '2023-08-16'
    ), (
        2,
        44,
        '2023-08-13',
        '2023-08-18'
    ), (
        2,
        5,
        '2023-08-13',
        '2023-08-19'
    ), (
        2,
        34,
        '2023-08-12',
        '2023-08-17'
    ), (
        2,
        26,
        '2023-08-15',
        '2023-08-21'
    ), (
        2,
        33,
        '2023-08-12',
        '2023-08-14'
    ), (
        2,
        21,
        '2023-08-17',
        '2023-08-18'
    ), (
        2,
        1,
        '2023-08-12',
        '2023-08-12'
    ), (
        2,
        4,
        '2023-08-13',
        '2023-08-13'
    ), (
        2,
        42,
        '2023-08-17',
        '2023-08-17'
    ), (
        3,
        1,
        '2023-08-12',
        '2023-08-12'
    ), (
        3,
        50,
        '2023-08-13',
        '2023-08-13'
    ), (
        4,
        7,
        '2023-08-18',
        '2023-08-23'
    ), (
        5,
        5,
        '2023-08-13',
        '2023-08-13'
    ), (
        5,
        9,
        '2023-08-15',
        '2023-08-15'
    ), (
        6,
        2,
        '2023-08-18',
        '2023-08-22'
    ), (
        6,
        3,
        '2023-08-14',
        '2023-08-14'
    ), (
        6,
        41,
        '2023-08-10',
        '2023-08-15'
    ), (
        7,
        36,
        '2023-07-14',
        '2023-07-21'
    ), (
        7,
        18,
        '2023-08-12',
        '2023-08-15'
    ), (
        8,
        11,
        '2023-08-13',
        '2023-08-16'
    ), (
        8,
        28,
        '2023-08-12',
        '2023-08-12'
    ), (
        8,
        49,
        '2023-08-15',
        '2023-08-21'
    ), (
        8,
        35,
        '2023-08-14',
        '2023-08-18'
    ), (
        8,
        39,
        '2023-08-13',
        '2023-08-14'
    ), (
        8,
        11,
        '2023-08-12',
        '2023-08-17'
    ), (
        8,
        19,
        '2023-08-14',
        '2023-08-17'
    ), (
        8,
        7,
        '2023-08-12',
        '2023-08-14'
    ), (
        8,
        27,
        '2023-08-12',
        '2023-08-18'
    ), (
        8,
        47,
        '2023-08-13',
        '2023-08-17'
    ), (
        8,
        43,
        '2023-08-14',
        '2023-08-20'
    ), (
        10,
        1,
        '2023-08-09',
        '2023-08-15'
    ), (
        10,
        44,
        '2023-08-13',
        '2023-08-18'
    ), (
        10,
        16,
        '2023-08-12',
        '2023-08-17'
    ), (
        11,
        19,
        '2023-08-14',
        '2023-08-15'
    ), (
        11,
        39,
        '2023-08-15',
        '2023-08-18'
    ), (
        12,
        1,
        '2023-08-12',
        '2023-08-18'
    ), (
        12,
        4,
        '2023-08-13',
        '2023-08-16'
    ), (
        12,
        18,
        '2023-08-14',
        '2023-08-18'
    );

INSERT INTO
    useraddresses (user_id, address, city, pincode)
VALUES (
        1,
        '123 Kadthal',
        'Hyderabad',
        509358
    ), (
        2,
        '456 Abids',
        'Hyderabad',
        500009
    ), (
        3,
        '789 Gandhi Nagar',
        'Delhi',
        509390
    ), (
        4,
        'A-2 Lala Nagar',
        'Mumbai',
        509008
    ), (
        5,
        '!4-7 Church Street',
        'Delhi',
        509308
    ), (
        6,
        '109 Baba Chowk',
        'Hyderabad',
        509098
    ), (
        7,
        '90-A/2 Ambedkar Street',
        'Banglore',
        598358
    ), (
        8,
        '18/A/8 Modi Colony',
        'Vizag',
        509268
    ), (
        9,
        '524 Station Rd',
        'Chennai',
        500928
    ), (
        10,
        '12/A Kailaspuri',
        'Banglore',
        504098
    ), (
        11,
        '190 Ramnagar',
        'Mumbai',
        564508
    ), (
        12,
        '232 DownHills',
        'Delhi',
        598058
    ), (
        13,
        '895 JubleeHills',
        'Hyderabad',
        520008
    );

INSERT INTO
    carddetails (
        user_id,
        card_no,
        expiry_date,
        card_type
    )
VALUES (
        1,
        1234567898765432,
        '2023-01-31',
        'Debit'
    ), (
        2,
        9876543219876543,
        '2023-05-31',
        'Debit'
    ), (
        3,
        1928374651928376,
        '2023-04-30',
        'Credit'
    ), (
        4,
        7897698765434567,
        '2023-03-31',
        'Debit'
    ), (
        5,
        5678908787654321,
        '2023-02-28',
        'Credit'
    ), (
        6,
        2345678998765432,
        '2023-08-31',
        'Credit'
    ), (
        7,
        32145678912345678,
        '2023-09-30',
        'Debit'
    ), (
        8,
        908765432176548321,
        '2023-07-31',
        'Debit'
    ), (
        9,
        4532198706543278,
        '2023-06-30',
        'Debit'
    ), (
        10,
        9809087658909834,
        '2023-11-30',
        'Credit'
    ), (
        11,
        8976547895431278,
        '2023-12-31',
        'Debit'
    ), (
        12,
        6578909876155567,
        '2023-10-31',
        'Credit'
    ), (
        13,
        6786679098861452,
        '2022-12-31',
        'Debit'
    );

--QUERY:1

SELECT s.*
FROM Sellers s
    INNER JOIN sellerproductdetails sd ON s.seller_id = sd.seller_id
    INNER JOIN products p ON p.product_id = sd.product_id
    INNER JOIN categories c ON c.category_id = p.category_id
WHERE
    c.category_name = 'Home and Decor';

--QUERY:2

SELECT u.*
FROM users u
    INNER JOIN useraddresses ua ON ua.user_id = u.user_id
WHERE ua.city = 'Hyderabad';

--QUERY:3

SELECT
    product_id,
    product_name,
    category_id,
    inventory
FROM products
WHERE inventory > 100;

--QUERY:4

SELECT
    u.user_id,
    u.user_name,
    u.dob,
    u.phone_no,
    u.email,
    a.address,
    a.city
FROM Users u
    JOIN Orders o ON u.user_id = o.user_id
    JOIN useraddresses a ON u.user_id = a.user_id
WHERE
    o.order_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY
    u.user_id,
    a.address,
    a.city
HAVING COUNT(o.order_id) > 10;

--QUERY:5

SELECT *
FROM orders
WHERE
    delivery_time - order_date > INTERVAL '5 days';

--QUERY:6

SELECT
    cd.card_id,
    u.user_name,
    u.phone_no,
    cd.card_no,
    cd.card_type,
    COUNT(o.card_id) "No.of Uses"
FROM users u
    INNER JOIN orders o ON u.user_id = o.user_id
    INNER JOIN carddetails cd ON o.card_id = cd.card_id
WHERE cd.card_type = 'Credit'
GROUP BY
    u.user_id,
    cd.card_no,
    cd.card_id,
    cd.card_type
HAVING COUNT(o.card_id) > 5;