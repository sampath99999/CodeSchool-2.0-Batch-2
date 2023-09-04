-- -- Active: 1692251718046@@127.0.0.1@5432@hospital_management@public

CREATE TABLE hospitals(
id SERIAL PRIMARY KEY,
hospital_name VARCHAR(150) NOT NULL,
address VARCHAR(200) NOT NULL,
founded_year INT
);

CREATE TABLE doctors(
id SERIAL PRIMARY KEY,
doctor_name VARCHAR(150) NOT NULL,
specialization VARCHAR(200) NOT NULL,
hospital_id INT REFERENCES hospitals(id)
);

CREATE TABLE patients(
id SERIAL PRIMARY KEY,
patient_name VARCHAR(200) NOT NULL,
disease VARCHAR(200) NOT NULL,
hospital_id INT REFERENCES hospitals(id)
);

CREATE TABLE appointments(
id SERIAL PRIMARY KEY,
appointment_date TIMESTAMP NOT NULL,
doctor_consultation_fee INT,
patient_id INT REFERENCES patients(id),
doctor_id INT REFERENCES doctors(id),
hospital_id INT REFERENCES hospitals(id)
);

INSERT INTO hospitals(hospital_name,address,founded_year) VALUES ('Ozone Hospitals','Green Hills Kothapet',2013),('Landmark Hospital','Hyder Nagar Kukatpally',2012),('Shenoy Hospital','East Maredpally',1980),('Mark Multispeciality Hospital','Bandlaguda-jagir',2017),
('Madhava Multi Speciality Hospital','S D Road Secundrabad',1990),
('Care Hospitals','Hitech-City',1991),
('Sowmyashree MultiSpeciality Hospital','Venkatapuram',2000),
('Woodlands Hospital','Barkatpura',2019),
('Aparna Hospital','Serilingampally',2022),
('Oak Hospitals','Toli Chowki',2019),
('Kiran Hospital','Karmanghat',2017),
('Prasad Hospitals','Pragathi Nagar, Kukatpally',2022),
('Alavi Hospital','HMT Road Chintal',2016),
('Supraja Hospital','Nagole',2013),
('Apollo Spectra Hospitals','Kothaguda X Road Kondapur',2001),
('Sunbiz Hospital','Financial District,Nanakramguda',2009),
('Sunflower Multispeciality Hospital','JJ Nagar Neredmet',2005),
('Anaya Hospital','Narayanaguda',2004),
('Rainbow Childrens Hospital','Banjara Hills',1990),
('Yashoda Hospitals','Somajiguda',1970),
('Sunridge Multispeciality Hospital','Moti Nagar',2020),
('Germanten Hospitals','Attapur',2000);

