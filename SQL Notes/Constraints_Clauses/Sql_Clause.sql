	-------------------------------
--  Clauses in SQL Server:
/*------------------------------
The SQL Server supports the following clauses

1] Where (Filtering the records in a table)
2] Order by clause (sorting the records in ascending or descending order)
3] Top n clause (Fetching top n records)
4] Group by clause (Grouping a set of rows)
5] Having Clause (Filtering the data like where clause) */



--Create Gender table
CREATE TABLE Gender
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Gender VARCHAR(50)
)
GO

--Create Department table
CREATE TABLE Department
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100)
)

drop table employee1
-- Create Employee table
CREATE TABLE Employee1
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100),
  EmailID VARCHAR(100),
  GenderID INT,
  DepartmentID INT,
  Salary INT,
  Age INT,
  CITY VARCHAR(100)
)
GO

select * from employee1
--Add the foreign key for GenderID Column
ALTER TABLE Employee1
ADD CONSTRAINT Employee_GenderID_FK FOREIGN KEY (GenderID) 
REFERENCES Gender(ID)
GO
--Add foreign key for DepartmentID Column
ALTER TABLE Employee1 
ADD CONSTRAINT Employee_DepartmentID_FK FOREIGN KEY (DepartmentID) 
REFERENCES Department(ID)
GO

--Insert data to Gender table
INSERT INTO Gender VALUES('Male')
INSERT INTO Gender VALUES('Female')
INSERT INTO Gender VALUES('Unknown')
GO

select * from Gender
select * from Department
--Insert data to Department table

INSERT INTO Department VALUES('IT')
INSERT INTO Department VALUES('HR')
INSERT INTO Department VALUES('Payroll')
GO

--Insert data into Employee table
INSERT INTO Employee1 VALUES('PRANAYA','PRANAYA@G.COM',1, 1, 25000, 30,'MUMBAI')
INSERT INTO Employee1 VALUES('TARUN','TARUN@G.COM',1, 2, 30000, 27,'ODISHA')
INSERT INTO Employee1 VALUES('PRIYANKA','PRIYANKA@G.COM',2, 3, 27000, 25,'BANGALORE')
INSERT INTO Employee1 VALUES('PREETY','PREETY@G.COM',2, 3, 35000, 26,'BANGALORE')
INSERT INTO Employee1 VALUES('RAMESH','RAMESH@G.COM',3,2, 26000, 27,'MUMBAI')
INSERT INTO Employee1 VALUES('PRAMOD','PRAMOD@G.COM',1, 1, 29000, 28,'ODISHA')
INSERT INTO Employee1 VALUES('ANURAG','ANURAG@G.COM',1, 3, 27000, 26,'ODISHA')
INSERT INTO Employee1 VALUES('HINA','HINA@G.COM',2,2, 26000, 30,'MUMBAI')
INSERT INTO Employee1 VALUES('SAMBIT','HINA@G.COM',1, 1, 30000, 25,'ODISHA')
GO


SELECT * FROM Employee1 WHERE CITY = 'MUMBAI';

SELECT * FROM Employee1 WHERE GenderID = 1 AND Salary >= 27000;

SELECT ID, Name, EmailID, CITY FROM Employee1 WHERE GenderID = 1 OR Salary >= 29000;

SELECT * FROM Employee1 WHERE (CITY = 'MUMBAI' AND GenderID = 1) OR (DepartmentID = 3);

UPDATE Employee1 SET Salary = 37000 WHERE DepartmentID = 3

SELECT * FROM Employee1 WHERE DepartmentId = 3;

DELETE FROM Employee1 WHERE CITY = 'MUMBAI'



------------------------------
-- Order By Clause
/*------------------------------


What is Order By Clause and its need in SQL Server?

1] The Order By Clause in SQL Server is used for sorting the data either in ascending 
   or descending order of a query based on a specified column or list of columns. 
   That means if you want to sort the output or result of a query either in ascending or 
   descending order then you need to use SQL Server Order by Clause. 


Points to remember while working with Order By Clause in SQL Server:

1] By default, the Order By Clause in SQL Server will sort the data in ascending order.
2] If you want to arrange the data in descending order then you must have to use the DESC keyword. 
3] The Order By Clause can be applied to any data type column in the table. 
4] This clause will arrange the data temporarily but not in the permanent store. 
5] The Order By Clause can only be used in Select Statements. */


