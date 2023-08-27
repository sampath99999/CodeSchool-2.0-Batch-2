-- Active: 1692016121704@@127.0.0.1@5432@employment_details@public
CREATE TABLE Departments (
    department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    department_name VARCHAR(255) NOT NULL
);

INSERT INTO Departments (department_name) VALUES
    ('Research and development'),
    ('Learning and development'),
    ('HR'),
    ('Sales and marketing '),
    ('Marketing Department'),
    ('Accounting and finances Department'),
    ('Security Department');

select * from departments;

drop table employees;
CREATE TABLE Employees (
    employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    department_id INT REFERENCES departments(department_id),
    phone_number VARCHAR(20)
);


INSERT INTO Employees (first_name, last_name, date_of_birth, gender, email,department_id, phone_number)
VALUES ('Sai', 'Kumar', '2000-08-25', 'Male', 'saikumar.komma@gmail.com',1, '9234168982'),
('Vivek', 'Kumar', '2001-10-25', 'Male', 'vivek@gmail.com',1, '8634168982'),
('Chetan', 'Garela', '2002-04-13', 'Male', 'chetan@gmail.com',3, '9238168182'),
('Aishwarya','Barla', '2001-08-18', 'Female', 'aishwarya@gmail.com',5, '9298138182'),
('Ananya','Modugula','2001-04-07','Female','ananya@gmail.com',7,'9342891682'),
('Dheeraj', 'Reddy', '2001-01-25', 'Male', 'dheeraj.komma@gmail.com',6, '9234168982'),
('Bhanu', 'Thudi', '2001-07-28', 'Male', 'bhanu@gmail.com',2, '9234168982'),
('Navtej', 'Anam', '2002-01-10', 'Male', 'navtej@gmail.com',4, '9238120781'),
('Abhinav', 'Kamatam', '2000-04-14', 'Male', 'abhinav@gmail.com',3, '9138360782'),
('Rahul', 'Reddy', '1999-09-15', 'Male', 'rahul.komma@gmail.com',4, '9438160982');


select * from employees;


create table earningsTypes(
    earnings_type_id SERIAL PRIMARY KEY,
    earnings_type VARCHAR(100) 
)

insert into earningsTypes(earnings_type)
values
('base_salary'),
('DA'),
('HRA'),
('bonus');
drop table earningstypes;
CREATE TABLE Earnings (
    earning_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    earnings_type_id int REFERENCES  earningsTypes(earnings_type_id),
    earnings_month int ,
    earnings_year int,
    earnings_amount int
    
);
select * from earnings;
drop table earnings;


create table earningsTypes(
    earnings_type_id SERIAL PRIMARY KEY,
    earnings_type VARCHAR(100) 
)

