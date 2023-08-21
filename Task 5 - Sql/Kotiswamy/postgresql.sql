-- Active: 1692016581010@@127.0.0.1@5432@ticket_booking_management@public

-- Creating Tables

CREATE TABLE
    customers(
        id SERIAL PRIMARY KEY,
        customer_name VARCHAR(250) NOT NULL,
        gender VARCHAR(10) NOT NULL,
        age INT NOT NULL,
        phone INT NOT NULL,
        email VARCHAR(250) NOT NULL UNIQUE,
        location VARCHAR(250) NOT NULL
    );

CREATE TABLE
    theaters(
        id SERIAL PRIMARY KEY,
        theater_name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        founded INT NOT NULL,
        seating_capacity INT NOT NULL,
        ticket_price INT NOT NULL
    );

CREATE TABLE
    movies(
        id SERIAL PRIMARY KEY,
        movie_name VARCHAR(150) NOT NULL,
        released_date DATE NOT NULL
    );

CREATE TABLE
    bookings (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id) NOT NULL,
        theater_id INT REFERENCES theaters(id) NOT NULL,
        movie_id INT REFERENCES movies(id) NOT NULL,
        seat_numbers VARCHAR(250) NOT NULL,
        booking_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- Inserting Data into Tables

INSERT INTO
    customers (
        customer_name,
        age,
        gender,
        phone,
        email,
        location
    )
VALUES (
        'Ravi',
        24,
        'Male',
        1234567890,
        'ravi123@gmail.com',
        'Hyderabad,Telangana'
    ), (
        'Rani',
        22,
        'Female',
        1234567890,
        'rani123@gmail.com',
        'Guntur,Andhrapradesh'
    ), (
        'Rakesh',
        26,
        'Male',
        1234567890,
        'rakesh123@gmail.com',
        'Mumbai,Maharashtra'
    ), (
        'Raju',
        21,
        'Male',
        1234567890,
        'raju123@gmail.com',
        'Banglore,Karnataka'
    ), (
        'Roshni',
        23,
        'Female',
        1234567890,
        'roshni123@gmail.com',
        'Vijayawada,Andhrapradesh'
    ), (
        'Roshan',
        25,
        'Male',
        1234567890,
        'roshan123@gmail.com',
        'Mothinagar,Telangana'
    ), (
        'Rajani',
        26,
        'Female',
        1234567890,
        'rajani123@gmail.com',
        'Warangal,Telangana'
    ), (
        'Ranjith',
        28,
        'Male',
        1234567890,
        'ranjith123@gmail.com',
        'Ongole,Andhrapradesh'
    ), (
        'Rohit',
        28,
        'Male',
        1234567890,
        'rohit123@gmail.com',
        'Chirala,Andhrapradesh'
    ), (
        'Rajiv',
        29,
        'Male',
        1234567890,
        'rajiv123@gmail.com',
        'Bapatla,Andhrapradesh'
    ), (
        'Ramani',
        24,
        'Female',
        1234567890,
        'ramani123@gmail.com',
        'Karamchedu,Andhrapradesh'
    ), (
        'Rasool',
        25,
        'Male',
        1234567890,
        'rasool123@gmail.com',
        'Khammam,Telangana'
    ), (
        'Rakshit',
        29,
        'Male',
        1234567890,
        'rakshit123@gmail.com',
        'Vizag,Andhrapradesh'
    ), (
        'Ratnam',
        35,
        'Male',
        1234567890,
        'ratnam123@gmail.com',
        'Suryapet,Telangan'
    ), (
        'Ranveer',
        30,
        'Male',
        1234567890,
        'ranveer123@gmail.com',
        'Bapatla,Andhrapradesh'
    ), (
        'Ranbir',
        32,
        'Male',
        1234567890,
        'ranbir123@gmail.com',
        'Kanchipuram,Andhrapradesh'
    ), (
        'Reka',
        29,
        'Female',
        1234567890,
        'reka123@gmail.com',
        'Bapatla,Andhrapradesh'
    ), (
        'Ranvir',
        24,
        'Male',
        1234567890,
        'ranvir123@gmail.com',
        'Challapali,Andhrapradesh'
    ), (
        'Rana',
        45,
        'Male',
        1234567890,
        'rana123@gmail.com',
        'kadapa,Andhrapradesh'
    ), (
        'Ramesh',
        55,
        'Male',
        1234567890,
        'ramesh123@gmail.com',
        'Chitoor,Andhrapradesh'
    );