INSERT INTO doctors(doctor_name,specialization,hospital_id) VALUES('Dr.Murali Yelchuri','General Physician',1),
('Dr.Ravikiran Abraham','Cardiologist',1),
('Dr.B Ramulu','Pediatrician',1),
('Dr.Usha Gaddam','Orthopedic surgeon',1),
('Dr.Prathima Chilkuri','Dermatologist',1),
('Dr.Sudhir Chalasani','Family Medicine',2),
('Dr.E Priyatham','General Physician',2),
('Dr.Lakshmi Godavarthy','Cardiologist',2),
('Dr.Srinivas Yadavalli','Opthamology',2),
('Dr.M.Chandrakanth Rao','Gastroenterology',2),
('Dr.Meka Satyanarayana','Urologist',3),
('Dr.S Ravindra Kumar','General Physician',3),
('Dr.C.Nithya','General Surgery',3),
('Dr.Mohammed Anfas','Pediatrician',3),
('Dr.Harshavardhan Singh','Neurologist',3),
('Dr.Kolkunda Vijaykumar','Urologist',4),
('Dr.Shaeq Mirza','General Physician',4),
('Dr.Jagdeesh Kumar','General Surgery',4),
('Dr.Shivani Payneni','Pediatrician',4),
('Dr.Indira Ramasahayam Reddy','Neurologist',4),
('Dr.Aashrita Mekala','Urologist',5),
('Dr.Sonal Jain','General Physician',5),
('Dr.S Bhattcharjee','General Surgery',5),
('Dr.Vasanth Kumar','Pediatrician',5),
('Dr.Harish Kadarala','Neurologist',5),
('Dr.Anish Anand Janareddy','Urologist',6),
('Dr.Manoj Kumar','General Physician',6),
('Dr.Jaganmani Sreekanth','General Surgery',6),
('Dr.P Ramu','Pediatrician',6),
('Dr.Srinivas Jakkinaboina','Neurologist',6),
('Dr.K Sandeep Reddy','Urologist',7),
('Dr.Naveen Reddy A','General Physician',7),
('Dr.Naveen Polavarapu','General Surgery',7),
('Dr.Mithil B Ghushe','Pediatrician',7),
('Dr.Samer Sen Popuri','Neurologist',7),
('Dr.Venkat Rao Abbineni','Pathology',8),
('Dr.Manish Dugar','Internal Medicine',8),
('Dr.Azhar Hussain Ansari','Urology',8),
('Dr.Srikar Krishna','Psychiartist',8),
('Dr.S Anant Kumar','General Surgery',8),
('Dr.Prabakhar Sastry','Pathology',9),
('Dr.Ganesh Yadala','General Physician',9),
('Dr.Subhash Chander','Urology',9),
('Dr.LaskhmiKanth Reddy','Psychiartist',9),
('Dr.Srinivas Chakravarthy','General Surgery',9),
('Dr.Dhananjaya K L','Surgeon',10),
('Dr.Surya Pavan Reddy','Dentist',10),
('Dr.L Sunandhini','Gynecologist',10),
('Dr.P Sampath','Psychiartist',10),
('Dr.Yakkala Suresh Babu','General Surgery',10),
('Dr.Ashok Vardhan K','Pediatrician',11),
('Dr.Naveen Kumar PothiReddy','Dentist',11),
('Dr.Pramati Reddy','Gynecologist',11),
('Dr.Ravikiran Barigala','Psychiartist',11),
('Dr.Ganesh Mathan','General Surgery',11),
('Dr.Gouraiah','Pediatrician',12),
('Dr.Somnath Rao','Dentist',12),
('Dr.Neelwati Soni','Gynecologist',12),
('Dr.Jayprakash Sai','Psychiartist',12),
('Dr.Trivikram','General Surgery',12),
('Dr.Rajib Paul','Pediatrician',13),
('Dr.Gowri Shankar Bouripalli','Dentist',13),
('Dr.Smitha Reddy','Gynecologist',13),
('Dr.Sowmya Bondalapati','Orthopedician',13),
('Dr.Gopinath Bandari','General Surgery',13),
('Dr.Krishna Mohan','Pediatrician',14),
('Dr.Rahul Gandhi Godisela','Dentist',14),
('Dr.Abhinandana','Gynecologist',14),
('Dr.M Srikanth Goud','Orthopedician',14),
('Dr.Vivel Belde','General Surgery',14),
('Dr.P Chandra Sekher','Pediatrician',15),
('Dr.Sameer Vankar','Dentist',15),
('Dr.Nilofer Ali','Gynecologist',15),
('Dr.Annam Sridhar','Orthopedician',15),
('Dr.Hemanth Kumar','General Surgery',15),
('Dr.Ajitha Gotimukul','Pediatrician',16),
('Dr.Sahiti Priya','Dentist',16),
('Dr.Salma Sultana','Gynecologist',16),
('Dr.Srinivas Aditya','Orthopedician',16),
('Dr.Haarika Yalvarhi','General Surgery',16),
('Dr.Srikar Reddy','Pediatrician',17),
('Dr.Kiran Macha','Dentist',17),
('Dr.Juveriya Fathima','Gynecologist',17),
('Dr.Markandeya Akurthi','Orthopedician',17),
('Dr.Mohd Ifthekar Mohiuddin','General Surgery',17),
('Dr.S Raghavender','Pediatrician',18),
('Dr.Ramanjaneyulu','Dentist',18),
('Dr.K Nagajyothi','Gynecologist',18),
('Dr.Swathi Prathipati','Orthopedician',18),
('Dr.Murali Mohan Reddy','General Surgery',18),
('Dr.Vandana Rao','Pediatrician',19),
('Dr.Fayezah Syed','General Physician',19),
('Dr.Hemalatha M Reddy','Gynecologist',19),
('Dr.Sujeeth Kumar B','Orthopedician',19),
('Dr.G V Rajgopal','General Surgery',19),
('Dr.Jukanti Nava Vikas','Pediatrician',20),
('Dr.Ranga Srikanth','General Physician',20),
('Dr.Susan Darla','Gynecologist',20),
('Dr.Pranav Ashwin Shah','Orthopedician',20),
('Dr.Mubasheer Syed','General Surgery',20),
('Dr.Rup Goswami','Dermatologist',21),
('Dr.Srinivasulu','General Physician',21),
('Dr.Nimmagadda Viraja','Gynecologist',21),
('Dr.Cymantha Bandameedi','Cardiology',21),
('Dr.Dolla Raja Rajesh','Neurology',21),
('Dr.Karthik Meruva','General Practicioner',22),
('Dr.Aravind Reddy','General Physician',22),
('Dr.Saniya Simran','Gynecologist',22),
('Dr.Ramya Puligari','General Surgeon',22),
('Dr.Mohammad Asif Ahmad','Gastroenterology',22);

