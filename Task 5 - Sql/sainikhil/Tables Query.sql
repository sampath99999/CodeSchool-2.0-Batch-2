CREATE TABLE
    customers(
        customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        date_of_birth DATE NOT NULL,
        gender VARCHAR(6),
        mobile_number VARCHAR(10),
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    products(
        product_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        product_name VARCHAR(100) NOT NULL,
        price NUMERIC(7, 3) NOT NULL,
        inventory INT NOT NULL,
        description VARCHAR(150),
        seller_id INT REFERENCES sellers(seller_id),
        category_id INT REFERENCES categories(category_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    orders(
        order_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        customer_id INT REFERENCES customers(customer_id),
        card_id INT REFERENCES cards(card_id),
        order_date DATE NOT NULL,
        promised_delivery_date DATE NOT NULL,
        product_id INT REFERENCES products(product_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    sellers(
        seller_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        seller_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    customer_address(
        address_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        customer_id INT REFERENCES customers(customer_id),
        address_line1 VARCHAR(150) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pin_code INT NOT NULL,
        country VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    cards (
        card_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        customer_id INT REFERENCES customers(customer_id),
        card_number VARCHAR(16) NOT NULL,
        card_type VARCHAR(10) NOT NULL,
        cardholder_name VARCHAR(100) NOT NULL,
        expiration_date DATE NOT NULL,
        cvv VARCHAR(4) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    categories(
        category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_name VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

alter Table customers alter COLUMN mobile_number type VARCHAR(13);

SET datestyle = dmy;

alter Table customers alter COLUMN gender type TEXT;

alter Table products alter COLUMN description type TEXT;

alter Table cards drop COLUMN cardholder_name;

alter Table cards alter COLUMN expiration_date type TEXT;