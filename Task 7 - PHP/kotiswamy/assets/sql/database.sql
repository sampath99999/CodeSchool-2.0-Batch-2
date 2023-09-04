-- Active: 1692016581010@@127.0.0.1@5432@ticket_booking_management@public

-- Creating Tables

CREATE TABLE
    users(
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(30) DEFAULT 'logout',
        access_token VARCHAR(15)
    );

CREATE TABLE
    theaters(
        id SERIAL PRIMARY KEY,
        theater_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        founded INT NOT NULL,
        seating_capacity INT NOT NULL,
        ticket_price INT NOT NULL,
        user_id INT REFERENCES users(id) NOT NULL,
        UNIQUE(theater_name, location)
    );

CREATE TABLE
    movies(
        id SERIAL PRIMARY KEY,
        movie_name VARCHAR(150) NOT NULL,
        released_date DATE NOT NULL,
        movie_img_url TEXT,
        movie_status VARCHAR(255) NOT NULL
    );

CREATE TABLE
    bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES users(id) NOT NULL,
        movie_timing_detail_id INT REFERENCES movie_timing_details(id) NOT NULL,
        no_of_seats INT NOT NULL,
        total_amount INT NOT NULL,
        booking_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    movie_timing_details (
        id SERIAL PRIMARY KEY,
        theater_id INT REFERENCES theaters(id) NOT NULL,
        movie_id INT REFERENCES movies(id) NOT NULL,
        show_date_time TIMESTAMP NOT NULL,
        UNIQUE(theater_id, show_date_time)
    );

-- Inserting Data into Tables

INSERT INTO
    movies(
        movie_name,
        released_date,
        movie_img_url,
        movie_status
    )
VALUES (
        'Jailer',
        '2023-08-10',
        'https://st1.bollywoodlife.com/wp-content/uploads/2023/08/ja-1.jpg',
        'running'
    ), (
        'Bhola Shankar',
        '2023-08-11',
        'https://i0.wp.com/www.socialnews.xyz/wp-content/uploads/2023/08/02/Chiranjeevi-s-Bhola-Shankar-Movie-HD-Posters-1.jpg',
        'closed'
    ), (
        'Ustad',
        '2023-08-12',
        'https://d1vzdswwroofzl.cloudfront.net/wp-content/uploads/2023/08/Ustaad-Telugu-Movie-Review-and-Rating.jpg',
        'running'
    ), (
        'Baby',
        '2023-07-14',
        'https://m.media-amazon.com/images/M/MV5BNThmOTIzOGMtOGRlYi00OWZkLWI3Y2EtY2FhZmY5MThmNjBmXkEyXkFqcGdeQXVyNjQ1MDcxNzM@._V1_FMjpg_UX1000_.jpg',
        'running'
    ), (
        'Meg 2',
        '2023-08-03',
        'https://m.media-amazon.com/images/M/MV5BMTM2NTU1ZTktNjc4YS00NjNhLWE4NmYtOTM2YjFjOGUzNmYzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg',
        'running'
    ), (
        'Smajavaragamana',
        '2023-06-29',
        'https://m.media-amazon.com/images/M/MV5BZmRlZDM5OTMtZmUwNS00MTY4LWFmYzItYjRiZGY0MmM0MmJkXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg',
        'running'
    ), (
        'Gadar 2',
        '2023-08-11',
        'https://m.media-amazon.com/images/M/MV5BZGEzMDJjNGUtYTFhZi00MDgyLWIzMzYtMzcwMDQyZjcyNGY1XkEyXkFqcGdeQXVyNTcwNTM5ODI@._V1_.jpg',
        'running'
    ), (
        'OMG',
        '2023-08-11',
        'https://m.media-amazon.com/images/M/MV5BYTg1MjE2YTQtMmE3ZC00NGQ2LWJiMWYtZmIxNTYzZjJmYTkwXkEyXkFqcGdeQXVyODMyODMxNDY@._V1_.jpg',
        'running'
    ), (
        'BRO',
        '2023-07-28',
        'https://moviegalleri.net/wp-content/gallery/bro-hd/BRO-Movie-Images-HD-22994b1.jpg',
        'running'
    ), (
        'Oppenheimer',
        '2023-07-21',
        'https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg',
        'running'
    ), (
        'Skanda',
        '2023-09-15',
        'https://m.media-amazon.com/images/M/MV5BMjdiMzUyNjYtNjQ2NC00ODUxLTgxMmUtMTViNWY4MjY3ZmI3XkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg',
        'UpComming'
    ), (
        'Salaar',
        '2023-09-18',
        'https://m.media-amazon.com/images/M/MV5BZGE5N2QyOGQtYjc4ZC00YTRhLWFiZDMtMmUzNWFmNjdiMzVkXkEyXkFqcGdeQXVyODEyNjEwMDk@._V1_.jpg',
        'upComming'
    ), (
        'Jawan',
        '2023-09-07',
        'https://m.media-amazon.com/images/M/MV5BZjM2MjE4NWYtOTc1MC00ZDliLWIzYmYtNzNjMTU2Yzg4ODNlXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_QL75_UY281_CR18,0,190,281_.jpg',
        'upComming'
    );