insert into earningsTypes(earnings_type)
values
('base_salary'),
('DA'),
('HRA'),
('bonus');
INSERT INTO Earnings (employee_id ,earnings_type_id,earnings_month, earnings_year,earnings_amount)
VALUES
    (1, 1, 1, 2023, 50000),
    (1, 2, 1, 2023, 8000),
    (1, 3, 1, 2023, 7000),
    (1, 4, 1, 2023, 1000),
    (1, 1, 2, 2023, 52000),
    (1, 2, 2, 2023, 8200),
    (1, 3, 2, 2023, 7100),
    (1, 4, 2, 2023, 1200),
    (2, 1, 1, 2023, 50000),
    (2, 2, 1, 2023, 8000),
    (2, 3, 1, 2023, 7000),
    (2, 4, 1, 2023, 1000),
    (2, 1, 2, 2023, 52000),
    (2, 2, 2, 2023, 8200),
    (2, 3, 2, 2023, 7100),
    (2, 4, 2, 2023, 1200),
    (3, 1, 1, 2023, 48000),
    (3, 2, 1, 2023, 7500),
    (3, 3, 1, 2023, 6500),
    (3, 4, 1, 2023, 900),
    (3, 1, 2, 2023, 49000),
    (3, 2, 2, 2023, 7600),
    (3, 3, 2, 2023, 6700),
    (3, 4, 2, 2023, 800),
     (4, 1, 1, 2023, 48000),
    (4, 2, 1, 2023, 7500),
    (4, 3, 1, 2023, 6500),
    (4, 4, 1, 2023, 900),
    (4, 1, 2, 2023, 49000),
    (4, 2, 2, 2023, 7600),
    (4, 3, 2, 2023, 6700),
    (4, 4, 2, 2023, 800),
      (5, 1, 1, 2023, 48000),
    (5, 2, 1, 2023, 7500),
    (5, 3, 1, 2023, 6500),
    (5, 4, 1, 2023, 900),
    (5, 1, 2, 2023, 49000),
    (5, 2, 2, 2023, 7600),
    (5, 3, 2, 2023, 6700),
    (5, 4, 2, 2023, 800),
    (6, 1, 1, 2023, 48000),
    (6, 2, 1, 2023, 7500),
    (6, 3, 1, 2023, 6500),
    (6, 4, 1, 2023, 900),
    (6, 1, 2, 2023, 49000),
    (6, 2, 2, 2023, 7600),
    (6, 3, 2, 2023, 6700),
    (6, 4, 2, 2023, 800),
    (6, 1, 1, 2023, 48000),
    (7, 2, 1, 2023, 7500),
    (7, 3, 1, 2023, 6500),
    (7, 4, 1, 2023, 900),
    (7, 1, 2, 2023, 49000),
    (7, 2, 2, 2023, 7600),
    (7, 3, 2, 2023, 6700),
    (7, 4, 2, 2023, 800),
    (8, 2, 1, 2023, 7500),
    (8, 3, 1, 2023, 6500),
    (8, 4, 1, 2023, 900),
    (8, 1, 2, 2023, 49000),
    (8, 2, 2, 2023, 7600),
    (8, 3, 2, 2023, 6700),
    (8, 4, 2, 2023, 800),
    (9, 2, 1, 2023, 7500),
    (9, 3, 1, 2023, 6500),
    (9, 4, 1, 2023, 900),
    (9, 1, 2, 2023, 49000),
    (9, 2, 2, 2023, 7600),
    (9, 3, 2, 2023, 6700),
    (9, 4, 2, 2023, 800),
    (10, 2, 1, 2023, 7500),
    (10, 3, 1, 2023, 6500),
    (10, 4, 1, 2023, 900),
    (10, 1, 2, 2023, 49000),
    (10, 2, 2, 2023, 7600),
    (10, 3, 2, 2023, 6700),
    (10, 4, 2, 2023, 800);

select * from earnings;
drop table earnings;
create table deductionsTypes(
    deductions_type_id SERIAL PRIMARY KEY,
    deductions_type VARCHAR(100) 
)

insert into deductionsTypes(deductions_type)
values
('group_insurance'),
('house_loan'),
('it_deductions'),
('health_insurance'),
('retirement_contribution');
 drop table deductions;
CREATE TABLE Deductions (
    deduction_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    deductions_type_id int REFERENCES  deductionsTypes(deductions_type_id),
    deductions_month int ,
    deductions_year int ,
    deductions_amount int
);