drop table Employee
-- Create Person table
CREATE TABLE Employee
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100),
  EmailID VARCHAR(100),
  Gender VARCHAR(100),
  Department VARCHAR(100),
  Salary INT,
  Age INT,
  CITY VARCHAR(100)
)
GO

--Insert some test data into Person table
INSERT INTO Employee VALUES('PRANAYA','PRANAYA@G.COM','Male', 'IT', 25000, 30,'MUMBAI')
INSERT INTO Employee VALUES('TARUN','TARUN@G.COM','Male', 'Payroll', 30000, 27,'ODISHA')
INSERT INTO Employee VALUES('PRIYANKA','PRIYANKA@G.COM','Female', 'IT', 27000, 25,'BANGALORE')
INSERT INTO Employee VALUES('PREETY','PREETY@G.COM','Female', 'HR', 35000, 26,'BANGALORE')
INSERT INTO Employee VALUES('RAMESH','RAMESH@G.COM','Male','IT', 26000, 27,'MUMBAI')
INSERT INTO Employee VALUES('PRAMOD','PRAMOD@G.COM','Male','HR', 29000, 28,'ODISHA')
INSERT INTO Employee VALUES('ANURAG','ANURAG@G.COM','Male', 'Payroll', 27000, 26,'ODISHA')
INSERT INTO Employee VALUES('HINA','HINA@G.COM','Female','HR', 26000, 30,'MUMBAI')
INSERT INTO Employee VALUES('SAMBIT','HINA@G.COM','Male','Payroll', 30000, 25,'ODISHA')
GO

SELECT * FROM Employee ORDER BY Name;
SELECT * FROM Employee ORDER BY Name ASC;
SELECT * FROM Employee WHERE Gender = 'Male' ORDER BY Name DESC;
SELECT Name, EmailID, Salary FROM Employee WHERE Salary > 26000 ORDER BY 1 DESC;


SELECT Name, Gender, EmailID, Salary
FROM Employee
WHERE Salary > 25000
ORDER BY Gender DESC, Name ASC;

------------------------------------
--       Top n Clause
/*----------------------------------

1] The Top n Clause in SQL Server is used to specify
the number of data rows to return. 
2] In large tables with thousands or millions of data rows, 
   it takes more time to return all the records, which 
   cause database performance issue.
   To fix this problem, we can return the specified number 
   of data rows from a table using Top n Clause in SQL Server. */




-- Create drop table Employee table
CREATE TABLE Employee1
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100),
  EmailID VARCHAR(100),
  Gender VARCHAR(100),
  Department VARCHAR(100),
  Salary INT,
  Age INT,
  CITY VARCHAR(100)
)
GO
--Insert data into Employee table
INSERT INTO Employee1 VALUES('PRANAYA','PRANAYA@G.COM','Male', 'IT', 25000, 30,'MUMBAI')
INSERT INTO Employee1 VALUES('TARUN','TARUN@G.COM','Male', 'Payroll', 30000, 27,'ODISHA')
INSERT INTO Employee1 VALUES('PRIYANKA','PRIYANKA@G.COM','Female', 'IT', 27000, 25,'BANGALORE')
INSERT INTO Employee1 VALUES('PREETY','PREETY@G.COM','Female', 'HR', 35000, 26,'BANGALORE')
INSERT INTO Employee1 VALUES('RAMESH','RAMESH@G.COM','Male','IT', 26000, 27,'MUMBAI')
INSERT INTO Employee1 VALUES('PRAMOD','PRAMOD@G.COM','Male','HR', 29000, 28,'ODISHA')
INSERT INTO Employee1 VALUES('ANURAG','ANURAG@G.COM','Male', 'Payroll', 27000, 26,'ODISHA')
INSERT INTO Employee1 VALUES('HINA','HINA@G.COM','Female','HR', 26000, 30,'MUMBAI')
INSERT INTO Employee1 VALUES('SAMBIT','HINA@G.COM','Male','Payroll', 30000, 25,'ODISHA')
GO


