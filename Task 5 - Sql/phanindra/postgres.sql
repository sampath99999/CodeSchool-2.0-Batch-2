-- Active: 1692015476216@@127.0.0.1@5433@emsdb

CREATE TABLE Roles(
    roleID INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    roleName VARCHAR(50),
    PRIMARY KEY(roleID)
); 


INSERT INTO Roles(roleName)
VALUES 
('Human Resource Manager'),
('SR.Software Engineer'),
('Project Manager'),
('JR.Software Engineer'),
('Team Lead'),
('Desktop Engineer'),
('CTO'),
('Operations Manager'),
('Test Engineer'),
('Test Lead'),
('Business Analyst'),
('SR.Devops Engineer'),
('Marketing Analyst'),
('AVP'),
('Data Analyst'),
('softWare Developer')

SELECT * from Roles; 

CREATE TABLE Employees(
    employeeID INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    contactNumber VARCHAR(20) NOT NULL UNIQUE,
    gender VARCHAR(2),
    benchStatus BOOLEAN,
    roleID INT REFERENCES Roles(roleID),
    PRIMARY KEY(employeeID)
);
 
INSERT INTO Employees(firstname,lastname,email,contactNumber,gender,benchStatus,roleID)
VALUES
('Akhil','Kumar','Akhilkumar@gmail.com','9666141407','M',false,1),
('deepak','singh','deepkasingh@gmail.com','9848516786','M',false,2),
('susheel','nayak','susheelnayak@gmail.com','9848556786','M',false,3),
('swaroopa','kumari','swaroopakumari@gmail.com','9885467156','F',true,4),
('Nikhil','kumar','nikhilkumar@gmail.com','9848665528','M',false,5),
('sai','kumar','saikumar@gmail.com','9848596886','M',true,6),
('koti','swamy','kotiswamy@gmail.com','9848526786','M',false,7),
('sakshi','singh','sakshisingh@gmail.com','9774586157','F',false,8),
('chitra','chilkuri','chitrachilkuri@gmail.com','9668745896','F',true,9),
('naveen','kumar','naveenkumar@gmail.com','9556678486','M',false,10),
('abrar','mohammad','abrarmohammad@gmail.com','9441572261','M',true,11),
('usha','uppari','ushauppari@gmail.com','9666851689','F',false,12),
('vamshi','yadav','vamshiyadav@gmail.com','9848416786','M',false,13),
('akhila','reddy','akhilareddy@gmail.com','9848547994','F',false,14),
('suresh','rao','sureshrao@gmail.com','9568438589','M',true,15),
('vishnu','teja','vishnuteja@gmail.com','9666154879','M',false,16);

SELECT * FROM Employees;


CREATE TABLE Projects(
    projectID INT GENERATED ALWAYS AS IDENTITY NOT NULL ,
    employeeID INT REFERENCES employees(employeeID),
    projectName VARCHAR(100),
    startDate DATE,
    endDate DATE,
    completionDate DATE,
    PRIMARY KEY(projectID)
); 



INSERT INTO projects(employeeID,projectName,startDate,endDate,completionDate)
VALUES 
(1,'Customer Relationship Management (CRM) Software','2023-05-01','2023-08-01','2023-09-05'), 
(2,'Chatbot Development for Customer Support','2023-02-03','2023-05-03','2023-05-01'), --overdue
(3,'E-Commerce Website','2023-05-01','2023-08-01','2023-07-25'), 
(2,'Fitness Tracking App Enhancement','2023-01-04','2023-07-25','2023-08-01'), 
(5,'IFMIS','2023-02-02','2023-07-15','2023-08-01'),
(12,'Smart Meters Software','2023-06-01','2023-08-15','2023-08-12'),---overdue
(7,'E-Learning Platform Software','2023-03-22','2023-08-11','2023-08-05'),
(7,'Learning Management System (LMS)','2023-03-22','2023-08-11','2023-08-05'),
(8,'E-Commerce Website','2023-04-20','2023-07-08','2023-07-05'),--overdue
(10,'Mobile Game Develpoment System','2023-05-20','2023-07-28','2023-08-10'),
(5,'Online food delivery Software','2023-01-01','2023-05-18','2023-06-15'),--overdue
(12,'Employee Time Tracking System','2023-06-20','2023-08-06','2023-08-01'),
(8,'Social Media Analytics Dashboard','2023-03-10','2023-07-22','2023-08-20'), --overdue
(14,'Project Management Tool Redesign','2023-02-09','2023-05-27','2023-05-22'),
(13,'Project Management Tool Redesign','2023-02-09','2023-05-27','2023-05-22'),
(16,'Healthcare Appointment Booking App','2023-05-25','2023-07-01','23-08-01')--overdue


SELECT * FROM Projects;

CREATE TABLE Attendance(
    AttendanceID INT GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    EmployeeID INT REFERENCES Employees(employeeID),
    loginDateTime TIMESTAMP,
    logoutDateTime TIMESTAMP,
    PRIMARY KEY(AttendanceID)
);