INSERT INTO patients(patient_name,disease,hospital_id) VALUES('Gopu Shiva','Back Pain',1),
('Bhanu Prakash','Fever',1),
('Adnan','Cough',1),
('Mohammed Ali','Headache',1),
('Mohammad Younus','Body Pains',1),
('Ram Reddy','Kidney Pain',2),
('Trisha','Brain Tumer',2),
('Ashwin','Eye Infection',2),
('Mohammed Ibrahim','Diabetics',2),
('Rahul Rao','Pericarditius',2),
('Krish','Kidney Transplatation',3),
('Mohan Reddy','Cancer',3),
('Anant Reddy','Asthma',3),
('Raji Reddy','Diabetics',3),
('Rahul Reddy Yerneni','Fever',3),
('Janaki Reddy','Ashtma',4),
('Ramya Byraboina','Diabetics',4),
('Vishal Reddy','Dengue',4),
('Raj Rao','Malaria',4),
('Renu Reddy','MPox',4),
('Nainika Reddy','Diabetics',5),
('Mounika Bareddy','Fever',5),
('Akhil Patel','Dengue',5),
('Boda Parmesh','Malaria',5),
('Naveen Reddy','MPox',5),
('Manisha Ra0','Fever',6),
('Revanth Yerneni','Heart Stroke',6),
('Chandra','Dengue',6),
('Vamshi Kanth Reddy','Malaria',6),
('Yash Rangineni','MPox',6),
('Rana Reddy','Fever',7),
('Revanth Bollampalli','Typhoid',7),
('Chandrasekher Reddy','Dengue',7),
('Vamshi Krishna','Malaria',7),
('Rani devi','Kidney Cancer',7),
('Pandu Sharma','Liver Problem',8),
('Amara Adhya','Corona Virus',8),
('Pranav Sharma','Malaria',8),
('Rahul Ayyar','Typhoid',8),
('Pavagi','Brain Tumer',8),
('Chatur Sardar','Malaria',9),
('Aradhya','Corona Virus',9),
('Dasra Panja','Fever',9),
('Megh Latha','Mpox',9),
('Abhi Bhave','Food Infection',9),
('Sadhana Mahanti','Dengue',10),
('swamy','Corona Virus',10),
('Anusha Reddy','Fever',10),
('Hira Rajavadee','Stomach Pain',10),
('Vineeth Reddy','Food Infection',10),
('Ragoba Punja','Diabetics',11),
('Naidu','Fever',11),
('Pavani Reddy','Malaria',11),
('Haritha Soni','Stomach Pain',11),
('Vineeth Rao','Food Infection',11),
('Bhanu Reddy','Heart Stroke',12),
('Sai Krishna Reddy','Dengue',12),
('Nikhil Reddy','Typhoid',12),
('Mohammad Usama','Leg Pain',12),
('Sekher Reddy','Lukemia',12),
('Utkarsh B','Dengue',13),
('Mohammad Abrar','Malaria',13),
('Sai Nikhil','Diabetics',13),
('Mohammad Asif','Joints Pain',13),
('Priyanka Reddy','Lung Cancer',13),
('Sameer Mohammad','Typhoid',14),
('Mohammad Ansar','Diabetics',14),
('Sai Reddy','Malaria',14),
('Mohammad Asad','Stomach Pain',14),
('Anusha Sree Reddy','Kidney Stone',14),
('Shiva Reddy','Diabetcics',15),
('Mohammad Bari Ahmad','Cancer',15),
('Akhil Reddy Byraboina','Heart Stroke',15),
('Mohammad Ayaan','Food Infection',15),
('Ananya Reddy','Kidney Stone',15),
('Ganesh Reddy','Typhoid',16),
('Mohammad Ahmad Pasha','Kidney Stone',16),
('Naidu Swamy','Diabetics',16),
('Shaik Dawood','Lungs Infection',16),
('Anuhya Naidu','Kidney Swelling',16),
('Ram Mohan Reddy','Heart Stroke',17),
('Mohammad Amir','Diabetics',17),
('Bolla Malliah Naidu','Cancer',17),
('Anand Rao','Fever',17),
('Nagi Needu Reddy','Kidney Transplatation',17),
('Rajendra Reddy','Lung Cancer',18),
('Syed Sohail','Diabetics',18),
('Jaswant Reddy','Food Infection',18),
('Vijay Reddy','Dengue',18),
('Keerthi Reddy','Leptosporisis',18),
('Ram Naidu Yerraboina','Typhoid',19),
('Arjun Naidu','Cancer',19),
('Preethi Reddy','Leptosporisis',19),
('Kalyan Naidu','Malaria',20),
('Arun Reddy','Lung Cancer',20),
('Sekher Rao','Kidney Stone',20),
('Saikumar','Diabetics',21),
('Phani Naidu','Brain Tumer',21),
('Vishnu Reddy','Dengue',21),
('Naveen Saini','Cancer',22),
('Mohammad Awaiz','Lungs Infection',22),
('Saikiran Naidu','Fever',22);


