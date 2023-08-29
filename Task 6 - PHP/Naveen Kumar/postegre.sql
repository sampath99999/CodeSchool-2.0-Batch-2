-- Active: 1692864209117@@127.0.0.1@5432@moviedatabase@public


CREATE DATABASE moviedatabase


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE login_activity (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    session_token VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ
);

CREATE TABLE booking_history (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    movie_title VARCHAR(255) NOT NULL,
    booking_date DATE NOT NULL,
    seats_count INTEGER NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);