INSERT INTO Attendance(EmployeeID,loginDateTime,logoutDateTime)
VALUES
(1,'2023-08-16 08:48:00','2023-08-16 18:00:00'),
(2,'2023-08-15 09:39:00','2023-08-15 18:15:00'),
(2,'2023-08-05 09:15:00','2023-08-05 18:30:00'),
(4,'2023-08-18 18:55:00','2023-08-18 19:00:00'),
(8,'2023-08-07 09:45:00','2023-08-07 18:45:00'),
(6,'2023-08-14 08:59:00','2023-08-14 18:30:00'),
(7,'2023-08-01 08:44:00','2023-08-01 17:00:00'),
(8,'2023-08-12 09:05:00','2023-08-12 18:00:00'),
(9,'2023-08-18 09:25:00','2023-08-18 19:25:00'),
(10,'2023-08-10 08:57:00','2023-08-10 18:00:00'),
(11,'2023-08-02 09:15:00','2023-08-02 18:00:00'),
(14,'2023-08-17 09:59:00','2023-08-17 18:30:00'),
(12,'2023-08-09 09:10:00','2023-08-09 18:25:00'),
(14,'2023-08-17 08:37:00','2023-08-22 17:25:00'),
(12,'2023-08-11 09:33:00','2023-08-11 18:48:00'),
(16,'2023-08-12 09:52:00','2023-08-12 19:16:00');

SELECT * FROM Attendance;


CREATE TABLE Salaries(
    salaryID INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    employeeID INT REFERENCES Employees(employeeID),
    amount DECIMAL(10,2),
    month INT,
    year INT,
    PRIMARY KEY(salaryID)  
); 

INSERT INTO Salaries(employeeID,amount,month,year)
VALUES
(1,60000.00,8,2023),
(2,80000.00,8,2023),
(3,75000.00,8,2023),
(4,30000.00,8,2023),
(5,70000.00,8,2023),
(6,150000.00,8,2023),
(7,80000.00,8,2023),
(8,42000.00,8,2023),
(9,65000.00,8,2023),
(10,49000.00,8,2023),
(11,71000.00,8,2023),
(12,66000.00,8,2023),
(13,74000.00,8,2023),
(14,40000.00,8,2023),
(15,50000.00,8,2023),
(16,60000.00,8,2023); 

SELECT * FROM salaries;

CREATE TABLE EmployeeProjects(
    employeeProjectID INT GENERATED ALWAYS AS IDENTITY NOT NULL,
    employeeID INT REFERENCES Employees(employeeID),
    projectID INT REFERENCES Projects(projectID),
    PRIMARY KEY(employeeProjectID)
);




INSERT INTO EmployeeProjects(employeeID,projectID)
VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5),
(6,6),
(7,7),
(8,8),
(9,9),
(10,10),
(11,11),
(12,12),
(13,13),
(14,14),
(15,15),
(16,16);

SELECT * FROM Employeeprojects;




--Highest 3 salaries
SELECT e.firstname,e.lastname,s.amount as salary
FROM Employees e INNER JOIN Salaries s
ON e.employeeid = s.employeeid
ORDER BY amount DESC
LIMIT 3;


--Late loggins b/w two dates
SELECT e.FirstName, e.LastName, a.loginDateTime
FROM Employees e INNER JOIN Attendance a 
ON e.EmployeeID = a.EmployeeID
WHERE a.loginDateTime BETWEEN '2023-08-01 00:00:00' AND '2023-08-18 23:59:59'
AND EXTRACT(HOUR FROM a.loginDateTime) > 9; 



--Total count of no.of projects of each Employee
SELECT e.firstname,e.lastname,count(projectid) as projectsCount
FROM Employees e INNER JOIN Projects p
ON e.employeeID = p.employeeID 
GROUP BY e.employeeID;


--Query to get the name,email,contactnumber,salary,no of projects he is working on and No of late loggins he has b/w given dates
SELECT e.firstname, e.lastname,e.email,e.contactnumber,s.amount as salary,
COUNT(ep.projectid) as numberOfProjects,
COUNT(CASE WHEN a.logindatetime>='2023-08-01' AND a.logindatetime<='2023-08-18' AND EXTRACT(HOUR FROM a.loginDateTime)>=9 THEN 1 ELSE NULL END) AS numberOfLateLogins
FROM Employees e LEFT JOIN Salaries s
ON  e.employeeID = s.employeeid
LEFT JOIN attendance a 
ON a.employeeID = s.employeeID
LEFT JOIN employeeprojects ep 
ON ep.employeeID = a.employeeID
GROUP BY  e.firstname,e.lastname,e.email,e.contactnumber,s.amount ; 



--Query to get the employees with projectname in ASC on the basis of name and projectname
SELECT 
e.firstname,p.projectname
FROM Employees e 
INNER JOIN  EmployeeProjects ep 
ON e.employeeID = ep.employeeID 
INNER JOIN Projects p
ON p.projectID=ep.projectID
ORDER BY p.projectname ASC,e.firstname ASC;


--Query to get the attendance of the given date employee name and login logout with 12 hrs format
SELECT 
e.firstname,
e.lastname,
TO_CHAR(a.logindatetime,'YYYY-MM-DD hh:MI:SS AM') AS loginTime,
TO_CHAR(a.logindatetime,'YYYY-MM-DD hh:MI:SS PM') AS logoutTime
FROM Employees e INNER JOIN Attendance a
ON e.employeeID = a.employeeID 
WHERE a.logindatetime>='2023-08-01' AND a.logindatetime<='2023-08-02'


--Query to get the highest paid emp who’s having lowest attendance for a current month
SELECT e.firstname,e.lastname,s.amount as salary,count(a.attendanceid)as attendanceCount
FROM Employees e LEFT JOIN Salaries S
ON e.employeeid =s.employeeid
LEFT JOIN Attendance a 
ON a.employeeID =s.employeeID 
WHERE EXTRACT(MONTH FROM a.logindatetime) = EXTRACT(MONTH FROM CURRENT_DATE)
GROUP BY e.EmployeeID, e.firstName, e.lastName, s.amount
ORDER BY s.amount DESC,attendanceCount DESC
LIMIT 1;






