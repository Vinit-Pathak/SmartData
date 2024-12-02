


/******************************************************************
                   User Define Functions.
******************************************************************

What is a function in SQL Server?
A function in SQL Server is a subprogram that is used to perform an 
action such as complex 
calculation and returns the result of the action as a value.

There are two types of functions in SQL Server, such as

1] System Defined Function
2] User-Defined Function

The functions which are already defined by the system and ready to be used by the
developer are called system-defined functions whereas if the function is defined 
by the user or developer then such types of functions are called the 
user-defined function.

Some functions take parameters; do some processing and returning some results back.
For example 
SELECT SQUARE(3)

Some functions may not take any parameters, but returns some result,
for example, 
SELECT GETDATE()

So we can say that a 
function can have a parameter that is optional but 
a function should always return a value that is mandatory.




Types of User-Defined Function:
In SQL Server, we can create three types of User-Defined Functions, such as

1] Scalar Valued Functions
2] Inline Table-Valued Functions
3] Multi-Statement Table-Valued Functions



**** SQL Server Scalar Valued Functions***

The user-defined function which returns only 
a single value (scalar value) is known as the Scalar Valued Function.
Scalar Value Functions in SQL Server may or may not have parameters 
that are optional but always return a single (scalar) value which is mandatory. 
The returned value which is return by the SQL Server Scalar Function 
can be of any data type,
except text, ntext, image, cursor, and timestamp.

-------------------------------------------------

sp
vw
fn

Create function FunctionName
(
list of parameter
)
Returns <return type>
as
begin

function body


end

-------------------------------

Syntax for calling a Function in SQL Server:

SELECT dbo.<FunctionName>(Value)

When calling a scalar user-defined function we must specify the two-part name
i.e. owner name and function name. 
The dbo stands for the database owner name.
We can also invoke a scalar function in SQL Server 
using the complete three-part name 
i.e. database name. Owner name and function name. */


/*

SELECT dbo.SVF1(5)

*/

CREATE FUNCTION SVF1(@X INT)
RETURNS INT
AS
BEGIN
  RETURN @X * @X *@X
END




-- To execute the above function call it like below

SELECT dbo.SVF1(5)
 

-- Write a Scalar Function to get the date difference.


/*

SELECT dbo.CalculateAge ('03/20/2002')
SELECT dbo.CalculateAge ('02/29/1988') AS AGE

*/

CREATE FUNCTION CalculateAge
(
  @DOB DATE
)
RETURNS INT
AS
BEGIN


  DECLARE @AGE INT

  SET @AGE = DATEDIFF(YEAR, @DOB, GETDATE())-
  CASE
    WHEN (MONTH(@DOB) > MONTH(GETDATE())) OR
       (MONTH(@DOB) = MONTH(GETDATE()) AND
        DAY(@DOB) > DAY(GETDATE()))
    THEN 1
    ELSE 0
  END


  RETURN @AGE


END







-- Scalar Valued Function in Select Clause:


-- Create Table Employee
CREATE TABLE Employee
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  DOB DATETIME
)
GO

-- Populate Employee table with some test data
INSERT INTO Employee(ID, Name, DOB) VALUES(1, 'Pranaya', '1988-02-29 21:29:16.667')
INSERT INTO Employee(ID, Name, DOB) VALUES(2, 'Kumar', '1989-03-27 21:29:16.667')
INSERT INTO Employee(ID, Name, DOB) VALUES(3, 'Rout', '1990-04-15 21:29:16.667')



select *
from   Employee


SELECT ID, 
       Name, 
	   DOB, 
	   dbo.CalculateAge(DOB) AS Age 

FROM   Employee


-- SQL Server Scalar Valued Function in Where Clause:

SELECT ID, 
       Name, 
	   DOB, 
	   dbo.calculateAge(DOB) AS Age 
FROM   Employee
WHERE  dbo.calculateAge(DOB) > 35






