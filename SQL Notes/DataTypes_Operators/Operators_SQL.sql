/*-----------------------------------------
      Operator in SQL Server
-------------------------------------------

1] What is an Operator in SQL Server?

An operator is a symbol that performs some 
specific operation on operands or expressions.
These operators are classified as follows in SQL Server.

1] Assignment operator (=,-=,+=,*=,/=)
2] Arithmetic operator
3] Comparison operator
4] Logical operator
5] Set operator 



Assignment operator  */

DECLARE @MyCounter INT;
SET @MyCounter = 1;
select @MyCounter as mycounter

select FirstName,
       LastName as Fname
from   Patient


DECLARE @MyVariable INT
SET @MyVariable = 10
SET @MyVariable *= 5
SELECT @MyVariable AS MyResult
GO /*



Arithmetic Operators (+,-,*,/,%) */

SELECT 100 + 200 as result 
SELECT 45 - 74  as Result
SELECT 25 * 4 
SELECT 36 / 6 
SELECT 17 % 4 


--Create database EmployeeDB
Create database EmployeeDB
Go

Use EmployeeDB
Go

--Create Employee table
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

--Insert some data into Employee table
INSERT INTO Employee VALUES('Pranaya','Pranaya@g.com','Male', 'IT', 25000, 30,'Mumbai')
INSERT INTO Employee VALUES('Tarun','Tarun@g.com','Male', 'Payroll', 30000, 27,'Odisha')
INSERT INTO Employee VALUES('Priyanka','Priyanka@g.com','Female', 'IT', 27000, 25,'Bangalore')
INSERT INTO Employee VALUES('Preety','Preety@g.com','Female', 'HR', 35000, 26,'Bangalore')
INSERT INTO Employee VALUES('Ramesh','Ramesh@g.com','Male','IT', 26000, 27,'Mumbai')
INSERT INTO Employee VALUES('Pramod','Pramod@g.com','Male','HR', 29000, 28,'Odisha')
INSERT INTO Employee VALUES('Anurag','Anurag@g.com','Male', 'Payroll', 27000, 26,'Odisha')
INSERT INTO Employee VALUES('Hina','Hina@g.com','Female','HR', 26000, 30,'Mumbai')
INSERT INTO Employee VALUES('Sambit','Sambit@g.com','Male','Payroll', 30000, 25,'Odisha')
INSERT INTO Employee VALUES('Manoj','Manoj@g.com','Male','HR', 30000, 28,'Odisha')
INSERT INTO Employee VALUES('Sara',' Sara@g.com','Female', 'Payroll', 28000, 27,'Mumbai')
INSERT INTO Employee VALUES('Lima','Lima@g.com','Female','HR', 30000, 30,'Bangalore')
INSERT INTO Employee VALUES('Dipak','Dipak@g.com','Male','Payroll', 32000, 25,'Bangalore')



select *
from   Employee


SELECT ID, 
       [Name], 
	   Department, 
	   Salary, 
	   'Ashish' as MyName,
       Salary * 1.1 AS CalulatedSalary
FROM   Employee


SELECT ID as [Employee_ID], 
       [Name],
	   Department, 
	   Salary,  
       Salary * 0.11 / 2.54 + 27.36 AS CalulatedSalary
FROM   Employee

SELECT ID, 
       [Name], 
	   Department, 
	   Salary,  
       Salary * 0.11 / (2.54 + 27.36) AS CalulatedSalary
FROM   Employee



SELECT ID, Name + 100 FROM Employee


SELECT GETDATE() + 1   -- Gives Current date + 1 day
SELECT GETDATE() - 1   -- Gives Current date – 1 day




-- Comparison Operators
/*

1] Equal                    (=)  Operator
2] Not Equal                (!= or <>) Operator
3] Greater Than             (>)  Operator
4] Less Than                (<)  Operator
5] Greater Than or Equal To (>=) Operator
6] Less Than or Equal To    (<=) Operator
7] Not Greater Than         (!<) Operator
8] Not Less Than            (!>) Operator */




-- Create Employee table
CREATE TABLE Employee100
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