INSERT INTO Deductions (employee_id,deductions_type_id,deductions_month,deductions_year,deductions_amount)
VALUES
    (1, 1, 1, 2023, 500),
    (1, 2, 1, 2023, 800),
    (1, 3, 1, 2023, 700),
    (1, 4, 1, 2023, 100),
    (1, 1, 2, 2023, 520),
    (1, 2, 2, 2023, 820),
    (1, 3, 2, 2023, 700),
    (1, 4, 2, 2023, 100),
    (2, 1, 1, 2023, 400),
    (2, 2, 1, 2023, 800),
    (2, 3, 1, 2023, 700),
    (2, 4, 1, 2023, 100),
    (2, 1, 2, 2023, 520),
    (2, 2, 2, 2023, 820),
    (2, 3, 2, 2023, 710),
    (2, 4, 2, 2023, 100),
    (3, 1, 1, 2023, 480),
    (3, 2, 1, 2023, 700),
    (3, 3, 1, 2023, 600),
    (3, 4, 1, 2023, 100),
    (3, 1, 2, 2023, 49),
    (3, 2, 2, 2023, 76),
    (3, 3, 2, 2023, 67),
    (3, 4, 2, 2023, 800),
     (4, 1, 1, 2023, 48),
    (4, 2, 1, 2023, 750),
    (4, 3, 1, 2023, 650),
    (4, 4, 1, 2023, 900),
    (4, 1, 2, 2023, 490),
    (4, 2, 2, 2023, 760),
    (4, 3, 2, 2023, 670),
    (4, 4, 2, 2023, 80),
      (5, 1, 1, 2023, 480),
    (5, 2, 1, 2023, 750),
    (5, 3, 1, 2023, 650),
    (5, 4, 1, 2023, 900),
    (5, 1, 2, 2023, 490),
    (5, 2, 2, 2023, 760),
    (5, 3, 2, 2023, 670),
    (5, 4, 2, 2023, 80),
    (6, 1, 1, 2023, 480),
    (6, 2, 1, 2023, 750),
    (6, 3, 1, 2023, 650),
    (6, 4, 1, 2023, 90),
    (6, 1, 2, 2023, 490),
    (6, 2, 2, 2023, 760),
    (6, 3, 2, 2023, 670),
    (6, 4, 2, 2023, 80),
    (6, 1, 1, 2023, 480),
    (7, 2, 1, 2023, 750),
    (7, 3, 1, 2023, 650),
    (7, 4, 1, 2023, 90),
    (7, 1, 2, 2023, 490),
    (7, 2, 2, 2023, 760),
    (7, 3, 2, 2023, 670),
    (7, 4, 2, 2023, 80),
    (8, 2, 1, 2023, 750),
    (8, 3, 1, 2023, 650),
    (8, 4, 1, 2023, 90),
    (8, 1, 2, 2023, 490),
    (8, 2, 2, 2023, 760),
    (8, 3, 2, 2023, 670),
    (8, 4, 2, 2023, 80),
    (9, 2, 1, 2023, 750),
    (9, 3, 1, 2023, 650),
    (9, 4, 1, 2023, 90),
    (9, 1, 2, 2023, 490),
    (9, 2, 2, 2023, 760),
    (9, 3, 2, 2023, 670),
    (9, 4, 2, 2023, 80),
    (10, 2, 1, 2023, 75),
    (10, 3, 1, 2023, 65),
    (10, 4, 1, 2023, 90),
    (10, 1, 2, 2023, 490),
    (10, 2, 2, 2023, 760),
    (10, 3, 2, 2023, 670),
    (10, 4, 2, 2023, 800);

    

select * from deductions;

drop table deductions;

create table bills(
    bill_id  serial PRIMARY key,
    department_id int REFERENCES Departments(department_id) ,
    total_earnings int,
    total_deductions int,
    net_amount int,
    bill_month int,
    bill_year int
);



select * from bills;

INSERT INTO bills (department_id, total_earnings, total_deductions, net_amount, bill_month, bill_year)
SELECT
    d.department_id,
    SUM(er.earnings_amount) AS total_earnings,
    SUM(de.deductions_amount) AS total_deductions,
    SUM(er.earnings_amount) - SUM(de.deductions_amount) AS net_amount,
     er.earnings_month AS bill_month,
    er.earnings_year AS bill_year
FROM Employees e
JOIN Departments d ON e.department_id = d.department_id
 JOIN Earnings er ON e.employee_id = er.employee_id
 JOIN Deductions de ON e.employee_id = de.employee_id
GROUP BY  d.department_id, er.earnings_month,er.earnings_year
ORDER BY d.department_id;

drop table bills;
select * from bills;

create table BillBeneficiaries(
    bill_id int REFERENCES   bills(bill_id),
    employee_id int REFERENCES employees(employee_id),
    amount int 
);


-- Active: 1692016121704@@127.0.0.1@5432@employment_details@public
CREATE TABLE Departments (
    department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    department_name VARCHAR(255) NOT NULL
);

INSERT INTO Departments (department_name) VALUES
    ('Research and development'),
    ('Learning and development'),
    ('HR'),
    ('Sales and marketing '),
    ('Marketing Department'),
    ('Accounting and finances Department'),
    ('Security Department');

