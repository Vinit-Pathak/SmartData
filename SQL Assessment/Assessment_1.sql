CREATE DATABASE Assessment1;

USE Assessment1;

--Q[1]
--ANS

-- Create Patient table
CREATE TABLE Patient (
    PatientID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    DateOfBirth DATE NOT NULL,
    Age INT NOT NULL,
    Gender CHAR(1),
    ContactNumber VARCHAR(15)
);

-- Insert sample data into Patient table
INSERT INTO Patient (FirstName, LastName, DateOfBirth, Age, Gender, ContactNumber)
VALUES 
('Rahul', 'Shende', '1985-05-15', 39, 'M', '1234567890'),
('Priya', 'Patil', '1990-07-20', 34, 'F', '0987654321'),
('Riya', 'Jaiswal', '1975-03-10', 49, 'F', '5551234567'),
('Bavesh', 'Mathur', '1980-12-25', 43, 'M', '4449876543');


-- Create Practitioner table
CREATE TABLE Practitioner (
    PractitionerID INT PRIMARY KEY IDENTITY(1,1),
    FirstName VARCHAR(20) NOT NULL,
    LastName VARCHAR(20) NOT NULL,
    Specialty VARCHAR(50) NOT NULL,
    ContactNumber VARCHAR(15),
    Email VARCHAR(30)
);

-- Insert sample data into Practitioner table
INSERT INTO Practitioner (FirstName, LastName, Specialty, ContactNumber, Email)
VALUES 
('Sanjay', 'Sharma', 'Cardiology', '2223334444', 'suraj.sharma@gmail.com'),
('Manoj', 'Pandey', 'Neurology', '3334445555', 'manoj.pandey@gmail.com'),
('Saurabh', 'Thakur', 'Pediatrics', '4445556666', 'saurabh.thakur@gmail.com'),
('Suraj', 'Raut', 'Orthopedics', '5556667777', 'suraj.raut@gmail.com');


-- Create Appointment table
CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY IDENTITY(1,1),
    PatientID INT NOT NULL,
    PractitionerID INT NOT NULL,
    AppointmentDate DATETIME NOT NULL,
    Reason VARCHAR(255),

	/*below line represent to prevent that one patient cannot have more than 
	one appointment with the same practitioner at the same date and time*/
	UNIQUE (PatientID, PractitionerID, AppointmentDate), 

    CONSTRAINT FK_Patient FOREIGN KEY (PatientID) REFERENCES Patient(PatientID),  --Foreign key to Patient table 
    CONSTRAINT FK_Practitioner FOREIGN KEY (PractitionerID) REFERENCES Practitioner(PractitionerID)   --Foreign key to Practitioner table
);

-- Insert sample data into Appointment table
INSERT INTO Appointment (PatientID, PractitionerID, AppointmentDate, Reason)
VALUES 
(3, 1, '2024-09-15 10:00:00', 'Routine Checkup'),
(2, 2, '2024-09-16 11:30:00', 'Headache'),
(1, 3, '2024-09-17 09:00:00', 'Child Vaccination'),
(4, 4, '2024-09-18 14:00:00', 'Knee Pain');


-- Retrieve Data from table
SELECT * 
FROM   Patient
SELECT * 
FROM   Practitioner
SELECT * 
FROM   Appointment


-------------------------------------------------------------------------------------------------------------


--Create Product1 table
CREATE TABLE Product1 (
    ProductID INT PRIMARY KEY IDENTITY(1,1),
    ProductName VARCHAR(100),
    Category VARCHAR(100),
    Price DECIMAL(10, 2),
    ManufactureDate DATE,
    ExpiryDate DATE
);