INSERT INTO
    customers(
        customer_name,
        email,
        gender,
        location,
        age,
        phone
    )
VALUES
(
        'Nawaz',
        'nawaz25@gmail.com',
        'Male',
        'Secendrabad,Hyderabad',
        27,
        1234567890
    ), (
        'Raju',
        'raju78@gmail.com',
        'Male',
        'Karimnagar,Telangana',
        29,
        1234567890
    ), (
        'Mounika',
        'mounika65@gmail.com',
        'Female',
        'Ameerpet,Hyderabad',
        23,
        1234567890
    ), (
        'Shiva',
        'shiva89@gmail.com',
        'Male',
        'Uppal,Hyderabad',
        22,
        1234567890
    ), (
        'Virat',
        'virat97@gmail.com',
        'Male',
        'Adilabad,Telangana',
        26,
        1234567890
    ), (
        'Surya',
        'surya86@gmail.com',
        'Male',
        'Khammam,Telangana',
        32,
        1234567890
    ), (
        'Kishan',
        'kishan09@gmail.com',
        'Male',
        'Vijayawada,AP',
        42,
        1234567890
    ), (
        'Pravalika',
        'pravalika98@gmail.com',
        'Male',
        'Guntur,AP',
        21,
        1234567890
    ), (
        'Zeeshan',
        'zeeshan23@gmail.com',
        'Male',
        'Hyderabad,Telangana',
        30,
        1234567890
    );

INSERT INTO
    theaters(
        theater_name,
        location,
        founded,
        ticket_price,
        seating_capacity
    )
VALUES (
        'Ganesh 70MM',
        'Shamshabad,Telangana',
        1990,
        150,
        150
    ), (
        'Gokul 70MM',
        'Erragadda,Telangana',
        1980,
        175,
        150
    ), (
        'AMB Cinemas',
        'Gachibowli,Telangana',
        2019,
        295,
        100
    ), (
        'AAA Cinemas',
        'Ameerpet,Telangana',
        2023,
        295,
        100
    ), (
        'GPR Multiplex',
        'Nizampet,Telangana',
        2015,
        200,
        120
    ), (
        'PVP Square Mall',
        'Vijayawada,Andhrapradesh',
        2018,
        177,
        100
    ), (
        'Swarna Multiplex',
        'Vijayawada,Andhrapradesh',
        2000,
        110,
        100
    ), (
        'G3 Theaters',
        'Vijayawada,Andhrapradesh',
        1998,
        177,
        80
    ), (
        'Swathi Theater',
        'Bhavanipuram,Andhrapradesh',
        1999,
        110,
        150
    ), (
        'Jayaram Theater',
        'Vijayawada,Andhrapradesh',
        1985,
        112,
        75
    ), (
        'Prasads Multiplex',
        'Hyderabad,Telangana',
        1975,
        250,
        90
    ), (
        'Asian M Cube Mall',
        'Attapur,Telangana',
        1990,
        250,
        75
    ), (
        'Bvk Multiplex Vijayalakshmi',
        'LB Nagar,Telangana',
        2000,
        200,
        130
    ), (
        'Asian Mukta Cinemas',
        'Narapally,Telangana',
        2004,
        250,
        100
    ), (
        'Sree Ramulu',
        'Moosapet,Telangana',
        2001,
        175,
        140
    ), (
        'Tivoli Cinemas',
        'Secunderabad,Telangana',
        2005,
        250,
        200
    ), (
        'BR Hitech',
        'Madhapur,Telangana',
        1960,
        175,
        160
    ), (
        'Bhramaramba 70MM',
        'Kukatpally',
        1973,
        175,
        250
    ), (
        'Sri Sai Ram',
        'Malkajgiri,Telangana',
        2003,
        175,
        145
    ), (
        'Sai Ranga',
        'Miyapur,Telangana',
        2005,
        175,
        165
    );

INSERT INTO
    movies(movie_name, released_date)