INSERT INTO appointments(appointment_date,doctor_consultation_fee,patient_id,doctor_id,hospital_id) VALUES('2023-8-17 11:30:24',642,53,79,19),
('2023-8-29 12:40:20',603,81,16,13),
('2023-8-26 13:00:00',893,42,33,9),
('2023-8-13 10:00:00',535,80,63,15),
('2023-8-13 10:15:00',751,37,11,1),
('2023-8-1 10:30:00',656,101,94,10),
('2023-8-16 11:00:00',663,18,83,5),
('2023-8-12 12:30:40',624,25,40,17),
('2023-8-6 14:00:00',797,58,24,22),
('2023-8-11 14:20:00',864,54,94,19),
('2023-8-26 13:30:00',848,26,46,17),
('2023-8-14 14:30:00',811,74,109,9),
('2023-8-17 14:45:00',609,66,12,20),
('2023-8-14 15:00:00',933,89,7,5),
('2023-8-16 15:30:00',640,40,107,15),
('2023-8-18 15:45:00',873,36,41,2),
('2023-8-1 16:00:00',729,80,102,19),
('2023-8-26 16:35:00',959,35,45,15),
('2023-8-10 16:45:00',879,82,9,21),
('2023-8-13 17:00:00',761,5,98,3),
('2023-8-14 17:25:00',852,64,3,10),
('2023-8-11 17:45:00',725,32,68,6),
('2023-8-12 18:00:00',620,97,64,20),
('2023-8-20 18:30:00',805,18,36,17),
('2023-8-17 18:45:00',838,94,45,9),
('2023-8-23 19:00:00',685,28,48,10),
('2023-8-8 19:15:00',635,31,5,8),
('2023-8-9 19:30:00',845,60,95,12),
('2023-8-16 19:50:00',954,2,86,17),
('2023-8-7 20:15:00',823,91,80,22),
('2023-8-22 20:00:00',663,80,101,5),
('2023-8-17 20:45:00',702,85,102,8),
('2023-8-1 10:45:00',815,1,107,15),
('2023-8-19 11:50:00',576,21,110,19),
('2023-8-26 21:00:00',819,10,51,11),
('2023-8-18 16:00:00',835,74,85,12),
('2023-8-29 17:55:00',722,65,104,22),
('2023-8-28 14:35:00',711,8,39,19),
('2023-8-12 9:00:00',778,35,41,18),
('2023-8-5 10:20:00',555,36,48,18);