-- Queries

SELECT * FROM customers;

SELECT * FROM theaters ;

SELECT * FROM movies;

SELECT
    array_length(
        string_to_array(seat_numbers, ','),
        1
    )
FROM bookings;

SELECT
    movie_name,
    SUM(b.no_of_tickets) no_of_bookings,
    SUM(
        t.ticket_price * b.no_of_tickets
    ) total_collections
FROM bookings b
    JOIN movies m ON b.movie_id = m.id
    LEFT JOIN theaters t ON b.theater_id = t.id
GROUP BY movie_name
ORDER BY movie_name;

SELECT
    theater_name,
    SUM(b.no_of_tickets) no_of_bookings,
    SUM(
        t.ticket_price * b.no_of_tickets
    ) total_collections
FROM bookings b
    JOIN theaters t ON b.theater_id = t.id
GROUP BY theater_name
ORDER BY theater_name;

SELECT
    customer_name,
    movie_name,
    theater_name, (
        t.ticket_price * b.no_of_tickets
    ) total
FROM customers c
    LEFT JOIN bookings b ON c.id = b.customer_id
    LEFT JOIN theaters t ON b.theater_id = t.id
    LEFT JOIN movies m ON b.movie_id = m.id
ORDER BY customer_name;

SELECT MAX(seating_capacity) AS Theater_Max_capacity FROM theaters;

SELECT
    theater_name,
    SUM(
        array_length(
            string_to_array(seat_numbers, ','),
            1
        )
    ) AS no_of_tickets_booked, (
        seating_capacity - (
            SUM(
                array_length(
                    string_to_array(seat_numbers, ','),
                    1
                )
            )
        )
    ) As no_of_tickets_remaning
FROM bookings b
    LEFT JOIN theaters t ON b.theater_id = t.id
GROUP BY
    t.theater_name,
    t.seating_capacity
ORDER BY t.theater_name;

SELECT
    DATE(booking_date_time) AS booking_date,
    theater_name,
    movie_name,
    SUM(
        array_length(
            string_to_array(seat_numbers, ','),
            1
        ) * ticket_price
    ) AS theater_movie_collection
FROM bookings b
    LEFT JOIN theaters t ON b.theater_id = t.id
    LEFT JOIN movies m ON b.movie_id = m.id
GROUP BY
    DATE(booking_date_time),
    t.theater_name,
    m.movie_name
ORDER BY
    DATE(booking_date_time);

SELECT
    customer_name,
    theater_name,
    movie_name,
    DATE(booking_date_time) AS booking_date,
    CAST(booking_date_time AS TIME) AS booking_time,
    seat_numbers
FROM bookings b
    LEFT JOIN customers c ON b.customer_id = c.id
    LEFT JOIN theaters t ON b.theater_id = t.id
    LEFT JOIN movies m ON b.movie_id = m.id
ORDER BY customer_name;

SELECT * FROM theaters;

SELECT table_name
FROM
    ticket_booking_management.INFORMATION_SCHEMA.TABLES
WHERE table_schema = 'public';