select * from departments;

drop table employees;
CREATE TABLE Employees (
    employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(10),
    email VARCHAR(100) UNIQUE,
    department_id INT REFERENCES departments(department_id),
    phone_number VARCHAR(20)
);


INSERT INTO Employees (first_name, last_name, date_of_birth, gender, email,department_id, phone_number)
VALUES ('Sai', 'Kumar', '2000-08-25', 'Male', 'saikumar.komma@gmail.com',1, '9234168982'),
('Vivek', 'Kumar', '2001-10-25', 'Male', 'vivek@gmail.com',1, '8634168982'),
('Chetan', 'Garela', '2002-04-13', 'Male', 'chetan@gmail.com',3, '9238168182'),
('Aishwarya','Barla', '2001-08-18', 'Female', 'aishwarya@gmail.com',5, '9298138182'),
('Ananya','Modugula','2001-04-07','Female','ananya@gmail.com',7,'9342891682'),
('Dheeraj', 'Reddy', '2001-01-25', 'Male', 'dheeraj.komma@gmail.com',6, '9234168982'),
('Bhanu', 'Thudi', '2001-07-28', 'Male', 'bhanu@gmail.com',2, '9234168982'),
('Navtej', 'Anam', '2002-01-10', 'Male', 'navtej@gmail.com',4, '9238120781'),
('Abhinav', 'Kamatam', '2000-04-14', 'Male', 'abhinav@gmail.com',3, '9138360782'),
('Rahul', 'Reddy', '1999-09-15', 'Male', 'rahul.komma@gmail.com',4, '9438160982');


select * from employees;


create table earningsTypes(
    earnings_type_id SERIAL PRIMARY KEY,
    earnings_type VARCHAR(100) 
)

insert into earningsTypes(earnings_type)
values
('base_salary'),
('DA'),
('HRA'),
('bonus');
drop table earningstypes;
CREATE TABLE Earnings (
    earning_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    earnings_type_id int REFERENCES  earningsTypes(earnings_type_id),
    earnings_month int ,
    earnings_year int,
    earnings_amount int
    
);
select * from earnings;
drop table earnings;


create table earningsTypes(
    earnings_type_id SERIAL PRIMARY KEY,
    earnings_type VARCHAR(100) 
)