/*list of appointments*/

SELECT * FROM appointments;

/*list of hospitals */

SELECT * FROM hospitals;

/* list of doctors*/

SELECT * FROM doctors;

/* list of patients*/

SELECT * FROM patients;


/*Datewise Appointments Booked with hospital name*/

SELECT appointments.appointment_date,hospitals.hospital_name,COUNT(appointments.id) FROM appointments LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN hospitals ON appointments.hospital_id = hospitals.id GROUP BY appointments.appointment_date,hospitals.hospital_name ORDER BY appointments.appointment_date;

/* Datewise appointments booked with docotor name*/

SELECT appointments.appointment_date,hospitals.hospital_name,doctors.doctor_name,COUNT(appointments.id) FROM appointments LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN hospitals ON appointments.hospital_id = hospitals.id LEFT JOIN doctors ON appointments.doctor_id = doctors.id GROUP BY appointments.appointment_date,hospitals.hospital_name,doctors.doctor_name ORDER BY appointments.appointment_date;

/* datewise appointments and count of appointments in each hospital*/

SELECT DATE(appointments.appointment_date),hospitals.hospital_name,COUNT(appointments.appointment_date) FROM appointments LEFT JOIN hospitals ON appointments.hospital_id = hospitals.id GROUP BY appointments.appointment_date,hospitals.hospital_name ORDER BY DATE(appointments.appointment_date),hospitals.hospital_name;

/* Datewise appointments booked with hospital name and doctor name*/

SELECT DATE(appointments.appointment_date),hospitals.hospital_name,doctors.doctor_name,COUNT(appointments.appointment_date) AS appointments_count FROM appointments LEFT JOIN hospitals ON appointments.hospital_id = hospitals.id LEFT JOIN doctors ON appointments.doctor_id = doctors.id GROUP BY appointments.appointment_date,hospitals.hospital_name,doctors.doctor_name ORDER BY DATE(appointments.appointment_date),hospitals.hospital_name;


/* Appointment full details by patient_id with patient_name,doctor_name,hospital_name,Date,time*/

SELECT patients.patient_name,doctors.doctor_name,hospitals.hospital_name,DATE(appointments.appointment_date),CAST(appointments.appointment_date AS TIME) AS time FROM appointments LEFT JOIN patients ON appointments.patient_id = patients.id LEFT JOIN doctors ON appointments.doctor_id = doctors.id LEFT JOIN hospitals ON doctors.hospital_id = hospitals.id GROUP BY patients.patient_name,doctors.doctor_name,hospitals.hospital_name,DATE(appointments.appointment_date),CAST(appointments.appointment_date AS TIME) ORDER BY patients.patient_name;

/* how many patients vist hospital and how many absent status*/

SELECT status ,COUNT(status) FROM status GROUP BY status;


