--  Products table

create table
    Products (
        product_id INT PRIMARY KEY,
        product_name VARCHAR(50),
        items_in_inventory INTEGER
    );

SELECT * from products;

alter table Products
add column price int not null,
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    products (
        product_id,
        product_name,
        items_in_inventory,
        price,
        created_at
    )
VALUES (
        201,
        'laptop',
        500,
        30000,
        current_timestamp
    ), (
        202,
        'mobile',
        300,
        10000,
        current_timestamp
    ), (
        203,
        'T-shirts',
        200,
        1000,
        current_timestamp
    ), (
        204,
        'headphones',
        50,
        500,
        current_timestamp
    ), (
        205,
        'watch',
        60,
        1000,
        current_timestamp
    ), (
        206,
        'Book shelf',
        60,
        5000,
        current_timestamp
    ), (
        207,
        'Table lamp',
        200,
        800,
        current_timestamp
    ), (
        208,
        'Indoor Plant',
        50,
        300,
        current_timestamp
    ), (
        209,
        'curtain set',
        300,
        600,
        current_timestamp
    ), (
        210,
        'jeans',
        300,
        900,
        current_timestamp
    );

-- Users table

create table
    Users (
        user_id INTEGER PRIMARY KEY,
        user_name VARCHAR(50) not null,
        mobile_number varchar(50) not null
    );

insert into
    users (
        user_id,
        user_name,
        mobile_number,
        created_at
    )
VALUES (
        101,
        'john',
        '9970123454',
        current_timestamp
    ), (
        102,
        'jack',
        '9870123464',
        current_timestamp
    ), (
        103,
        'nitish',
        '9670123474',
        current_timestamp
    ), (
        104,
        'manideep',
        '9970123484',
        current_timestamp
    ), (
        105,
        'akash',
        '9950123994',
        current_timestamp
    ), (
        106,
        'akshay',
        '9767012388',
        current_timestamp
    ), (
        107,
        'rakesh',
        '8760123464',
        current_timestamp
    ), (
        108,
        'ramesh',
        '9370123464',
        current_timestamp
    ), (
        109,
        'ravi',
        '9270123464',
        current_timestamp
    ), (
        110,
        'rahul',
        '9670123464',
        current_timestamp
    );

-- Orders table