/**** Inline Table Valued Function in SQL Server ****

What is a Table-Valued Function in SQL Server?
In the case of a Table-Valued Function, 
we can return a table as an output from the function.
These are again of two types.

1] Inline Table-valued Function
2] Multi-statement table value function

Note: In this article, we are going to discuss Inline Table-Valued Function
and in our next article, we will discuss Multi-Statement Table-valued 
Functions with Examples.

What are Inline Table-Valued functions in SQL Server?
In the case of an Inline Table-Valued Function, 
the body of the function will have only 
a Single Select Statement prepared with the “RETURN” statement. 
And here, we need to specify the Return Type as 
TABLE by using the RETURNS TABLE statement. 


Syntax

-------------------------------------

create function functionName
(
  list of param
)

Returns Table 
as
Return (select statements)

-------------------------------------

How to call this

select * from  functionName(value)



Points to Remember:

1] We specify TABLE as the Return Type instead of any scalar data type.

2] The function body is not closed between BEGIN and END blocks.

3] This is because the function is going to return a single select statement.

4] The structure of the Table that is going to be returned is determined by the 
   select statement used in the function.

Example: Inline Table-Valued Function in SQL Server 
Let us understand the Inline Table-Valued Function in SQL Server with some 
examples. We are going to use the following Student table to understand this 
concept. */ 


-- Create Student Table
CREATE TABLE Student
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  DOB DATETIME,
  Branch VARCHAR(50)
)

-- Populate the Student Table with test data
INSERT INTO Student VALUES(1, 'Pranaya', 'Male','1996-02-29 10:53:27.060', 'CSE')
INSERT INTO Student VALUES(2, 'Priyanka', 'Female','1995-05-25 10:53:27.060', 'CSE')
INSERT INTO Student VALUES(3, 'Anurag', 'Male','1995-04-19 10:53:27.060', 'ETC')
INSERT INTO Student VALUES(4, 'Preety', 'Female','1996-03-17 10:53:27.060', 'ETC')
INSERT INTO Student VALUES(5, 'Sambit', 'Male','1997-01-15 10:53:27.060', 'CSE')


----------------

CREATE FUNCTION FN_GetStudentDetailsByID
(
  @ID INT
)
RETURNS TABLE
AS
RETURN (SELECT * FROM Student WHERE ID = @ID)


-- Calling function
SELECT * FROM FN_GetStudentDetailsByID(3)





------

/*

-- calling function
SELECT * FROM FN_GetStudentDetailsByBranch('CSE')

*/


CREATE FUNCTION FN_GetStudentDetailsByBranch
(
  @Branch VARCHAR(50)
)
RETURNS TABLE
AS
RETURN (SELECT * FROM Student WHERE Branch = @Branch)




------


/*

-- calling function

SELECT * FROM FN_GetStudentDetailsByGender('male')


*/

CREATE OR ALTER FUNCTION FN_GetStudentDetailsByGender
(
  @Gender VARCHAR(50)
)
RETURNS TABLE
AS
RETURN (   SELECT Id,
                  Name, 
                  DOB, 
		   	      Branch,
				  Gender
				 
		   FROM   Student
		   WHERE  Gender = @Gender
	   )






/*
Where can we use Inline Table-valued Functions in SQL Server?

The Inline Table-Valued function in SQL Server can be used to achieve 
the functionalities of parameterized views, 
and the table returned by the inline table-valued function in SQL 
Server can also be used in joins with other tables.




Inline Table-Valued Function with JOINs in SQL Server
Let us understand how to use Inline Table-Valued Function with Joins with an 
example. 

We are going to use the following Department and 
Employee tables to understand this concept.*/

-- Create Department Table
CREATE TABLE Department
(
  ID INT PRIMARY KEY,
  DepartmentName VARCHAR(50)
)
GO

-- Populate the Department Table with test data
INSERT INTO Department VALUES(1, 'IT')
INSERT INTO Department VALUES(2, 'HR')
INSERT INTO Department VALUES(3, 'Sales')
GO

-- Create Employee Table
CREATE TABLE Employees1
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  DOB DATETIME,
  DeptID INT FOREIGN KEY REFERENCES Department(ID) 
)
GO

select * from Employees1

