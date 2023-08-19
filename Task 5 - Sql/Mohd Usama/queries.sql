-- SHOW ALL THE DEPARTMENTS AND THEIR TOTAL EXPENDITURE FOR A YEAR

SELECT D.department_id, D.department_name, SUM(ER.amount) AS total_expenditure, COUNT(DISTINCT E.employee_id) AS total_employees
FROM Departments D
JOIN Employees E ON D.department_id = E.employee_department_id
JOIN Earnings ER ON E.employee_id = ER.earning_employee_id
WHERE ER.earning_year = 2023
GROUP BY D.department_id, D.department_name;

-- SHOW ALL THE DEPARTMENTS AND THEIR TOTAL EARNING AND DEDUCTIONS WITH THE NET AND GROSS EARNINGS OF THEIR EMPLOYEES FOR A YEAR

SELECT D.department_id, D.department_name, SUM(ER.amount) AS total_earnings,
       SUM(Ded.amount) AS total_deductions,
       SUM(ER.amount - COALESCE(Ded.amount, 0)) AS net_earnings,
       SUM(ER.amount - COALESCE(Ded.amount, 0)) - SUM(Ded.amount) AS gross_earnings
FROM Departments D
JOIN Employees E ON D.department_id = E.employee_department_id
JOIN Earnings ER ON E.employee_id = ER.earning_employee_id
LEFT JOIN (
    SELECT deduction_employee_id, deduction_month, deduction_year, SUM(amount) AS amount
    FROM Deductions
    GROUP BY deduction_employee_id, deduction_month, deduction_year
) AS Ded ON E.employee_id = Ded.deduction_employee_id
          AND ER.earning_month = Ded.deduction_month
          AND ER.earning_year = Ded.deduction_year
WHERE ER.earning_year = 2023
GROUP BY D.department_id, D.department_name;

-- GENERATE BILLS FOR DEPARTMENTS BASED ON THE DIFFERENT EARNINGS OF THE EMPLOYEES

SELECT ROW_NUMBER() OVER () AS bill_id,
       D.department_id,
       D.department_name,
       ET.earning_type_name,
       SUM(ER.amount) AS total_earnings,
       COUNT(DISTINCT E.employee_id) AS num_employees
FROM Departments D
JOIN Employees E ON D.department_id = E.employee_department_id
JOIN Earnings ER ON E.employee_id = ER.earning_employee_id
JOIN EarningTypes ET ON ER.earning_type_id = ET.earning_type_id
WHERE ER.earning_month = 7
GROUP BY D.department_id, D.department_name, ET.earning_type_name;

-- SHOW INFORMATION ABOUT ALL EMPLOYEES, INCLUDING DETAILS ABOUT THE DEPT, TYPE OF EARNING FOR A SPECIFIC MONTH AND YEAR

SELECT E.employee_id, E.employee_name, D.department_name, ET.earning_type_name,
       ER.earning_month, ER.earning_year, ER.amount
FROM Employees E
JOIN Departments D ON E.employee_department_id = D.department_id
JOIN Earnings ER ON E.employee_id = ER.earning_employee_id
JOIN EarningTypes ET ON ER.earning_type_id = ET.earning_type_id
WHERE ER.earning_month = 7 AND ER.earning_year = 2023;

-- SHOW INFORMATION ABOUT ALL EMPLOYEES AND THEIR EARNING IN A RANGE MONTHS AND FOR A YEAR

SELECT E.employee_id, E.employee_name, SUM(ER.amount) AS employee_earnings_in_range_of_months
FROM Employees E
JOIN Earnings ER ON E.employee_id = ER.earning_employee_id
WHERE (ER.earning_year = 2023 AND ER.earning_month >= 7 AND ER.earning_month <= 8)
GROUP BY E.employee_id, E.employee_name;

-- SHOW TOTAL EXPENDITURE OF A DEPARTMENT FOR A MONTH

SELECT D.department_id, D.department_name, SUM(Ear.amount) AS total_expenditure_for_1_month
FROM Departments D
JOIN Employees E ON D.department_id = E.employee_department_id
JOIN Earnings Ear ON E.employee_id = Ear.earning_employee_id
WHERE Ear.earning_month = 7 AND Ear.earning_year = 2023 AND D.department_name = 'Sales'
GROUP BY D.department_id, D.department_name;

-- SHOW TOTAL EXPENDITURE OF A DEPARTMENT FOR A RANGE OF MONTHS IN A YEAR

SELECT D.department_id, D.department_name, SUM(Ear.amount) AS total_expenditure_for_range_of_months
FROM Departments D
JOIN Employees E ON D.department_id = E.employee_department_id
JOIN Earnings Ear ON E.employee_id = Ear.earning_employee_id
WHERE (Ear.earning_month >= 7 AND Ear.earning_month <= 8 )AND Ear.earning_year = 2023 AND D.department_name = 'Sales'
GROUP BY D.department_id, D.department_name;
