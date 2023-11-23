CREATE TABLE EmployeeDetails (
    employee_details_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    fathers_name VARCHAR(100),
    gender VARCHAR(10) NOT NULL,
    marital_status VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    aadhaar_no VARCHAR(20) NOT NULL,
    address TEXT,
    pan_no VARCHAR(20) NOT NULL,
    email_id VARCHAR(100),
    phone_no VARCHAR(20)
);

INSERT INTO EmployeeDetails (name, fathers_name, gender, marital_status, date_of_birth, aadhaar_no, address, pan_no, email_id, phone_no)
VALUES
    ('Rajesh Kumar', 'Ramesh Kumar', 'Male', 'Married', '1985-06-10', '1234 5678 9012', '123 ABC Street, City', 'ABCDE1234F', 'rajesh@example.com', '+91 9876543210'),
    ('Priya Sharma', 'Rajendra Sharma', 'Female', 'Single', '1990-03-15', '9876 5432 1098', '456 XYZ Street, Town', 'FGHIJ5678K', 'priya@example.com', '+91 8765432109'),
    ('Amit Patel', 'Sanjay Patel', 'Male', 'Married', '1988-11-25', '5678 9012 3456', '789 PQR Street, Village', 'LMNOP6789M', 'amit@example.com', '+91 7654321098'),
    ('Sneha Gupta', 'Rahul Gupta', 'Female', 'Married', '1992-07-03', '8901 2345 6789', '101 QRS Street, Suburb', 'QRSTU7890N', 'sneha@example.com', '+91 6543210987'),
    ('Vikram Singh', 'Alok Singh', 'Male', 'Single', '1995-02-18', '2345 6789 0123', '202 MNO Street, District', 'VWXYZ8901P', 'vikram@example.com', '+91 5432109876'),
    ('Neha Verma', 'Anil Verma', 'Female', 'Single', '1993-09-22', '3456 7890 1234', '303 LMN Street, City', 'ABCDE2345G', 'neha@example.com', '+91 4321098765'),
    ('Anand Gupta', 'Suresh Gupta', 'Male', 'Married', '1980-12-05', '4567 8901 2345', '404 OPQ Street, Town', 'FGHIJ3456H', 'anand@example.com', '+91 3210987654'),
    ('Kavita Rao', 'Rajesh Rao', 'Female', 'Divorced', '1987-04-14', '5678 9012 3456', '505 RST Street, Village', 'LMNOP4567I', 'kavita@example.com', '+91 2109876543'),
    ('Sanjay Desai', 'Vijay Desai', 'Male', 'Widowed', '1975-08-30', '6789 0123 4567', '606 UVW Street, Suburb', 'QRSTU5678J', 'sanjay@example.com', '+91 1098765432'),
    ('Aisha Khan', 'Rahul Khan', 'Female', 'Married', '1998-01-12', '7890 1234 5678', '707 XYZ Street, District', 'VWXYZ6789Q', 'aisha@example.com', '+91 0987654321'),
    ('Amita Choudhary', 'Rajendra Choudhary', 'Female', 'Single', '1991-07-08', '8901 2345 6789', '808 ABC Street, City', 'ABCDE3456R', 'amita@example.com', '+91 9876543210'),
    ('Rajiv Kapoor', 'Vikram Kapoor', 'Male', 'Married', '1982-04-30', '2345 6789 0123', '909 DEF Street, Town', 'FGHIJ4567S', 'rajiv@example.com', '+91 8765432109'),
    ('Sneha Joshi', 'Prakash Joshi', 'Female', 'Married', '1989-11-15', '3456 7890 1234', '1010 GHI Street, Village', 'LMNOP5678T', 'sneha.joshi@example.com', '+91 7654321098'),
    ('Vikrant Mehta', 'Alok Mehta', 'Male', 'Single', '1994-03-22', '4567 8901 2345', '1111 JKL Street, Suburb', 'QRSTU6789U', 'vikrant.mehta@example.com', '+91 6543210987'),
    ('Pooja Sharma', 'Rahul Sharma', 'Female', 'Divorced', '1986-09-05', '5678 9012 3456', '1212 MNO Street, District', 'VWXYZ7890V', 'pooja.sharma@example.com', '+91 5432109876'),
    ('Rahul Khanna', 'Amit Khanna', 'Male', 'Married', '1983-12-18', '6789 0123 4567', '1313 PQR Street, City', 'ABCDE4567W', 'rahul@example.com', '+91 4321098765'),
    ('Shreya Patel', 'Sanjay Patel', 'Female', 'Single', '1997-05-21', '7890 1234 5678', '1414 UVW Street, Town', 'FGHIJ5678X', 'shreya@example.com', '+91 3210987654'),
    ('Aryan Singh', 'Vijay Singh', 'Male', 'Divorced', '1984-08-14', '1234 5678 9012', '1515 XYZ Street, Village', 'LMNOP6789Y', 'aryan@example.com', '+91 2109876543'),
    ('Nisha Rao', 'Rajesh Rao', 'Female', 'Married', '1990-02-27', '2345 6789 0123', '1616 ABC Street, Suburb', 'QRSTU7890Z', 'nisha@example.com', '+91 1098765432'),
    ('Karan Verma', 'Anil Verma', 'Male', 'Single', '1996-06-09', '3456 7890 1234', '1717 DEF Street, District', 'VWXYZ8901A', 'karan@example.com', '+91 0987654321');


