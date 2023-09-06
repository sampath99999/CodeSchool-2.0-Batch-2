-- Active: 1692016581010@@127.0.0.1@5432@chat_room_database@public
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone INT NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  age INT NOT NULL,
  gender VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  access_token VARCHAR(15)
)

CREATE TABLE messages(
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  user_id INT NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)