--Insert some test data into Employee table
INSERT INTO Employee100 VALUES('Pranaya','Pranaya@g.com','Male', 'IT', 25000, 30,'Mumbai')
INSERT INTO Employee100 VALUES('Tarun','Tarun@g.com','Male', 'Payroll', 30000, 27,'Odisha')
INSERT INTO Employee100 VALUES('Priyanka','Priyanka@g.com','Female', 'IT', 27000, 25,'Bangalore')
INSERT INTO Employee100 VALUES('Preety','Preety@g.com','Female', 'HR', 35000, 26,'Bangalore')
INSERT INTO Employee100 VALUES('Ramesh','Ramesh@g.com','Male','IT', 26000, 27,'Mumbai')
INSERT INTO Employee100 VALUES('Pramod','Pramod@g.com','Male','HR', 29000, 28,'Odisha')
INSERT INTO Employee100 VALUES('Anurag','Anurag@g.com','Male', 'Payroll', 27000, 26,'Odisha')
INSERT INTO Employee100 VALUES('Hina','Hina@g.com','Female','HR', 26000, 30,'Mumbai')
INSERT INTO Employee100 VALUES('Sambit','Sambit@g.com','Male','Payroll', 30000, 25,'Odisha')
INSERT INTO Employee100 VALUES('Manoj','Manoj@g.com','Male','HR', 30000, 28,'Odisha')
INSERT INTO Employee100 VALUES('Sara',' Sara@g.com','Female', 'Payroll', 28000, 27,'Mumbai')
INSERT INTO Employee100 VALUES('Lima','Lima@g.com','Female','HR', 30000, 30,'Bangalore')
INSERT INTO Employee100 VALUES('Dipak','Dipak@g.com','Male','Payroll', 32000, 25,'Bangalore')
GO



SELECT * FROM Employee WHERE CITY = !'Mumbai'
SELECT * FROM Employee WHERE CITY <> 'Mumbai'

SELECT * FROM Employee WHERE ID > 5
SELECT * FROM Employee WHERE ID < 5

SELECT * 
FROM   Employee 
WHERE  Salary >= 30000


SELECT * FROM Employee WHERE Salary <= 29000
SELECT * FROM Employee WHERE ID !> 5
SELECT * FROM Employee WHERE ID !< 5


/*  Logical Operators 

1] AND    – TRUE if both Boolean expressions are TRUE.
2] OR     – TRUE if either Boolean expression is TRUE.
3] NOT    – Reverses the value of any other Boolean operator. */



SELECT * 
FROM   Employee 
WHERE   Salary >= 27000 AND Salary <= 30000;


SELECT * 
FROM   Employee 
WHERE  Department = 'IT' OR 
       Department = 'HR'


SELECT * 
FROM   Employee 
WHERE  NOT CITY = 'Mumbai'


SELECT * 
FROM   Employee 
WHERE  Salary >= 27000 AND 
        Salary <= 30000  and
		NOT CITY = 'Mumbai'


/*
IN BETWEEN and LIKE Operators in SQL Server
-----------------------------------------------------*/
-- Create Employee table
CREATE TABLE Employee101
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

--Insert some test data into Employee table
INSERT INTO Employee101 VALUES('Pranaya','Pranaya@g.com','Male', 'IT', 25000, 30,'Mumbai')
INSERT INTO Employee101 VALUES('Tarun','Tarun@g.com','Male', 'Payroll', 30000, 27,'Odisha')
INSERT INTO Employee101 VALUES('Priyanka','Priyanka@g.com','Female', 'IT', 27000, 25,'Bangalore')
INSERT INTO Employee101 VALUES('Preety','Preety@g.com','Female', 'HR', 35000, 26,'Bangalore')
INSERT INTO Employee101 VALUES('Ramesh','Ramesh@g.com','Male','IT', 26000, 27,'Mumbai')
INSERT INTO Employee101 VALUES('Pramod','Pramod@g.com','Male','HR', 29000, 28,'Odisha')
INSERT INTO Employee101 VALUES('Anurag','Anurag@g.com','Male', 'Payroll', 27000, 26,'Odisha')
INSERT INTO Employee101 VALUES('Hina','Hina@g.com','Female','HR', 26000, 30,'Mumbai')
INSERT INTO Employee101 VALUES('Sambit','Sambit@g.com','Male','Payroll', 30000, 25,'Odisha')
INSERT INTO Employee101 VALUES('Manoj','Manoj@g.com','Male','HR', 30000, 28,'Odisha')
INSERT INTO Employee101 VALUES('Sara',' Sara@g.com','Female', 'Payroll', 28000, 27,'Mumbai')
INSERT INTO Employee101 VALUES('Lima','Lima@g.com','Female','HR', 30000, 30,'Bangalore')
INSERT INTO Employee101 VALUES('Dipak','Dipak@g.com','Male','Payroll', 32000, 25,'Bangalore')
GO



/*
BETWEEN Operator in SQL Server:

The BETWEEN operator in SQL Server is used to get the values within a range. 
Generally, we use the BETWEEN operator in the 
WHERE clause to get values within a specified range. For example, 
if you want to fetch all the employees between ID 3 and 7 from the
Employee table, then you need to use the BETWEEN operator as */

SELECT * 
FROM  Employee 
WHERE ID BETWEEN 3 AND 7

SELECT * 
FROM  Employee 
WHERE ID NOT BETWEEN 3 AND 7



/*
IN Operator in SQL Server:

The IN Operator in SQL Server is used to search for specified values 
that match any value in the set of multiple values it accepts. Generally, 
we will use this IN operator in WHERE clause to compare column 
or variable values with a set of multiple values.  */

