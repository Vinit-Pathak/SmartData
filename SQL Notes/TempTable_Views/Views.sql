/**************************************************************
             -- Views in SQL Server
***************************************************************

1] The views in SQL Server are nothing more than a compiled SQL query. 
2] We can also consider the Views as virtual tables. As a virtual table, 
3] the Views do not store any data physically by default. 


What are the differences between a table and a view in SQL Server?


1] The table is physical whereas the view is logical or virtual.
2] A Table is an independent object whereas a view is a dependent 
   object that is a view depends on the table 
   or tables from which it is loading the data.
3] When a new table is created from an existing 
   table the new and old tables are independent
   themselves that is the changes of one table will not be reflected into the other table whereas 
   if a view is created based on a table any changes that 
    are performed on the table reflects into the view 

*/

-- Create Department Table
CREATE TABLE Department
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50)
)
GO

-- Populate the Department Table with test data
INSERT INTO Department VALUES(1, 'IT')
INSERT INTO Department VALUES(2, 'HR')
INSERT INTO Department VALUES(3, 'Sales')

-- Create Employee Table
CREATE TABLE Employee
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  DOB DATETIME,
  DeptID INT
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

/*

1] Simple Views
2] Complex Views


The view that is created based on the columns of a single table,
then it is known as a simple view. 
We can perform all the DML operations on a simple view. 
This is the reason why a simple view 
can also be called an updatable view or dynamic view.
*/

-- View with all columns 
CREATE VIEW vwAllEmployees1 
AS 
SELECT * FROM Employee

-- View with specific columns
CREATE VIEW vwAllEmployees2 
AS 
SELECT ID, Name, Gender
FROM Employee


-- DML Operations on the Simple Views in SQL Server:

SELECT * from vwAllEmployees1

INSERT INTO vwAllEmployees1 (ID, Name, Gender) 
VALUES(7, 'Rohit', 'Male' )

-- When you execute the above insert statement, 
-- it will successfully insert the record into the Employee table.

SELECT * FROM Employee 

UPDATE vwAllEmployees1 SET
  Name = 'Rohit Kumar'
WHERE ID = 7

DELETE FROM vwAllEmployees1 where ID = 7



/********************************************************
        What is a complex view in SQL Server?
*********************************************************

When we create a view based on more than 1 table then it is known as 
a complex view and on a complex view, we may or may 
not perform the DML (INSERT, UPDATE, and DELETE) 
operations and more ever the complex view may not 
update the data correctly on the underlying database tables*/

CREATE VIEW vwAllEmployees3
AS 
SELECT emp.ID, emp.Name, emp.Gender, emp.DOB, 
  dep.Name as DepartmentName
FROM Employee emp
INNER JOIN Department dep
on emp.DeptID = dep.ID



CREATE VIEW vwAllEmployees4
AS 
SELECT Gender, Count(*) as TotalEmployee
FROM Employee Group BY Gender

/*
Can we drop a table that has dependent views on it?
Yes, you can drop a table even if any dependent views are
associated with it, but the views that are associated with 
it will not be dropped. They will still execute in the database 
only with the status as inactive object and all those 
views become active and start functioning provided the
table is recreated.



Can we create a view based on other views?
Yes, It is possible in SQL Server to create a view based on other views. 


We Need Views in SQL Server
To protect the data. If we have a table containing sensitive 
data in certain columns, we might wish to hide 
those columns from certain groups of users. For 
instance, customer names, addresses, and social 
security numbers might all be stored in the same table; 
however, for lower-level employees like shipping clerks, 
you can create a view that only displays customer names 
and addresses. You can grant permissions to a v
iew without allowing users to query the original tables.
A view is a logical table but what it stores internally 
is a select statement that is used for creating the view.
So that whenever a user performs an operation on the view 
like select, insert, update or delete internally the view 
performs those operations on a table.
Simply we can say that view will act as an interface 
between the data provider (Table) and the User.
The view is created based on a table, any changes that 
are performed on the table reflect into the view any changes 
performed on the view reflect on the table also.

If we use the ORDER BY clause, we will get an error stating – 
The ORDER BY clause is invalid in views, inline functions, 
derived tables, subqueries, and common table expressions 
unless TOP, OFFSET, or FOR XML is also specified.