select * 
from   Employee1


select top 3 *
from   Employee1 
order  by id desc



SELECT top 5
ID, Name, EmailID, Gender, CITY, Department
FROM Employee1
WHERE Gender = 'Male'
ORDER BY ID desc;


SELECT TOP (50) PERCENT
ID, Name, EmailID, Gender, CITY, Department
FROM Employee1
WHERE Gender = 'Male'
ORDER BY ID;


select TOP 6 *
from   Employee1




-----------------------------------------
-- Group By Clause in SQL Server
/*---------------------------------------

1] The Group by Clause in SQL Server is used to 
divide similar types of records or 
   data as a group and then return. 
2] If we use group by clause in the query 
then we should 
   use grouping/aggregate function such as 
   count(), sum(), max(), min(), and avg() functions.*/





-- Create drop table Employee table
CREATE TABLE Employee2
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100),
  EmailID VARCHAR(100),
  Gender VARCHAR(100),
  Department VARCHAR(100),
  Salary INT,
  Age INT,
  CITY VARCHAR(100)
)
GO

--Insert data into Employee table
INSERT INTO Employee2 VALUES('PRANAYA','PRANAYA@G.COM','Male', 'IT', 25000, 30,'MUMBAI')
INSERT INTO Employee2 VALUES('TARUN','TARUN@G.COM','Male', 'Payroll', 30000, 27,'ODISHA')
INSERT INTO Employee2 VALUES('PRIYANKA','PRIYANKA@G.COM','Female', 'IT', 27000, 25,'BANGALORE')
INSERT INTO Employee2 VALUES('PREETY','PREETY@G.COM','Female', 'HR', 35000, 26,'BANGALORE')
INSERT INTO Employee2 VALUES('RAMESH','RAMESH@G.COM','Male','IT', 26000, 27,'MUMBAI')
INSERT INTO Employee2 VALUES('PRAMOD','PRAMOD@G.COM','Male','HR', 29000, 28,'ODISHA')
INSERT INTO Employee2 VALUES('ANURAG','ANURAG@G.COM','Male', 'Payroll', 27000, 26,'ODISHA')
INSERT INTO Employee2 VALUES('HINA','HINA@G.COM','Female','HR', 26000, 30,'MUMBAI')
INSERT INTO Employee2 VALUES('SAMBIT','HINA@G.COM','Male','Payroll', 30000, 25,'ODISHA')
INSERT INTO Employee2 VALUES('MANOJ','MANOJ@G.COM','Male','HR', 30000, 28,'ODISHA')
INSERT INTO Employee2 VALUES('SWAPNA','SWAPNA@G.COM','Female', 'Payroll', 28000, 27,'MUMBAI')
INSERT INTO Employee2 VALUES('LIMA','LIMA@G.COM','Female','HR', 30000, 30,'BANGALORE')
INSERT INTO Employee2 VALUES('DIPAK','DIPAK@G.COM','Male','Payroll', 32000, 25,'BANGALORE')
GO

SELECT * 
FROM Employee2


SELECT Department, 
       COUNT(1) AS TotalEmployee
FROM   Employee2 
GROUP BY Department


select count(3)
from   Employee2


select *
from   Employee2

SELECT Department, 
       SUM(Salary) AS TotalSal
FROM   Employee2
GROUP BY Department


SELECT Department,
       MaxSalary = MAX(SALARY) 
FROM    Employee1 
GROUP BY Department -- find the highest salary in each department in the organization.


SELECT Department, Gender, EmployeeCount = COUNT(*) 
FROM Employee2 
GROUP BY Department, Gender 
ORDER BY Gender  desc 
--  to get the number of employees working in each Gender per department.


SELECT CITY, SUM(Salary) as TotalSalary 
FROM Employee
GROUP BY CITY  -- Query for retrieving total salaries by the city.