insert into earningsTypes(earnings_type)
values
('base_salary'),
('DA'),
('HRA'),
('bonus');
INSERT INTO Earnings (employee_id ,earnings_type_id,earnings_month, earnings_year,earnings_amount)
VALUES
    (1, 1, 1, 2023, 50000),
    (1, 2, 1, 2023, 8000),
    (1, 3, 1, 2023, 7000),
    (1, 4, 1, 2023, 1000),
    (1, 1, 2, 2023, 52000),
    (1, 2, 2, 2023, 8200),
    (1, 3, 2, 2023, 7100),
    (1, 4, 2, 2023, 1200),
    (2, 1, 1, 2023, 50000),
    (2, 2, 1, 2023, 8000),
    (2, 3, 1, 2023, 7000),
    (2, 4, 1, 2023, 1000),
    (2, 1, 2, 2023, 52000),
    (2, 2, 2, 2023, 8200),
    (2, 3, 2, 2023, 7100),
    (2, 4, 2, 2023, 1200),
    (3, 1, 1, 2023, 48000),
    (3, 2, 1, 2023, 7500),
    (3, 3, 1, 2023, 6500),
    (3, 4, 1, 2023, 900),
    (3, 1, 2, 2023, 49000),
    (3, 2, 2, 2023, 7600),
    (3, 3, 2, 2023, 6700),
    (3, 4, 2, 2023, 800),
     (4, 1, 1, 2023, 48000),
    (4, 2, 1, 2023, 7500),
    (4, 3, 1, 2023, 6500),
    (4, 4, 1, 2023, 900),
    (4, 1, 2, 2023, 49000),
    (4, 2, 2, 2023, 7600),
    (4, 3, 2, 2023, 6700),
    (4, 4, 2, 2023, 800),
      (5, 1, 1, 2023, 48000),
    (5, 2, 1, 2023, 7500),
    (5, 3, 1, 2023, 6500),
    (5, 4, 1, 2023, 900),
    (5, 1, 2, 2023, 49000),
    (5, 2, 2, 2023, 7600),
    (5, 3, 2, 2023, 6700),
    (5, 4, 2, 2023, 800),
    (6, 1, 1, 2023, 48000),
    (6, 2, 1, 2023, 7500),
    (6, 3, 1, 2023, 6500),
    (6, 4, 1, 2023, 900),
    (6, 1, 2, 2023, 49000),
    (6, 2, 2, 2023, 7600),
    (6, 3, 2, 2023, 6700),
    (6, 4, 2, 2023, 800),
    (6, 1, 1, 2023, 48000),
    (7, 2, 1, 2023, 7500),
    (7, 3, 1, 2023, 6500),
    (7, 4, 1, 2023, 900),
    (7, 1, 2, 2023, 49000),
    (7, 2, 2, 2023, 7600),
    (7, 3, 2, 2023, 6700),
    (7, 4, 2, 2023, 800),
    (8, 2, 1, 2023, 7500),
    (8, 3, 1, 2023, 6500),
    (8, 4, 1, 2023, 900),
    (8, 1, 2, 2023, 49000),
    (8, 2, 2, 2023, 7600),
    (8, 3, 2, 2023, 6700),
    (8, 4, 2, 2023, 800),
    (9, 2, 1, 2023, 7500),
    (9, 3, 1, 2023, 6500),
    (9, 4, 1, 2023, 900),
    (9, 1, 2, 2023, 49000),
    (9, 2, 2, 2023, 7600),
    (9, 3, 2, 2023, 6700),
    (9, 4, 2, 2023, 800),
    (10, 2, 1, 2023, 7500),
    (10, 3, 1, 2023, 6500),
    (10, 4, 1, 2023, 900),
    (10, 1, 2, 2023, 49000),
    (10, 2, 2, 2023, 7600),
    (10, 3, 2, 2023, 6700),
    (10, 4, 2, 2023, 800);

select * from earnings;
drop table earnings;
create table deductionsTypes(
    deductions_type_id SERIAL PRIMARY KEY,
    deductions_type VARCHAR(100) 
)

insert into deductionsTypes(deductions_type)
values
('group_insurance'),
('house_loan'),
('it_deductions'),
('health_insurance'),
('retirement_contribution');
 drop table deductions;
CREATE TABLE Deductions (
    deduction_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    deductions_type_id int REFERENCES  deductionsTypes(deductions_type_id),
    deductions_month int ,
    deductions_year int ,
    deductions_amount int
);



