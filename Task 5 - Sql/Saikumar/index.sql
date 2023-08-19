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


CREATE TABLE Earnings (
    earning_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    base_salary DECIMAL(10, 2),
    DA DECIMAL(10, 2),
    HRA DECIMAL(10, 2),
    bonus DECIMAL(10, 2),
    payment_date date
);
select * from earnings;

INSERT INTO Earnings (employee_id ,base_salary, DA,HRA,bonus,payment_date)
VALUES
    (1, 50000.00,  1000.00, 2000.00,100,'2023-01-01'),
    (2,  45000.00,  800.00, 1000.00,1500,'2023-01-01'),
    (3,  68000.00,  1200.00, 3000.00,1200.00,'2023-01-01'),
    (4,  90009.00,  10000.00, 2000.00,4000,'2023-01-01'),
    (5,  150020.00,  8000.00, 1100.00,6000.50,'2023-01-01'),
    (6,  56302.00, 1300.00, 4020.00,500,'2023-01-01'),
    (7,  70002.00,  3020.00, 1260.00,650,'2023-01-01'),
    (8,  35030.00,  7100.00, 2030.00,1999,'2023-01-01'),
    (9,  78000.00,  2900.00, 3300.50,2230,'2023-01-01'),
    (10, 50050.00,  2120.00, 1100.00,1000,'2023-01-01'), 
    (1, 50500.00,  1000.00, 2000.00,100,'2023-02-01'),
    (2,  45100.00,  800.00, 1000.00,1500,'2023-02-01'),
    (3,  68800.00,  1200.00, 3000.00,1200.00,'2023-02-01'),
    (4,  90209.00,  10000.00, 2000.00,4000,'2023-02-01'),
    (5,  155020.00,  8000.00, 1100.00,6000.50,'2023-02-01'),
    (6,  56502.00, 1300.00, 4020.00,500,'2023-02-01'),
    (7,  70102.00,  3020.00, 1260.00,650,'2023-02-01'),
    (8,  35530.00,  7100.00, 2030.00,1999,'2023-02-01'),
    (9,  78100.00,  2900.00, 3300.50,2230,'2023-02-01'),
    (10, 50550.00,  2120.00, 1100.00,1000,'2023-02-01'),
    (1, 50500.00,  1000.00, 2000.00,100,'2023-03-01'),
    (2,  45100.00,  800.00, 1000.00,1500,'2023-03-01'),
    (3,  68800.00,  1200.00, 3000.00,1200.00,'2023-03-01'),
    (4,  90209.00,  10000.00, 2000.00,4000,'2023-03-01'),
    (5,  155020.00,  8000.00, 1100.00,6000.50,'2023-03-01'),
    (6,  56502.00, 1300.00, 4020.00,500,'2023-03-01'),
    (7,  70102.00,  3020.00, 1260.00,650,'2023-03-01'),
    (8,  35530.00,  7100.00, 2030.00,1999,'2023-03-01'),
    (9,  78100.00,  2900.00, 3300.50,2230,'2023-03-01'),
    (10, 50550.00,  2120.00, 1100.00,1000,'2023-03-01'),
     (1, 50500.00,  1000.00, 2000.00,100,'2023-04-01'),
    (2,  45100.00,  800.00, 1000.00,1500,'2023-04-01'),
    (3,  68800.00,  1200.00, 3000.00,1200.00,'2023-04-01'),
    (4,  90209.00,  10000.00, 2000.00,4000,'2023-04-01'),
    (5,  155020.00,  8000.00, 1100,6000.50,'2023-04-01'),
    (6,  56502.00, 1300.00, 4020.00,500,'2023-04-01'),
    (7,  70102.00,  3020.00, 1260.00,650,'2023-04-01'),
    (8,  35530.00,  7100.00, 2030.00,1999,'2023-04-01'),
    (9,  78100.00,  2900.00, 3300.50,2230,'2023-04-01'),
    (10, 50550.00,  2120.00, 1100.00,1000,'2023-04-01'),
     (1, 50500.00,  1000.00, 2000.00,100,'2023-05-01'),
    (2,  45100.00,  800.00, 1000.00,1500,'2023-05-01'),
    (3,  68800.00,  1200.00, 3000.00,1200.00,'2023-05-01'),
    (4,  90209.00,  10000.00, 2000.00,4000,'2023-05-01'),
    (5,  155020.00,  8000.00, 1100.00,6000.50,'2023-05-01'),
    (6,  56502.00, 130.00, 4020.00,500,'2023-05-01'),
    (7,  70102.00,  3020.00, 1260.00,650,'2023-05-01'),
    (8,  35530.00,  7100.00, 2030.00,1999,'2023-05-01'),
    (9,  78100.00,  2900.00, 3300.50,2230,'2023-05-01'),
    (10, 50550.00,  2120.00, 1100.00,1000,'2023-05-01'),
    (1, 50500.00,  1000.00, 2000.00,100,'2023-06-01'),
    (2,  45100.00,  800.00, 1000.00,1500,'2023-06-01'),
    (3,  68800.00,  1200.00, 3000.00,1200.00,'2023-06-01'),
    (4,  90209.00,  10000.00, 2000.00,4000,'2023-06-01'),
    (5,  155020.00,  8000.00, 1100.00,6000.50,'2023-06-01'),
    (6,  56502.00, 1300.00, 4020.00,500,'2023-06-01'),
    (7,  70102.00,  3020.00, 1260.00,650,'2023-06-01'),
    (8,  35530.00,  7100.00, 2030.00,1999,'2023-06-01'),
    (9,  78100.00,  2900.00, 3300.50,2230,'2023-06-01'),
    (10, 50550.00,  2120.00, 1100.00,1000,'2023-06-01');



   