SELECT * 
FROM   Employee 
WHERE  Department IN ('IT', 'HR')

SELECT * 
FROM   Employee 
WHERE  Department Not IN ('IT', 'HR')


/*
LIKE Operator in SQL Server:

This is one of the most frequently used operators in SQL Server. 
The LIKE operator in SQL Server is used to search for character 
string with the specified pattern using wildcards in the column.

Using ‘%’ wildcard */



SELECT * 
FROM  Employee 
WHERE [Name] LIKE 'P%' -- display result start with p


SELECT * 
FROM   Employee 
WHERE  [Name] LIKE '%a' -- Display result that ends with a


SELECT * 
FROM   Employee 
WHERE  [Name] LIKE '%am%'  -- Display result that contain am in between



/*
Understanding the WildCard Characters:

You can use the following wildcard characters with the LIKE operator in SQL Server.

1] %       symbol represents any no of characters in the expression.
2] _       will represent a single character in the expression.
3] The []  symbol indicates a set of characters in the expression.
4] [^]     will represent any single character, not within the specified range */


SELECT * FROM Employee WHERE [Name] LIKE 'T_r__'

-- to display employee details whose name contains ‘A’ character.
SELECT  * FROM Employee WHERE Name LIKE '%A%'

-- to display employee details whose name starts with ‘P’ character and ends with ‘A’ character.
SELECT * FROM Employee WHERE Name LIKE 'P%A'

-- to display employee details whose name starts with J, H, K, U characters.
SELECT * FROM Employee WHERE Name LIKE'[P, R, K, U]%'

--to display employee details whose names start with A to Z characters.
SELECT top 2 * FROM Employee WHERE Name LIKE'[A-Z]%'
SELECT top 2 * FROM Employee WHERE Name LIKE'[A-Z]%'




/*
UNION and UNION ALL Operators


The UNION and UNION ALL operators in SQL Server are used to combine the 
result-set of two or more SELECT statements into a single result set. */


CREATE TABLE EmployeeIndia
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(10),
  Department VARCHAR(50)
)
GO

INSERT INTO EmployeeIndia VALUES(1, 'Pranaya', 'Male','IT')
INSERT INTO EmployeeIndia VALUES(2, 'Priyanka', 'Female','IT')
INSERT INTO EmployeeIndia VALUES(3, 'Preety', 'Female','HR')
INSERT INTO EmployeeIndia VALUES(4, 'Subrat', 'Male','HR')
INSERT INTO EmployeeIndia VALUES(5, 'Anurag', 'Male','IT')
GO

CREATE TABLE EmployeeUK
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(10),
  Department VARCHAR(50)
)
GO

INSERT INTO EmployeeUK VALUES(1, 'James', 'Male','IT')
INSERT INTO EmployeeUK VALUES(2, 'Priyanka', 'Female','IT')
INSERT INTO EmployeeUK VALUES(3, 'Sara', 'Female','HR')
INSERT INTO EmployeeUK VALUES(4, 'Subrat', 'Male','HR')
INSERT INTO EmployeeUK VALUES(5, 'Pam', 'Female','HR')
GO


-- Combining the rows of EmployeeIndia and EmployeeUK using UNION ALL



SELECT ID, [Name], Gender, Department FROM EmployeeIndia
UNION ALL
Select ID, [Name], Gender, Department FROM EmployeeUK


-- Combining the rows of EmployeeIndia and EmployeeUK using UNION

SELECT ID, Name, Gender, Department FROM EmployeeIndia
UNION
SELECT ID, Name, Department, Gender FROM EmployeeUK


/*
Differences between UNION and UNION ALL Operator in SQL Server

From the output, it is very clear that UNION removes 
duplicate rows whereas UNION ALL does not remove the duplicate rows. 
When we use a UNION operator to remove the duplicate rows from the result set, 
the SQL server has to do a distinct operation which is time-consuming. 
For this reason, UNION ALL is much faster than UNION. 


1]  
For UNION and UNION ALL to work, the Number, Data types, 
and the order of the columns in the select statements should be the same. 
If you want to sort, the results of UNION or UNION ALL, 
the ORDER BY clause should be used on the last SELECT */


SELECT ID, Name, Gender, Department FROM EmployeeIndia
ORDER BY Name
UNION
SELECT ID, Name, Gender, Department FROM EmployeeUK


SELECT ID, Name, Gender, Department FROM EmployeeIndia
UNION
SELECT ID, Name, Gender, Department FROM EmployeeUK
ORDER BY Name

SELECT ID, Name, Gender, Department 
FROM  EmployeeIndia
order by id asc,[name] desc 


/******    Below are some of the Usefull Operators you guys can check ***********

ALL,ANY,SOME,EXISTS,EXCEPT,INTERSECT,




