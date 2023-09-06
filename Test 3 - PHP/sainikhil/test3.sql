-- Active: 1692155575836@@127.0.0.1@5432@test_3@public

CREATE TABLE
    users (
        id serial PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    tokens(
        id serial PRIMARY KEY,
        user_id int REFERENCES users(id) on delete CASCADE,
        token VARCHAR(200) NOT NULL
    );

CREATE TABLE
    images(
        id serial PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        img_url VARCHAR(200) NOT NULL
    );