create Table
    orders (
        order_id integer primary key,
        user_id integer not null,
        card_id BIGINT not null,
        product_id INTEGER not null,
        order_time TIME not null,
        order_date DATE not null,
        delivery_time TIME not null,
        delivery_date DATE not null,
        constraint fk_userId FOREIGN KEY (user_id) REFERENCES users(user_id),
        constraint fk_cardId FOREIGN KEY (card_id) REFERENCES user_card_details(card_id),
        constraint fK_productId FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

select * from orders;

alter table orders
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    orders (
        order_id,
        user_id,
        card_id,
        product_id,
        order_time,
        order_date,
        delivery_time,
        delivery_date,
        created_at
    )
VALUES (
        401,
        101,
        901,
        201,
        '10:30:00',
        '2023-08-01',
        '11:10:00',
        '2023-08-10',
        current_timestamp
    ), (
        402,
        101,
        901,
        202,
        '9:10:00',
        '2023-08-03',
        '10:10:00',
        '2023-08-12',
        current_timestamp
    ), (
        403,
        101,
        901,
        206,
        '8:40:00',
        '2023-08-05',
        '11:20:00',
        '2023-08-14',
        current_timestamp
    ), (
        404,
        101,
        901,
        207,
        '10:50:00',
        '2023-08-06',
        '12:10:00',
        '2023-08-12',
        current_timestamp
    ), (
        405,
        101,
        901,
        208,
        '11:40:00',
        '2023-08-07',
        '10:10:00',
        '2023-08-08',
        current_timestamp
    ), (
        406,
        101,
        901,
        205,
        '10:30:00',
        '2023-08-07',
        '9:20:00',
        '2023-08-16',
        current_timestamp
    ), (
        407,
        101,
        901,
        201,
        '11:30:00',
        '2023-08-09',
        '10:10:00',
        '2023-08-12',
        current_timestamp
    ), (
        408,
        102,
        901,
        204,
        '12:30:00',
        '2023-08-10',
        '11:10:00',
        '2023-08-13',
        current_timestamp
    ), (
        409,
        103,
        905,
        203,
        '8:30:00',
        '2023-08-10',
        '12:10:00',
        '2023-08-16',
        current_timestamp
    ), (
        410,
        103,
        905,
        201,
        '9:30:00',
        '2023-08-11',
        '10:10:00',
        '2023-08-17',
        current_timestamp
    ), (
        411,
        103,
        905,
        206,
        '11:30:00',
        '2023-08-12',
        '11:40:00',
        '2023-08-14',
        current_timestamp
    ), (
        412,
        103,
        905,
        207,
        '12:30:00',
        '2023-08-12',
        '12:50:00',
        '2023-08-14',
        current_timestamp
    ), (
        413,
        103,
        905,
        208,
        '9:30:00',
        '2023-08-12',
        '9:40:00',
        '2023-08-14',
        current_timestamp
    ), (
        414,
        103,
        905,
        209,
        '10:30:00',
        '2023-08-13',
        '10:30:00',
        '2023-08-24',
        current_timestamp
    ), (
        415,
        103,
        905,
        202,
        '12:30:00',
        '2023-08-13',
        '11:20:00',
        '2023-08-24',
        current_timestamp
    ), (
        416,
        103,
        905,
        203,
        '11:30:00',
        '2023-08-14',
        '12:40:00',
        '2023-08-25',
        current_timestamp
    ), (
        417,
        103,
        905,
        204,
        '9:30:00',
        '2023-08-14',
        '11:20:00',
        '2023-08-25',
        current_timestamp
    ), (
        418,
        103,
        905,
        205,
        '10:30:00',
        '2023-08-14',
        '10:40:00',
        '2023-08-25',
        current_timestamp
    ), (
        419,
        103,
        905,
        201,
        '12:30:00',
        '2023-08-14',
        '9:20:00',
        '2023-08-25',
        current_timestamp
    ), (
        420,
        104,
        906,
        201,
        '11:40:00',
        '2023-08-14',
        '11:30:00',
        '2023-08-19',
        current_timestamp
    ), (
        421,
        105,
        908,
        201,
        '10:30:00',
        '2023-08-15',
        '10:40:00',
        '2023-08-16',
        current_timestamp
    ), (
        422,
        106,
        910,
        201,
        '9:30:00',
        '2023-08-15',
        '12:45:00',
        '2023-08-20',
        current_timestamp
    ), (
        423,
        107,
        912,
        201,
        '10:50:00',
        '2023-08-16',
        '10:50:00',
        '2023-08-24',
        current_timestamp
    ), (
        424,
        108,
        913,
        201,
        '12:40:00',
        '2023-08-16',
        '9:40:00',
        '2023-08-24',
        current_timestamp
    ), (
        425,
        109,
        914,
        201,
        '10:20:00',
        '2023-08-16',
        '11:10:00',
        '2023-08-24',
        current_timestamp
    );

insert into
    orders (
        order_id,
        user_id,
        card_id,
        product_id,
        order_time,
        order_date,
        delivery_time,
        delivery_date,
        created_at
    )
VALUES (
        426,
        109,
        914,
        201,
        '10:30:00',
        '2023-08-15',
        '11:10:00',
        '2023-08-16',
        current_timestamp
    ), (
        427,
        109,
        914,
        202,
        '11:30:00',
        '2023-08-15',
        '12:10:00',
        '2023-08-16',
        current_timestamp
    ), (
        428,
        109,
        914,
        206,
        '12:40:00',
        '2023-08-15',
        '10:10:00',
        '2023-08-16',
        current_timestamp
    ), (
        429,
        109,
        914,
        207,
        '10:50:00',
        '2023-08-16',
        '9:40:00',
        '2023-08-17',
        current_timestamp
    ), (
        430,
        109,
        914,
        208,
        '12:20:00',
        '2023-08-16',
        '11:40:00',
        '2023-08-17',
        current_timestamp
    ), (
        431,
        109,
        914,
        206,
        '9:20:00',
        '2023-08-16',
        '12:15:00',
        '2023-08-17',
        current_timestamp
    ), (
        432,
        109,
        914,
        207,
        '10:40:00',
        '2023-08-16',
        '11:18:00',
        '2023-08-17',
        current_timestamp
    ), (
        433,
        109,
        914,
        208,
        '11:10:00',
        '2023-08-17',
        '10:23:00',
        '2023-08-18',
        current_timestamp
    ), (
        434,
        109,
        914,
        206,
        '9:20:00',
        '2023-08-17',
        '9:15:00',
        '2023-08-18',
        current_timestamp
    ), (
        435,
        109,
        914,
        207,
        '10:45:00',
        '2023-08-17',
        '11:50:00',
        '2023-08-18',
        current_timestamp
    ), (
        436,
        109,
        914,
        205,
        '11:30:00',
        '2023-08-17',
        '12:20:00',
        '2023-08-18',
        current_timestamp
    ), (
        437,
        109,
        914,
        206,
        '12:40:00',
        '2023-08-17',
        '11:50:00',
        '2023-08-18',
        current_timestamp
    ), (
        438,
        109,
        914,
        208,
        '9:20:00',
        '2023-08-17',
        '9:20:00',
        '2023-08-18',
        current_timestamp
    ), (
        439,
        109,
        914,
        209,
        '10:10:00',
        '2023-08-17',
        '10:20:00',
        '2023-08-18',
        current_timestamp
    ), (
        440,
        109,
        914,
        205,
        '11:30:00',
        '2023-08-17',
        '11:50:00',
        '2023-08-18',
        current_timestamp
    );

--  card details table

create table
    user_card_details (
        user_id integer not null,
        card_id integer primary key,
        card_name VARCHAR(50) not null,
        constraint fk_userId FOREIGN KEY(user_id) REFERENCES users (user_id)
    );

alter table user_card_details
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    user_card_details (
        user_id,
        card_id,
        card_name,
        created_at
    )
VALUES (
        101,
        901,
        'visa card',
        current_timestamp
    ), (
        101,
        902,
        'master card',
        current_timestamp
    ), (
        102,
        903,
        'Discover',
        current_timestamp
    ), (
        102,
        904,
        'American Express',
        current_timestamp
    ), (
        103,
        905,
        'visa card',
        current_timestamp
    ), (
        104,
        906,
        'master card',
        current_timestamp
    ), (
        104,
        907,
        'visa card',
        current_timestamp
    ), (
        105,
        908,
        'American Express',
        current_timestamp
    ), (
        106,
        909,
        'visa card',
        current_timestamp
    ), (
        106,
        910,
        'master card',
        current_timestamp
    ), (
        107,
        911,
        'visa card',
        current_timestamp
    ), (
        107,
        912,
        'Discover',
        current_timestamp
    ), (
        108,
        913,
        'visa card',
        current_timestamp
    ), (
        109,
        914,
        'American express',
        current_timestamp
    ), (
        110,
        915,
        'Discover',
        current_timestamp
    );

-- Product categories

create table
    product_categories(
        category_id int not null,
        product_id int primary key,
        category_name varchar(50) not null,
        constraint fk_productId FOREIGN KEY(product_id) REFERENCES products(product_id)
    );

alter table product_categories
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    product_categories (
        category_id,
        product_id,
        category_name,
        created_at
    )
VALUES (
        501,
        201,
        'electronics',
        current_timestamp
    ), (
        501,
        202,
        'electronics',
        current_timestamp
    ), (
        502,
        203,
        'clothing',
        current_timestamp
    ), (
        501,
        204,
        'electronics',
        current_timestamp
    ), (
        501,
        205,
        'electronics',
        current_timestamp
    ), (
        501,
        206,
        'home-decor',
        current_timestamp
    ), (
        501,
        207,
        'home-decor',
        current_timestamp
    ), (
        501,
        208,
        'home-decor',
        current_timestamp
    ), (
        501,
        209,
        'home-decor',
        current_timestamp
    ), (
        501,
        210,
        'clothing',
        current_timestamp
    );

-- Sellers table

create table
    sellers (
        seller_id int PRIMARY KEY,
        seller_name VARCHAR(50) not null,
        product_id int not null,
        created_at timestamptz,
        updated_at timestamptz,
        constraint fk_productId FOREIGN KEY(product_id) REFERENCES products (product_id)
    );

insert into
    sellers(
        seller_id,
        seller_name,
        product_id,
        created_at
    )
values (
        301,
        'rakesh',
        201,
        current_timestamp
    ), (
        302,
        'ravi',
        202,
        current_timestamp
    ), (
        303,
        'ramesh',
        203,
        current_timestamp
    ), (
        304,
        'shiva',
        204,
        current_timestamp
    ), (
        305,
        'suresh',
        205,
        current_timestamp
    ), (
        306,
        'harsha',
        206,
        current_timestamp
    ), (
        307,
        'naveen',
        207,
        current_timestamp
    ), (
        308,
        'sahith',
        208,
        current_timestamp
    ), (
        309,
        'suraj',
        209,
        current_timestamp
    ), (
        310,
        'rohith',
        210,
        current_timestamp
    );

-- Seller product mapping

create table
    seller_product_mapping (
        seller_id int,
        product_id int,
        PRIMARY KEY (seller_id, product_id),
        seller_name varchar(50) not null,
        product_name VARCHAR(50),
        items_in_inventory int not null,
        constraint fk_sellerId FOREIGN key (seller_id) REFERENCES sellers (seller_id),
        constraint fk_productId FOREIGN key (product_id) REFERENCES products (product_id)
    );

alter table
    seller_product_mapping
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    seller_product_mapping(
        seller_id,
        product_id,
        seller_name,
        product_name,
        items_in_inventory,
        created_at
    )
VALUES (
        301,
        201,
        'rakesh',
        'laptop',
        500,
        current_timestamp
    ), (
        302,
        202,
        'ravi',
        'mobile',
        300,
        current_timestamp
    ), (
        303,
        203,
        'ramesh',
        'T-shirts',
        200,
        current_timestamp
    ), (
        304,
        204,
        'shiva',
        'headphones',
        50,
        current_timestamp
    ), (
        305,
        205,
        'suresh',
        'watch',
        60,
        current_timestamp
    ), (
        306,
        206,
        'harsha',
        'Book shelf',
        60,
        current_timestamp
    ), (
        307,
        207,
        'naveen',
        'Table lamp',
        200,
        current_timestamp
    ), (
        308,
        208,
        'sahith',
        'Indoor Plant',
        50,
        current_timestamp
    ), (
        309,
        209,
        'suraj',
        'curtain set',
        300,
        current_timestamp
    ), (
        310,
        210,
        'rohith',
        'jeans',
        300,
        current_timestamp
    );

-- user address table

create table
    user_address (
        user_id int PRIMARY KEY,
        city VARCHAR(50) not null,
        district VARCHAR(50) not null,
        pincode int not null,
        Foreign Key (user_id) REFERENCES users(user_id)
    );

alter table user_address
add
    column created_at timestamptz,
add
    column updated_at timestamptz;

insert into
    user_address(
        user_id,
        city,
        district,
        pincode,
        created_at
    )
VALUES (
        101,
        'hyderabad',
        'Ranga reddy',
        500032,
        current_timestamp
    ), (
        102,
        'hyderabad',
        'hyderabad',
        500005,
        current_timestamp
    ), (
        103,
        'mancherial',
        'mancherial',
        504208,
        current_timestamp
    ), (
        104,
        'ramnagar',
        'nizamabad',
        503001,
        current_timestamp
    ), (
        105,
        'miryalaguda',
        'nalgonda',
        508001,
        current_timestamp
    ), (
        106,
        'hanmakonda',
        'warangal',
        506002,
        current_timestamp
    ), (
        107,
        'vempalli',
        'mancherial',
        504208,
        current_timestamp
    ), (
        108,
        'hyderabad',
        'hyderabad',
        500032,
        current_timestamp
    ), (
        109,
        'hyderabad',
        'medchal',
        501401,
        current_timestamp
    ), (
        110,
        'hyderabad',
        'hyderabad',
        500032,
        current_timestamp
    );

-- queries executed on database

-- Query to get all details of sellers who are selling home and decor products.

select
    seller_id,
    seller_name,
    pc.category_name
from sellers s
    left join product_categories pc on s.product_id = pc.product_id
where
    pc.category_name = 'home-decor';

-- Query to get all details of users who have address in hyderabad.

select
    users.user_id,
    users.user_name,
    users.mobile_number,
    user_address.city
from users
    left join user_address on users.user_id = user_address.user_id
where
    user_address.city = 'hyderabad';

-- Query to get all the products list which have more than 100 items in inventory.

select
    product_id,
    product_name,
    items_in_inventory
from products
where items_in_inventory > 100;

-- Query to get all the users who have orders greater than 10 within one week.

SELECT
    u.user_id,
    u.user_name,
    count(u.user_id) as orders_in_week
FROM users u
    left join orders o on u.user_id = o.user_id
WHERE
    o.order_date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY
    u.user_id,
    u.user_name
HAVING COUNT(u.user_id) > 10;

-- Query to get all orders which have delivery time more than 5 days.

select
    order_id,
    user_id,
    product_id, (delivery_date - order_date) as Delivery_duration_in_days
from orders
where (
        orders.delivery_date - orders.order_date
    ) > 5;

-- Query to get details of users who have purchased products using same credit card more than 5 times.

select
    user_id,
    card_id,
    count(card_id) as times_same_card_used
from orders
GROUP BY card_id, user_id
HAVING count(card_id) > 5;