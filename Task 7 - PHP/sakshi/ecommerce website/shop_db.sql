
CREATE TABLE admins (
  id serial PRIMARY KEY,
  name varchar(20) NOT NULL,
  password varchar(50) NOT NULL
);



INSERT INTO admins (id, name, password)
VALUES (1, 'admin', '6216f8a75fd5bb3d5f22b6f9958cdede3fc086c2');


CREATE TABLE cart (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  pid int NOT NULL,
  name varchar(100) NOT NULL,
  price int NOT NULL,
  quantity int NOT NULL,
  image varchar(100) NOT NULL
);



CREATE TABLE messages (
    id serial PRIMARY KEY,
    user_id integer NOT NULL,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    number varchar(12) NOT NULL,
    message varchar(500) NOT NULL
);



CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  name varchar(20) NOT NULL,
  number varchar(10) NOT NULL,
  email varchar(50) NOT NULL,
  method varchar(50) NOT NULL,
  address varchar(500) NOT NULL,
  total_products text NOT NULL,
  total_price integer NOT NULL,
  placed_on timestamp with time zone NOT NULL DEFAULT current_timestamp,
  payment_status varchar(20) NOT NULL DEFAULT 'pending'
);



CREATE TABLE products (
  id serial PRIMARY KEY,
  name varchar(100) NOT NULL,
  details varchar(500) NOT NULL,
  price integer NOT NULL,
  image_01 varchar(100) NOT NULL,
  image_02 varchar(100) NOT NULL,
  image_03 varchar(100) NOT NULL
);


CREATE TABLE users (
  id serial PRIMARY KEY,
  name varchar(20) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(50) NOT NULL
);


CREATE TABLE wishlist (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  pid integer NOT NULL,
  name varchar(100) NOT NULL,
  price integer NOT NULL,
  image varchar(100) NOT NULL
);