INSERT INTO Deductions (employee_id,deductions_type_id,deductions_month,deductions_year,deductions_amount)
VALUES
    (1, 1, 1, 2023, 500),
    (1, 2, 1, 2023, 800),
    (1, 3, 1, 2023, 700),
    (1, 4, 1, 2023, 100),
    (1, 1, 2, 2023, 520),
    (1, 2, 2, 2023, 820),
    (1, 3, 2, 2023, 700),
    (1, 4, 2, 2023, 100),
    (2, 1, 1, 2023, 400),
    (2, 2, 1, 2023, 800),
    (2, 3, 1, 2023, 700),
    (2, 4, 1, 2023, 100),
    (2, 1, 2, 2023, 520),
    (2, 2, 2, 2023, 820),
    (2, 3, 2, 2023, 710),
    (2, 4, 2, 2023, 100),
    (3, 1, 1, 2023, 480),
    (3, 2, 1, 2023, 700),
    (3, 3, 1, 2023, 600),
    (3, 4, 1, 2023, 100),
    (3, 1, 2, 2023, 49),
    (3, 2, 2, 2023, 76),
    (3, 3, 2, 2023, 67),
    (3, 4, 2, 2023, 800),
     (4, 1, 1, 2023, 48),
    (4, 2, 1, 2023, 750),
    (4, 3, 1, 2023, 650),
    (4, 4, 1, 2023, 900),
    (4, 1, 2, 2023, 490),
    (4, 2, 2, 2023, 760),
    (4, 3, 2, 2023, 670),
    (4, 4, 2, 2023, 80),
      (5, 1, 1, 2023, 480),
    (5, 2, 1, 2023, 750),
    (5, 3, 1, 2023, 650),
    (5, 4, 1, 2023, 900),
    (5, 1, 2, 2023, 490),
    (5, 2, 2, 2023, 760),
    (5, 3, 2, 2023, 670),
    (5, 4, 2, 2023, 80),
    (6, 1, 1, 2023, 480),
    (6, 2, 1, 2023, 750),
    (6, 3, 1, 2023, 650),
    (6, 4, 1, 2023, 90),
    (6, 1, 2, 2023, 490),
    (6, 2, 2, 2023, 760),
    (6, 3, 2, 2023, 670),
    (6, 4, 2, 2023, 80),
    (6, 1, 1, 2023, 480),
    (7, 2, 1, 2023, 750),
    (7, 3, 1, 2023, 650),
    (7, 4, 1, 2023, 90),
    (7, 1, 2, 2023, 490),
    (7, 2, 2, 2023, 760),
    (7, 3, 2, 2023, 670),
    (7, 4, 2, 2023, 80),
    (8, 2, 1, 2023, 750),
    (8, 3, 1, 2023, 650),
    (8, 4, 1, 2023, 90),
    (8, 1, 2, 2023, 490),
    (8, 2, 2, 2023, 760),
    (8, 3, 2, 2023, 670),
    (8, 4, 2, 2023, 80),
    (9, 2, 1, 2023, 750),
    (9, 3, 1, 2023, 650),
    (9, 4, 1, 2023, 90),
    (9, 1, 2, 2023, 490),
    (9, 2, 2, 2023, 760),
    (9, 3, 2, 2023, 670),
    (9, 4, 2, 2023, 80),
    (10, 2, 1, 2023, 75),
    (10, 3, 1, 2023, 65),
    (10, 4, 1, 2023, 90),
    (10, 1, 2, 2023, 490),
    (10, 2, 2, 2023, 760),
    (10, 3, 2, 2023, 670),
    (10, 4, 2, 2023, 800);

    

select * from deductions;

drop table deductions;

create table bills(
    bill_id  serial PRIMARY key,
    department_id int REFERENCES Departments(department_id) ,
    total_earnings int,
    total_deductions int,
    net_amount int,
    bill_month int,
    bill_year int
);



select * from bills;

INSERT INTO bills (department_id, total_earnings, total_deductions, net_amount, bill_month, bill_year)
SELECT
    d.department_id,
    SUM(er.earnings_amount) AS total_earnings,
    SUM(de.deductions_amount) AS total_deductions,
    SUM(er.earnings_amount) - SUM(de.deductions_amount) AS net_amount,
     er.earnings_month AS bill_month,
    er.earnings_year AS bill_year
FROM Employees e
JOIN Departments d ON e.department_id = d.department_id
 JOIN Earnings er ON e.employee_id = er.employee_id
 JOIN Deductions de ON e.employee_id = de.employee_id
GROUP BY  d.department_id, er.earnings_month,er.earnings_year
ORDER BY d.department_id;

drop table bills;
select * from bills;

CREATE TABLE BillBeneficiaries (
    bill_id int REFERENCES bills(bill_id),
    employee_id int REFERENCES employees(employee_id),
    amount int 
);
drop table billbeneficiaries;
INSERT INTO BillBeneficiaries (bill_id, employee_id, amount)
SELECT
    b.bill_id,
    emp.employee_id,
    (COALESCE(SUM(er.earnings_amount), 0) - COALESCE(SUM(de.deductions_amount), 0)) AS amount
FROM
    Bills b
JOIN
    Departments d ON b.department_id = d.department_id
JOIN
    Employees emp ON d.department_id = emp.department_id
LEFT JOIN
    Earnings er ON emp.employee_id = er.employee_id AND b.bill_month = er.earnings_month AND b.bill_year = er.earnings_year
LEFT JOIN
    Deductions de ON emp.employee_id = de.employee_id AND b.bill_month = de.deductions_month AND b.bill_year = de.deductions_year
GROUP BY 
    b.bill_id,
    emp.employee_id

 select * from billbeneficiaries;