VALUES ('Jailer', '2023-08-10'), ('Bhola Shankar', '2023-08-11'), ('Ustad', '2023-08-12'), ('Baby', '2023-07-14'), ('Meg 2', '2023-08-03'), (
        'Smajavaragamana',
        '2023-06-29'
    ), ('Gadar 2', '2023-08-11'), ('OMG', '2023-08-11'), ('BRO', '2023-07-28'), ('Oppenheimer', '2023-07-21');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(1, 1, 10, 'A1,A2,A3');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(2, 1, 10, 'B11,B12,B13,B14,B15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(3, 1, 10, 'c16,c17');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(4, 1, 10, 'D18,D19,B20');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(5, 1, 10, 'F6');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(6, 2, 10, 'E6,E7,E8,E9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(7, 2, 10, 'F6,F7,F8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(8, 2, 10, 'A11,A12,A13,A14,A15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(9, 2, 10, 'B6');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(10, 2, 10, 'J6,J7,J8,J9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(11, 3, 9, 'F6,F7,F8,F9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(12, 3, 9, 'L15,L16,L17,L18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(13, 3, 9, 'M15,M16,M17,M18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(14, 3, 9, 'K5,K6,K7,K8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(15, 3, 9, 'O15,O16,O17,O18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 4, 9, 'A15,A16,A17,A18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 4, 9, 'C8,C9,');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(18, 4, 9, 'F3,F6,F7,F8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(19, 4, 9, 'S1,S2.S3');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(20, 4, 9, 'T5,T6,T7');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(26, 5, 8, 'G15,G16,G17,G18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(27, 5, 8, 'H15,H16,H17,H18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(28, 5, 8, 'I15,I16,I17,I18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(29, 5, 8, 'K15,K16,K17,K18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(30, 5, 8, 'D15,D16,D17,D18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(1, 6, 8, 'B11,B12,B13,B14,B15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(2, 6, 8, 'F11,F12,F13,F14,F15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(3, 6, 8, 'c16,c17');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(4, 6, 8, 'D18,D19,B20');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(5, 6, 8, 'F6');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(6, 7, 7, 'E6,E7,E8,E9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(7, 7, 7, 'F6,F7,F8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(8, 7, 7, 'A11,A12,A13,A14,A15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(9, 7, 7, 'B6');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(10, 7, 7, 'J6,J7,J8,J9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(11, 8, 7, 'F6,F7,F8,F9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(12, 8, 7, 'L15,L16,L17,L18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(13, 8, 7, 'M15,M16,M17,M18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(14, 8, 7, 'K5,K6,K7,K8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(15, 8, 7, 'O15,O16,O17,O18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 9, 6, 'A15,A16,A17,A18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 9, 6, 'C8,C9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(18, 9, 6, 'F3,F6,F7,F8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(19, 9, 6, 'S1,S2.S3');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(20, 9, 6, 'T5,T6,T7');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(26, 10, 6, 'G15,G16,G17,G18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(27, 10, 6, 'H15,H16,H17,H18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(28, 10, 6, 'I15,I16,I17,I18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(29, 10, 6, 'K15,K16,K17,K18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(30, 10, 6, 'D15,D16,D17,D18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(
        23,
        11,
        5,
        'N11,N12,N13,N14,N15'
    );

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(24, 11, 5, 'L11,L12');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(25, 11, 5, 'K7,K8,K9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(
        23,
        12,
        4,
        'A11,A12,A13,A14,A15'
    );

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(24, 12, 4, 'B11,B12');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(25, 12, 4, 'C7,C8,C9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(
        23,
        13,
        3,
        'F11,F12,F13,F14,F15'
    );

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(24, 13, 3, 'G11,G12');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(25, 13, 3, 'H7,H8,H9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(
        23,
        14,
        2,
        'L11,L12,L13,L14,L15'
    );

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(24, 14, 2, 'M11,M12');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(25, 14, 2, 'N7,N8,N9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(15, 15, 1, 'O15,O16,O17,O18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 15, 1, 'A15,A16,A17,A18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 15, 1, 'C8,C9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(15, 16, 5, 'D15,D16');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 16, 5, 'E15,E16,E17');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 16, 5, 'F8,F9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(15, 17, 3, 'J5,J6,J7,J8,J9,J10');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 17, 3, 'S15,S16,S17,S18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 17, 3, 'B8,B9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(15, 18, 2, 'N15,N16,N17,N18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(16, 18, 2, 'B15,B16,B17,B18');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(17, 18, 2, 'C8,C9');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(7, 19, 4, 'G6,G7,G8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(8, 19, 4, 'H11,H12,H13,H14,H15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(9, 19, 4, 'J6');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(7, 20, 3, 'K6,K7,K8');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES
(8, 20, 3, 'L11,L12,L13,L14,L15');

INSERT INTO
    bookings(
        customer_id,
        theater_id,
        movie_id,
        seat_numbers
    )
VALUES(9, 20, 3, 'S6');

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

--