-- Populate the Employee Table with test data
INSERT INTO Employees1 VALUES(1, 'Pranaya', 'Male','1996-02-29 10:53:27.060', 1)
INSERT INTO Employees1 VALUES(2, 'Priyanka', 'Female','1995-05-25 10:53:27.060', 2)
INSERT INTO Employees1 VALUES(3, 'Anurag', 'Male','1995-04-19 10:53:27.060', 2)
INSERT INTO Employees1 VALUES(4, 'Preety', 'Female','1996-03-17 10:53:27.060', 3)
INSERT INTO Employees1 VALUES(5, 'Sambit', 'Male','1997-01-15 10:53:27.060', 1)
INSERT INTO Employees1 VALUES(6, 'Hina', 'Female','1995-07-12 10:53:27.060', 2)
GO


/*
select * from FN_GetEmployeessByGender('Male')

*/


CREATE FUNCTION FN_GetEmployeessByGender
(
  @Gender VARCHAR(50)
)
RETURNS TABLE
AS
RETURN (SELECT ID, 
               Name, 
			   Gender, 
			   DOB, 
			   DeptID 

		FROM   Employees1 WHERE Gender = @Gender)


-- using function in joins

SELECT Name,
       Gender,
	   DOB, 
	   DepartmentName 
FROM   FN_GetEmployeessByGender('Male') Emp

JOIN   Department Dept on Dept.ID = Emp.DeptID




-- Example: Table-valued Function Returning data 
-- From two Tables using Join in SQL Server

/*

select  * from FN_EmployeessByGender('Male')

*/


CREATE FUNCTION FN_EmployeessByGender
(
  @Gender VARCHAR(50)
)
RETURNS TABLE
AS
RETURN ( SELECT Emp.ID,
                Name, 
				Gender,
				DOB, 
				DepartmentName 

         FROM   Employees1 Emp
                JOIN Department Dept on Emp.DeptId = Dept.Id
         WHERE  Gender = @Gender
	   )


-- calling function

SELECT * FROM dbo.FN_EmployeessByGender('Female');




/************  Multi-Statement Table-Valued Function in SQL Server **********


Multi-Statement Table-Valued Function in SQL Server

The Multi-Statement Table Valued Function in SQL Server is the same as
the Inline Table-Valued Function 
means it is also going to returns a table as an output but with the
following differences.

The Multi-Statement Table-Valued Function body can
contain more than one statement. 

In Inline Table-Valued Function, it contains only
a single Select statement prepared by the return statement.

In Multi-Statement Table-Valued Function,
the structure of the table returned from the function is defined by us. 
But, in Inline Table-Valued Function, the structure of the table is 
defined by the Select statement that is going to return from the function body.

*/


-- Create Department Table
CREATE TABLE Department
(
  ID INT PRIMARY KEY,
  DepartmentName VARCHAR(50)
)
GO

-- Populate the Department Table with test data
INSERT INTO Department VALUES(1, 'IT')
INSERT INTO Department VALUES(2, 'HR')
INSERT INTO Department VALUES(3, 'Sales')
GO

-- Create Employee Table
CREATE TABLE Employee
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  DOB DATETIME,
  DeptID INT FOREIGN KEY REFERENCES Department(ID) 
)
GO

-- Populate the Employee Table with test data
INSERT INTO Employee VALUES(1, 'Pranaya', 'Male','1996-02-29 10:53:27.060', 1)
INSERT INTO Employee VALUES(2, 'Priyanka', 'Female','1995-05-25 10:53:27.060', 2)
INSERT INTO Employee VALUES(3, 'Anurag', 'Male','1995-04-19 10:53:27.060', 2)
INSERT INTO Employee VALUES(4, 'Preety', 'Female','1996-03-17 10:53:27.060', 3)
INSERT INTO Employee VALUES(5, 'Sambit', 'Male','1997-01-15 10:53:27.060', 1)
INSERT INTO Employee VALUES(6, 'Hina', 'Female','1995-07-12 10:53:27.060', 2)
GO



-- Inline Table Valued function:
CREATE FUNCTION ILTVF_GetEmployees()
RETURNS TABLE
AS
RETURN (SELECT ID, Name, Cast(DOB AS Date) AS DOB
        FROM Employee)

-- Calling the Inline Table-Valued Function:
SELECT * FROM ILTVF_GetEmployees()

-- what is table variable 

--- Using Multi-Statement Table-Valued function
-- Multi-statement Table Valued function:
CREATE FUNCTION MSTVF_GetEmployees()
RETURNS @Table1 Table (ID int, Name nvarchar(20), DOB Date)
AS
BEGIN
  INSERT INTO @Table1
    SELECT ID, Name, Cast(DOB AS Date)
    FROM Employee
  Return