SELECT  City, Gender, SUM(Salary) as TotalSalary, 
    COUNT(ID) as TotalEmployees
FROM Employee
GROUP BY  CITY, Gender  -- Query for retrieving total salaries and the total number of employees by City, and by gender.



SELECT Department, MAX(Salary) as Salary, [Name] 
FROM Employee2
GROUP BY Department,[Name]   -- Invalid

-- It will give the error as Column ‘Employee.Name’ is invalid in the select list because it 
-- is not contained in either an aggregate function or the GROUP BY clause.



SELECT Department, MAX(Salary) as Salary, Name 
FROM Employee
GROUP BY Department -- Invalid 

SELECT Department, MAX(SALARY), GETDATE() 
FROM Employee 
GROUP BY Department --Valid

SELECT Department,
       Gender, 
	   MAX(Salary), 
	   'Hello' as FixedValue 
FROM Employee2 
GROUP BY Department, Gender --Valid



--------------------------
--- Having Clause
/*--------------------------

1] The Having clause is typically used with a GROUP BY clause
2] Used to filter data generated by group by */


-- Create Person table
CREATE TABLE Employeess
(
  ID INT PRIMARY KEY IDENTITY(1,1),
  Name VARCHAR(100),
  EmailID VARCHAR(100),
  Gender VARCHAR(100),
  Department VARCHAR(100),
  Salary INT,
  Age INT,
  CITY VARCHAR(100)
)
GO

--Insert some test data into Person table
INSERT INTO Employeess VALUES('PRANAYA','PRANAYA@G.COM','Male', 'IT', 25000, 30,'MUMBAI')
INSERT INTO Employeess VALUES('TARUN','TARUN@G.COM','Male', 'Payroll', 30000, 27,'ODISHA')
INSERT INTO Employeess VALUES('PRIYANKA','PRIYANKA@G.COM','Female', 'IT', 27000, 25,'BANGALORE')
INSERT INTO Employeess VALUES('PREETY','PREETY@G.COM','Female', 'HR', 35000, 26,'BANGALORE')
INSERT INTO Employeess VALUES('RAMESH','RAMESH@G.COM','Male','IT', 26000, 27,'MUMBAI')
INSERT INTO Employeess VALUES('PRAMOD','PRAMOD@G.COM','Male','HR', 29000, 28,'ODISHA')
INSERT INTO Employeess VALUES('ANURAG','ANURAG@G.COM','Male', 'Payroll', 27000, 26,'ODISHA')
INSERT INTO Employeess VALUES('HINA','HINA@G.COM','Female','HR', 26000, 30,'MUMBAI')
INSERT INTO Employeess VALUES('SAMBIT','HINA@G.COM','Male','Payroll', 30000, 25,'ODISHA')
INSERT INTO Employeess VALUES('MANOJ','MANOJ@G.COM','Male','HR', 30000, 28,'ODISHA')
INSERT INTO Employeess VALUES('SWAPNA','SWAPNA@G.COM','Female', 'Payroll', 28000, 27,'MUMBAI')
INSERT INTO Employeess VALUES('LIMA','LIMA@G.COM','Female','HR', 30000, 30,'BANGALORE')
INSERT INTO Employeess VALUES('DIPAK','DIPAK@G.COM','Male','Payroll', 32000, 25,'BANGALORE')
GO



SELECT City, 
       SUM(Salary) as TotalSalary
FROM   Employeess
GROUP BY City
HAVING City = 'MUMBAI'


SELECT City, SUM(Salary) as TotalSalary
FROM Employeess
WHERE Gender = 'Male' and City = 'MUMBAI'
GROUP BY City
--HAVING City = 'MUMBAI'   
--- It is also possible to combine WHERE and HAVING



SELECT City, 
       COUNT(*) AS 'Number of employees'
FROM   Employeess
GROUP BY City
HAVING COUNT(*) > 4; -- Having Clause Using COUNT Function:


SELECT Department, MIN(Salary) AS 'Lowest salary'
FROM EmployeeSS
GROUP BY Department
HAVING MIN(Salary) > 25000; -- Having Clause Using MIN Function: