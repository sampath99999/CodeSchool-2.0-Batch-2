-- Active: 1692018713814@@127.0.0.1@5432@crm@public

--1.creating database

CREATE DATABASE CRM;

--2.Creating Tables

CREATE TABLE
    Companies(
        company_id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        company_location varchar(255) NOT NULL,
        city varchar(50) NOT NULL,
        country varchar(50) NOT NULL
    );

CREATE TABLE
    Employees(
        Employee_id SERIAL PRIMARY KEY,
        Employee_name VARCHAR(100) NOT NULL,
        Company_id BIGINT REFERENCES Companies(Company_id),
        Employee_role VARCHAR(50),
        Employee_phno NUMERIC(10) NOT NULL,
        Employee_email VARCHAR(255) NOT NULL,
        permanant_address varchar(500) NOT NULL,
        Residential_address VARCHAR(500),
        Leaves_per_month INT NOT NULL,
        Salary_per_annum BIGINT NOT NULL
    );

ALTER TABLE Employees ADD COLUMN Date_of_joining DATE NOT NULL;

ALTER TABLE employees
ADD
    COLUMN Date_of_birth DATE NOT NULL,
ADD
    COLUMN Gender VARCHAR(15) NOT NULL;

ALTER TABLE
    Employees RENAME COLUMN Salary_per_annum to "Salary_per_annum(RS)";

Create Table
    Salaries(
        Salary_id serial primary KEY,
        Employee_id bigint REFERENCES Employees(Employee_id),
        no_of_leaves int DEFAULT 0,
        salary_date DATE NOT NULL,
        salary BIGINT NOT NULL
    );

Alter TABLE Salaries RENAME column salary to "salary_per_month(RS)";

INSERT INTO
    Companies(
        company_name,
        company_location,
        city,
        country
    )
VALUES (
        'Pixelvide',
        'Jubliee hills',
        'Hyderabad',
        'India'
    ), (
        'Microsoft',
        'Hitech city',
        'Hyderabad',
        'India'
    ), (
        'Google',
        '10th street',
        'Atlanta',
        'United States'
    );

--3.1 companies list

select * from companies;

INSERT INTO
    Employees(
        Employee_name,
        Company_id,
        Employee_role,
        Employee_phno,
        Employee_email,
        permanant_address,
        Residential_address,
        Leaves_per_month,
        "Salary_per_annum(RS)",
        Date_of_joining,
        Date_of_birth,
        Gender
    )
VALUES (
        'bhanu',
        1,
        'intern',
        9876543211,
        'bhanu11@gmail.com',
        'Guntur',
        'Hyderabad',
        2,
        60000,
        '2023-07-13',
        '2001-06-25',
        'Male'
    ), (
        'Sai krishna',
        1,
        'intern',
        9876543212,
        'saikrishna12@gmail.com',
        'Sangareddy',
        'Hyderabad',
        2,
        60000,
        '2023-07-13',
        '2001-07-15',
        'Male'
    ), (
        'Micheal',
        3,
        'FullStack_dev',
        9876543213,
        'micheal13@gmail.com',
        'California',
        'Atlanta',
        4,
        10000000,
        '2022-08-16',
        '1998-03-24',
        'Male'
    ), (
        'Alexa',
        2,
        'Data Analyst',
        9876543214,
        'alexa14@gmail.com',
        'London',
        'Hyderabad',
        3,
        5000000,
        '2023-04-23',
        '1999-07-09',
        'Female'
    );

--3.2 Employees list

SELECT * from Employees;

CREATE OR REPLACE FUNCTION CALCULATE_SALARY(EMPLOYEE_ID 
BIGINT, NO_OF_LEAVES INT, SALARY_DATE DATE) RETURNS 
NUMERIC AS $$ 
	$$ $$ $$ $$ $$ $$ $$ DECLARE salary NUMERIC := 0;
	leavesno INT := 0;
	BEGIN
	SELECT
	    e."Salary_per_annum(RS)",
	    e.leaves_per_month INTO salary,
	    leavesno
	FROM employees e
	WHERE
	    e.employee_id = calculate_salary.employee_id
	    and e.Date_of_joining < calculate_salary.salary_date;
	salary := salary / 12;
	IF no_of_leaves > leavesno THEN salary := salary - ( (salary / 30) * (no_of_leaves - leavesno)
	);
	END IF;
	RETURN salary;
	END;
	$$ LANGUAGE plpgsql;


INSERT INTO
    Salaries (
        Employee_id,
        no_of_leaves,
        salary_date,
        salary
    )
VALUES (
        1, 4, '2023-08-03', (
            SELECT
                calculate_salary(1, 4, '2023-08-03')
        )
    ), (
        2,
        2,
        '2023-08-03', (
            SELECT
                calculate_salary(2, 2, '2023-08-03')
        )
    ), (
        3,
        0,
        '2022-09-01', (
            SELECT
                calculate_salary(3, 0, '2022-09-01')
        )
    ), (
        3,
        3,
        '2022-10-01', (
            SELECT
                calculate_salary(3, 3, '2022-10-01')
        )
    ), (
        3,
        1,
        '2022-11-01', (
            SELECT
                calculate_salary(3, 1, '2022-11-01')
        )
    ), (
        3,
        2,
        '2022-12-01', (
            SELECT
                calculate_salary(3, 2, '2022-12-01')
        )
    ), (
        3,
        5,
        '2023-01-01', (
            SELECT
                calculate_salary(3, 5, '2023-01-01')
        )
    ), (
        4,
        5,
        '2023-05-01', (
            SELECT
                calculate_salary(4, 5, '2023-05-01')
        )
    ), (
        4,
        3,
        '2023-06-01', (
            SELECT
                calculate_salary(4, 3, '2023-06-01')
        )
    ), (
        4,
        6,
        '2023-07-01', (
            SELECT
                calculate_salary(4, 6, '2023-07-01')
        )
    ), (
        4,
        0,
        '2023-08-01', (
            SELECT
                calculate_salary(4, 0, '2023-08-01')
        )
    );

--3.3 salary list

SELECT * from Salaries;

--3.4 salary details list

select
    s.*,
    e.employee_name,
    cmp.company_name
from Salaries s
    left join Employees e on s.employee_id = e.employee_id
    left join companies cmp on cmp.company_id = e.company_id;

--3.5. HOW much salary created total for each employee

select
    s.employee_id,
    e.employee_name,
    cmp.company_id,
    cmp.company_name,
    sum(s."salary_per_month(RS)") as total_salary
from Salaries s
    left join Employees e on s.employee_id = e.employee_id
    left join companies cmp on cmp.company_id = e.company_id
group by
    s.employee_id,
    e.employee_name,
    cmp.company_id
ORDER BY s.employee_id;

--3.6. How many total employees

select count(*) as total_employees from employees;

--3.7. How many total employees company wise

select
    cmp.company_id,
    cmp.company_name,
    count(e.employee_id) as total_employees
from companies cmp
    left join employees e on cmp.company_id = e.company_id
GROUP BY cmp.company_id
ORDER BY cmp.company_id;