select * from earnings;


CREATE TABLE Deductions (
    deduction_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES Employees(employee_id),
    group_insurance DECIMAL(10, 2),
    house_loan DECIMAL(10,2),
    it_deductions DECIMAL(10, 2),
    health_insurance DECIMAL(10, 2),
    retirement_contribution DECIMAL(10, 2),
    deduction_date date
);



INSERT INTO Deductions (employee_id, group_insurance, house_loan, it_deductions, health_insurance, retirement_contribution,deduction_date)
VALUES
    (1, 500, 3000, 2050, 2510, 501,'2023-01-01'),
    (2, 400, 3000, 1500, 200, 400 ,'2023-01-01'),
    (3, 308, 600, 1000, 150, 300 ,'2023-01-01'),
    (4, 500, 300, 2000, 250, 500 ,'2023-01-01'),
    (5, 400, 800, 1500, 2000, 400 ,'2023-01-01'),
    (6, 300, 600, 1200, 105, 300 ,'2023-01-01'),
    (7, 500, 1000, 200, 250, 500,'2023-01-01'),
    (8, 400, 800, 150, 200, 400,'2023-01-01'),
    (9, 300, 600, 100, 150, 300,'2023-01-01'),
    (10, 500, 100, 200, 250, 500,'2023-01-01'),
    (1, 400, 800, 159, 200, 400 ,'2023-02-01'),
    (2, 300, 600, 100, 150, 300  ,'2023-02-01'),
    (3, 500, 100, 200, 250, 500 ,'2023-02-01'),
    (4, 400, 800, 150, 200, 400 ,'2023-02-01'),
    (5, 3000, 600, 900, 150, 300 ,'2023-02-01'),
    (6, 300, 500, 259, 100, 100 ,'2023-02-01'),
    (7, 200, 650, 122, 350, 500 ,'2023-02-01'),
    (8, 900, 230, 225, 154, 200 ,'2023-02-01'),
    (9, 300, 520, 550,120, 200 ,'2023-02-01'),
    (10, 1000, 400, 600, 250, 100 ,'2023-02-01'),
    (1, 400, 800, 159, 200, 400 ,'2023-03-01'),
    (2, 300, 600, 100, 150, 300  ,'2023-03-01'),
    (3, 500, 500, 200, 150, 500 ,'2023-03-01'),
    (4, 400, 800, 150, 200, 400 ,'2023-03-01'),
    (5, 3000, 700, 900, 150, 300 ,'2023-03-01'),
    (6, 300, 500, 259, 100, 100 ,'2023-03-01'),
    (7, 200, 650, 122, 350, 500 ,'2023-03-01'),
    (8, 900, 230, 225, 154, 200 ,'2023-03-01'),
    (9, 300, 520, 150,120, 200 ,'2023-03-01'),
    (10, 1000, 400, 600, 250, 100 ,'2023-03-01'),
     (1, 400, 800, 159, 200, 400 ,'2023-04-01'),
    (2, 300, 600, 100, 150, 300  ,'2023-04-01'),
    (3, 500, 500, 200, 150, 500 ,'2023-04-01'),
    (4, 400, 800, 150, 200, 400 ,'2023-04-01'),
    (5, 3000, 700, 900, 150, 300 ,'2023-04-01'),
    (6, 320, 500, 259, 100, 100 ,'2023-04-01'),
    (7, 200, 650, 122, 350, 500 ,'2023-04-01'),
    (8, 900, 230, 225, 154, 200 ,'2023-04-01'),
    (9, 300, 520, 150,120, 200 ,'2023-04-01'),
    (10, 1000, 400, 600, 250, 100 ,'2023-04-01'),
     (1, 400, 800, 159, 200, 400 ,'2023-05-01'),
    (2, 300, 600, 100, 150, 300  ,'2023-05-01'),
    (3, 500, 500, 200, 150, 500 ,'2023-05-01'),
    (4, 400, 800, 550, 200, 400 ,'2023-05-01'),
    (5, 3000, 700, 900, 150, 300 ,'2023-05-01'),
    (6, 300, 500, 259, 100, 100 ,'2023-05-01'),
    (7, 200, 650, 122, 350, 500 ,'2023-05-01'),
    (8, 700, 230, 225, 154, 280 ,'2023-05-01'),
    (9, 300, 520, 150,120, 200 ,'2023-05-01'),
    (10, 1000, 400, 600, 250, 100 ,'2023-05-01'),
     (1, 400, 800, 159, 200, 400 ,'2023-05-01'),
    (2, 300, 600, 100, 150, 300  ,'2023-05-01'),
    (3, 500, 500, 200, 150, 500 ,'2023-05-01'),
    (4, 400, 850, 150, 200, 400 ,'2023-05-01'),
    (5, 3000, 700, 900, 150, 300 ,'2023-05-01'),
    (6, 300, 500, 259, 100, 100 ,'2023-05-01'),
    (7, 200, 650, 122, 350, 500 ,'2023-05-01'),
    (8, 900, 210, 225, 154, 200 ,'2023-05-01'),
    (9, 300, 520, 150,120, 200 ,'2023-05-01'),
    (10, 1000, 800, 600, 250, 100 ,'2023-05-01');

select * from deductions;


-- net expenditure of department
select   department_id,sum(base_salary+DA+HRA+bonus-(group_insurance+house_loan+it_deductions+health_insurance+retirement_contribution))
from employees e inner join earnings er on e.employee_id=er.employee_id 
inner join deductions d on d.employee_id=e.employee_id
group by department_id
order by department_id;



-- employees got paid in a partcular year 2023

select sum(base_salary+DA+HRA+bonus-(group_insurance+house_loan+it_deductions+health_insurance+retirement_contribution)) as total_expenditures
from employees e inner join earnings er on e.employee_id=er.employee_id 
inner join deductions d on d.employee_id=e.employee_id;

-- sum of basic pay of particular department

select sum(base_salary) as department_total_basic_salary from employees e inner join earnings  er on e.employee_id=er.employee_id
inner join departments d on d.department_id=e.department_id
where d.department_id=3;



-- bills submitted for a particular department in a particular month april 
select * from employees e inner join earnings er on er.employee_id=e.employee_id
inner join departments d on d.department_id=e.department_id
where  EXTRACT(MONTH FROM payment_date)=4 and d.department_id=4;