CREATE TABLE Departments (
  department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE EarnDedsCategories (
  earndeds_category_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category VARCHAR(255) NOT NULL CHECK (category IN ('Earning', 'Deduction')),
  earndeds_category_name VARCHAR(255) NOT NULL
);

CREATE TABLE BankIFSCCodes (
  bank_ifsc_code_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ifsc_code VARCHAR(12) NOT NULL,
  bank_branch VARCHAR(255) NOT NULL
);

CREATE TABLE EmployeeBankDetails (
  emp_BankDetails_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bank_AC_No VARCHAR(20) NOT NULL,
  bank_ifsc INT NOT NULL REFERENCES BankIFSCCodes(bank_ifsc_code_id),
);

CREATE TABLE Employees (
  employee_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  employee_department_id INT REFERENCES Departments(department_id) NOT NULL,
  employee_details_id INT REFERENCES EmployeeDetails(employee_details_id) NOT NULL,
  employee_designation VARCHAR(20) NOT NULL,
  status BOOLEAN DEFAULT true,
  scale_type VARCHAR(20)
);

CREATE TABLE Bills (
  bill_pk INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bill_id INT REFERENCES Departments(department_id) NOT NULL,
  bill_month INT NOT NULL CHECK (bill_month >= 1 AND bill_month <= 12),
  bill_year INT NOT NULL CHECK (bill_year >= 2023),
  total_earnings INT NOT NULL,
  total_deductions INT NOT NULL,
  net_amount INT NOT NULL
);

CREATE TABLE BillBeneficiaries (
  bill_beneficiary_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bill_pk INT REFERENCES Bills(bill_pk) NOT NULL,
  employee_id INT REFERENCES Employees(employee_id) NOT NULL,
  amount INT NOT NULL
);

CREATE TABLE billFiles (
  id serial PRIMARY KEY,
  bill_fk INT REFERENCES Bills(bill_pk) NOT NULL,
  file_name varchar(100) NOT NULL,
  file_path varchar(100) NOT NULL
)

INSERT INTO Departments (department_name) VALUES
  ('POLICE'),
  ('FINANCE'),
  ('EDUCATION'),
  ('TRANSPORTATION'),
  ('DEFENSE');

INSERT INTO Employees (employee_department_id, employee_details_id, employee_designation, scale_type)
VALUES
  (1, 1, 'Officer', 'A'),
  (2, 2, 'Accountant', 'B'),
  (3, 3, 'Teacher', 'C'),
  (4, 4, 'Driver', 'D'),
  (5, 5, 'Soldier', 'E'),
  (1, 6, 'Inspector', 'B'),
  (3, 7, 'Principal', 'A'),
  (2, 8, 'Analyst', 'C'),
  (4, 9, 'Driver', 'D'),
  (5, 10, 'Sergeant', 'E'),
  (3, 11, 'Teacher', 'C'),
  (2, 12, 'Accountant', 'B'),
  (4, 13, 'Driver', 'D'),
  (1, 14, 'Officer', 'A'),
  (5, 15, 'Private', 'E'),
  (1, 16, 'Inspector', 'B'),
  (3, 17, 'Teacher', 'C'),
  (2, 18, 'Analyst', 'C'),
  (4, 19, 'Driver', 'D'),
  (5, 20, 'Lieutenant', 'E');


ALTER TABLE Employees
ADD COLUMN cader VARCHAR(20);

ALTER TABLE employees
ADD COLUMN emp_BankDetails_id INT REFERENCES EmployeeBankDetails(emp_BankDetails_id);

ALTER TABLE bills
ADD COLUMN bill_upload_file VARCHAR(255);

ALTER TABLE bills
ADD COLUMN bill_pdf VARCHAR(255);

UPDATE Employees
SET cader = CASE WHEN random() < 0.5 THEN 'gazetted' ELSE 'non-gazetted' END
WHERE employee_id IN (SELECT employee_id FROM Employees ORDER BY random() LIMIT 20);

DO $$
DECLARE
    emp_id INT;
    bank_details_id INT;
BEGIN
    FOR emp_id IN 1..20 LOOP
        bank_details_id := emp_id;
        UPDATE Employees
        SET emp_BankDetails_id = bank_details_id
        WHERE employee_id = emp_id;
    END LOOP;
END $$;


CREATE TABLE EarnDeds (
  earndeds_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  earndeds_employee_id INT NOT NULL,
  earndeds_type VARCHAR(10) NOT NULL CHECK (earndeds_type IN ('Earning', 'Deduction')),
  earndeds_category_id INT NOT NULL REFERENCES EarnDedsCategories(earndeds_category_id),
  amount INT NOT NULL CHECK (amount >= 0),
  FOREIGN KEY (earndeds_employee_id) REFERENCES Employees(employee_id)
);



INSERT INTO EarnDedsCategories (category,earndeds_category_name) VALUES
  ('Earning','Basic Pay'),
  ('Earning','HRA'),
  ('Earning','DA'),
  ('Earning','Bonuses'),
  ('Deduction','Income Tax'),
  ('Deduction','Insurance'),
  ('Deduction','Loan'),
  ('Deduction','Pension'),
  ('Deduction','Transportation');



INSERT INTO EarnDeds (earndeds_employee_id, earndeds_type, earndeds_category_id, amount)
VALUES
  (1, 'Earning', 1, 60000),  -- Basic Pay
  (2, 'Earning', 1, 45000),  -- Basic Pay
  (3, 'Earning', 1, 55000),  -- Basic Pay
  (4, 'Earning', 1, 35000),  -- Basic Pay
  (5, 'Earning', 1, 40000),  -- Basic Pay
  (6, 'Earning', 1, 48000),  -- Basic Pay
  (7, 'Earning', 1, 65000),  -- Basic Pay
  (8, 'Earning', 1, 52000),  -- Basic Pay
  (9, 'Earning', 1, 32000),  -- Basic Pay
  (10, 'Earning', 1, 38000), -- Basic Pay
  (11, 'Earning', 1, 54000), -- Basic Pay
  (12, 'Earning', 1, 46000), -- Basic Pay
  (13, 'Earning', 1, 34000), -- Basic Pay
  (14, 'Earning', 1, 58000), -- Basic Pay
  (15, 'Earning', 1, 42000), -- Basic Pay
  (16, 'Earning', 1, 49000), -- Basic Pay
  (17, 'Earning', 1, 56000), -- Basic Pay
  (18, 'Earning', 1, 51000), -- Basic Pay
  (19, 'Earning', 1, 33000), -- Basic Pay
  (20, 'Earning', 1, 39000), -- Basic Pay
  (1, 'Earning', 2, 15000),
  (2, 'Earning', 2, 12000),
  (3, 'Earning', 2, 13000),
  (4, 'Earning', 2, 10000),
  (5, 'Earning', 2, 11000),
  (6, 'Earning', 2, 13000),
  (7, 'Earning', 2, 16000),
  (8, 'Earning', 2, 14000),
  (9, 'Earning', 2, 9000),
  (10, 'Earning', 2, 10000),
  (11, 'Earning', 2, 14000),
  (12, 'Earning', 2, 12000),
  (13, 'Earning', 2, 8000),
  (14, 'Earning', 2, 17000),
  (15, 'Earning', 2, 11000),
  (16, 'Earning', 2, 13000),
  (17, 'Earning', 2, 15000),
  (18, 'Earning', 2, 14000),
  (19, 'Earning', 2, 7000),
  (20, 'Earning', 2, 9000),
  (1, 'Earning', 3, 8000),
  (2, 'Earning', 3, 6000),
  (3, 'Earning', 3, 7000),
  (4, 'Earning', 3, 5000),
  (5, 'Earning', 3, 5500),
  (6, 'Earning', 3, 6500),
  (7, 'Earning', 3, 8500),
  (8, 'Earning', 3, 6000),
  (9, 'Earning', 3, 4000),
  (10, 'Earning', 3, 4500),
  (11, 'Earning', 3, 6000),
  (12, 'Earning', 3, 5000),
  (13, 'Earning', 3, 3500),
  (14, 'Earning', 3, 7500),
  (15, 'Earning', 3, 5500),
  (16, 'Earning', 3, 6500),
  (17, 'Earning', 3, 7000),
  (18, 'Earning', 3, 6000),
  (19, 'Earning', 3, 3000),
  (20, 'Earning', 3, 4000),
  (1, 'Deduction', 5, 8000),   -- Income Tax
  (2, 'Deduction', 5, 6000),   -- Income Tax
  (3, 'Deduction', 5, 7000),   -- Income Tax
  (4, 'Deduction', 5, 5000),   -- Income Tax
  (5, 'Deduction', 5, 5500),   -- Income Tax
  (6, 'Deduction', 5, 6500),   -- Income Tax
  (7, 'Deduction', 5, 8500),   -- Income Tax
  (8, 'Deduction', 5, 6000),   -- Income Tax
  (9, 'Deduction', 5, 4000),   -- Income Tax
  (10, 'Deduction', 5, 4500),  -- Income Tax
  (11, 'Deduction', 5, 6000),  -- Income Tax
  (12, 'Deduction', 5, 5000),  -- Income Tax
  (13, 'Deduction', 5, 3500),  -- Income Tax
  (14, 'Deduction', 5, 7500),  -- Income Tax
  (15, 'Deduction', 5, 5500),  -- Income Tax
  (16, 'Deduction', 5, 6500),  -- Income Tax
  (17, 'Deduction', 5, 7000),  -- Income Tax
  (18, 'Deduction', 5, 6000),  -- Income Tax
  (19, 'Deduction', 5, 3000),  -- Income Tax
  (20, 'Deduction', 5, 4000),  -- Income Tax
  (1, 'Deduction', 6, 1000),
  (2, 'Deduction', 6, 800),
  (3, 'Deduction', 6, 900),
  (4, 'Deduction', 6, 700),
  (5, 'Deduction', 6, 750),
  (6, 'Deduction', 6, 850),
  (7, 'Deduction', 6, 1100),
  (8, 'Deduction', 6, 900),
  (9, 'Deduction', 6, 600),
  (10, 'Deduction', 6, 650),
  (11, 'Deduction', 6, 900),
  (12, 'Deduction', 6, 800),
  (13, 'Deduction', 6, 550),
  (14, 'Deduction', 6, 950),
  (15, 'Deduction', 6, 750),
  (16, 'Deduction', 6, 850),
  (17, 'Deduction', 6, 900),
  (18, 'Deduction', 6, 800),
  (19, 'Deduction', 6, 500),
  (20, 'Deduction', 6, 600),
  (1, 'Deduction', 7, 2000),
  (2, 'Deduction', 7, 1500),
  (3, 'Deduction', 7, 1800),
  (4, 'Deduction', 7, 1200),
  (5, 'Deduction', 7, 1400),
  (6, 'Deduction', 7, 1600),
  (7, 'Deduction', 7, 2200),
  (8, 'Deduction', 7, 1800),
  (9, 'Deduction', 7, 1000),
  (10, 'Deduction', 7, 1100),
  (11, 'Deduction', 7, 1800),
  (12, 'Deduction', 7, 1500),
  (13, 'Deduction', 7, 900),
  (14, 'Deduction', 7, 2000),
  (15, 'Deduction', 7, 1400),
  (16, 'Deduction', 7, 1600),
  (17, 'Deduction', 7, 1800),
  (18, 'Deduction', 7, 1500),
  (19, 'Deduction', 7, 800),
  (20, 'Deduction', 7, 1000),
  (1, 'Deduction', 8, 3000),
  (2, 'Deduction', 8, 2500),
  (3, 'Deduction', 8, 2800),
  (4, 'Deduction', 8, 2200),
  (5, 'Deduction', 8, 2400),
  (6, 'Deduction', 8, 2600),
  (7, 'Deduction', 8, 3200),
  (8, 'Deduction', 8, 2800),
  (9, 'Deduction', 8, 2000),
  (10, 'Deduction', 8, 2100),
  (11, 'Deduction', 8, 2800),
  (12, 'Deduction', 8, 2500),
  (13, 'Deduction', 8, 1800),
  (14, 'Deduction', 8, 3000),
  (15, 'Deduction', 8, 2400),
  (16, 'Deduction', 8, 2600),
  (17, 'Deduction', 8, 2800),
  (18, 'Deduction', 8, 2500),
  (19, 'Deduction', 8, 1600),
  (20, 'Deduction', 8, 2000);

INSERT INTO BankIFSCCodes (ifsc_code, bank_branch) VALUES
  ('SBIN0000123', 'Mumbai Main Branch'),
  ('HDFC0004567', 'Delhi Rajouri Garden Branch'),
  ('ICIC0007890', 'Bangalore MG Road Branch'),
  ('PNB0012345', 'Kolkata Park Street Branch'),
  ('AXIS0005678', 'Chennai T Nagar Branch'),
  ('BOI0023456', 'Pune Camp Branch'),
  ('IDBI0008901', 'Hyderabad Jubilee Hills Branch'),
  ('CBI0034567', 'Ahmedabad Navrangpura Branch'),
  ('UBIN0090123', 'Jaipur C Scheme Branch'),
  ('KOTAK0078901', 'Gurgaon Sector 14 Branch');

INSERT INTO EmployeeBankDetails (bank_AC_No, bank_ifsc, amount_to_be_payed) VALUES
  ('123456789012', 1, 50000),
  ('987654321012', 2, 45000),
  ('345678901234', 3, 55000),
  ('876543210123', 4, 48000),
  ('234567890123', 5, 52000),
  ('654321098765', 6, 51000),
  ('789012345678', 7, 47000),
  ('543210987654', 8, 49000),
  ('890123456789', 9, 60000),
  ('432109876543', 10, 47000),
  ('678901234567', 1, 58000),
  ('210987654321', 2, 52000),
  ('876543210987', 3, 54000),
  ('543210987654', 4, 46000),
  ('234567890123', 5, 57000),
  ('987654321012', 6, 53000),
  ('123456789012', 7, 49000),
  ('654321098765', 8, 51000),
  ('345678901234', 9, 62000),
  ('890123456789', 10, 48000);