End


-- calling function
SELECT * FROM MSTVF_GetEmployees()



/*

What are the differences between Inline and Multi-Statement 
Table-Valued Functions in SQL Server?

In an Inline Table-Valued Function, the returns clause cannot define the 
structure of the table that the function is going to return whereas in 
the Multi-Statement Table-Valued Function the returns clause 
defines the structure of the table
that the function is going to return.

The Inline Table-Valued Function cannot have BEGIN and END blocks 
whereas the Multi-Statement Table-Valued Function has the 
Begin and End blocks.

It is possible to update the underlying database table using the inline
table-valued function but it is not possible to update the underlying database
table using the multi-statement table-valued function.

Inline Table-Valued functions are better for performance than the 
Multi-Statement Table-Valued function. So, if the given task can 
be achieved using an Inline Table-Valued Function, then 
it is always preferred to use Inline Table-valued Function
over the Multi-Statement Table-Valued function.

Reason For Better Performance: Internally SQL Server treats an
Inline Table-Valued function much like a view and treats a 
Multi-Statement Table-Valued function as a stored procedure.




Example: Update underlying database table using the
inline table-valued function in SQL Server */

SELECT * FROM dbo.ILTVF_GetEmployees()

-- For the above function, Employee is the underlying database table.

UPDATE ILTVF_GetEmployees() SET Name='Pranaya1' WHERE ID= 1

/* The above update query will change the name Pranaya to Pranaya1,
in the underlying table Employee. When we try to do the same thing with the
multi-statement table-valued function, we will get an error stating 
‘Object ‘MSTVF_GetEmployees’ cannot be modified.‘ 

The reason is that the multi-statement table-valued function did 
not get the data directly from the underlying database table
instead it gets the data from the table variable.

Note: In Inline Table-Valued functions, 
we get the data directly from the underlying base table(s), 
and in the case of the Multi-Statement Table-Valued function, 
it gets the data from the table variable.

*/

/*********************************************************************************
   What is the Difference Between Functions and Procedures in SQL Server?
/*********************************************************************************

1] A function must return a value, 
   it is mandatory whereas a procedure returning a value is optional.

2] The procedure can have parameters of both input and output whereas
   a function can have only input parameters.

3] In a procedure, we can perform Select. Update, 
   Insert and Delete operations whereas function can 
   only be used to perform select operations. It cannot be used to perform Insert, 
   Update, and Delete operations that can change the state of the database.

4] A procedure provides the options to perform Transaction Management,
   Error Handling, etc whereas these operations are not possible in a function.

5] We call a procedure using EXECUTE/ EXEC command whereas
   a function is called by using SELECT command only.

6] From a procedure, we can call another procedure or a function whereas 
   from a function we can call another function but not a procedure.

7] User-Defined Functions can be used in the SQL 
  statements anywhere in the WHERE/HAVING/SELECT section where as
  Stored procedures cannot be.





scenarios for each type of function:

1. Scalar Valued Functions

Scenario: You need to perform a simple 
calculation or transformation on individual values. 
For example, you might create a scalar function 
to calculate the sales tax for a given amount.

Use Case: When querying a database to get a list 
of products and their total price including tax, 
you could use a scalar function to compute the tax 
for each product's price as part of the SELECT statement.

2. Inline Table-Valued Functions

Scenario: You want to return a set of rows based on input 
parameters, similar to a parameterized view. 
This is useful for filtering data dynamically.

Use Case: Suppose you need to retrieve customer 
orders based on a specific date range. 
An inline table-valued function could take
start and end dates as parameters and return 
all orders placed within that timeframe, 
which can be easily joined with other tables.
3. Multi-Statement Table-Valued Functions

Scenario: You need to perform more complex operations that involve multiple steps to prepare a dataset before returning it. This allows for procedural logic within the function.

Use Case: Imagine you want to generate a report that aggregates sales data by product category, where the calculation involves several intermediate steps (like filtering, joining, and summing values). A multi-statement table-valued function can encapsulate this logic, allowing you to return the final result set.

Feel free to ask if you need more examples or details!