--Inserting data into Product1 table
INSERT INTO Product1 (ProductName, Category, Price, ManufactureDate, ExpiryDate)
VALUES 
('Milk', 'Dairy', 1.50, '2024-01-15', '2024-04-15')
,('Bread', 'Bakery', 2.00, '2024-02-01', '2024-02-15')
,('Orange Juice', 'Beverages', 3.00, '2024-01-20', '2024-06-20')
,('Cereal', 'Groceries', 4.50, '2023-12-01', '2024-12-01')
,('Yogurt', 'Dairy', 2.75, '2024-01-10', '2024-03-10')
,('Apple', 'Fruits', 1.20, '2024-01-25', '2024-02-25')
,('Chicken Breast', 'Meat', 5.00, '2024-02-10', '2024-03-10')
,('Pasta', 'Groceries', 3.20, '2023-11-20', '2024-11-20')
,('Olive Oil', 'Condiments', 7.50, '2023-10-15', '2025-10-15')
,('Coffee', 'Beverages', 6.00, '2023-09-01', '2024-09-01')
,('Tomato', 'Vegetables', 3.50, '2024-09-13', '2024-10-20')


--Q[2]:  Retrieve details of products that belong to the 'Dairy' category.
--ANS:
SELECT *
FROM   Product1
WHERE  Category = 'Dairy'


--Q[3]:  Find all products that are not in the 'Beverages' category.
--ANS:
SELECT *
FROM   Product1
WHERE  Category <> 'Beverages'


--Q[4]:  List products that have a price greater than 3.00.
--ANS:
SELECT *
FROM   Product1
WHERE  Price > 3.00


--Q[5]:  Retrieve products that have a price less than 2.00.
--ANS:
SELECT *
FROM   Product1
WHERE  Price < 2.00


--Q[6]:  Find products that were manufactured on or after '2024-01-01'.
--ANS:
SELECT *
FROM   Product1
WHERE  ManufactureDate >= '2024-01-01'


--Q[7]:  Get the list of products that have an expiry date on or before '2024-06-01'.
--ANS:
SELECT *
FROM   Product1
WHERE  ExpiryDate <= '2024-06-01'


--Q[8]:  Retrieve products whose price is not less than 4.00.
--ANS:
SELECT *
FROM   Product1
WHERE  Price !> 4.00


--Q[9]:  Find products whose price is not greater than 2.50.
--ANS:
SELECT *
FROM   Product1
WHERE  Price !< 2.50


--Q[10]: List products that belong to the 'Groceries' category and have a price greater than 3.00
--ANS:
SELECT *
FROM   Product1
WHERE  Category = 'Groceries' AND Price > 3.00


--Q[11]: Find products that are either in the 'Dairy' category or have a price less than 2.00.
--ANS:
SELECT *
FROM Product1
WHERE Category = 'Dairy' OR Price < 2.00;


--Q[12]: Retrieve products that are not 'Bread'.
--ANS:
SELECT *
FROM   Product1
WHERE  ProductName <> 'Bread'


--Q[13]: Get products that have a price between 2.00 and 5.00 inclusive.
--ANS:
SELECT * 
FROM   Product1
WHERE  Price BETWEEN 2.00 AND 5.00


--Q[14]: Find products whose names start with the letter 'C'.
--ANS:
SELECT *
FROM   Product1
WHERE  ProductName LIKE 'C%'


--Q[15]: Retrieve products whose names contain the word 'Oil'.
--ANS:
SELECT *
FROM   Product1
WHERE  ProductName LIKE '%Oil%'


--Q[16]: Retrieve the current date and time from the SQL server.
--ANS:
DECLARE @Todaydate DATE,  
		@TodaydateTime DATETIME

SET @Todaydate     = GETDATE()
SET @TodaydateTime = GETDATE()

SELECT @Todaydate  as [Current Date] 
SELECT @TodaydateTime  as [Current DateTime] 


--Q[17]: List all products that were manufactured today.
--ANS: 
DECLARE @Today DATE
SET @Today = GETDATE()
SELECT *
FROM   Product1
WHERE  ManufactureDate = @Today 


--Q[18]: Give me list of product with Product Name (Orange Juice,Apple,Coffee).
--ANS:
SELECT *
FROM   Product1
WHERE  ProductName IN ('Orange Juice','Apple','Coffee')



