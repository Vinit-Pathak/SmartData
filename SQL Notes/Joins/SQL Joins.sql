/*-------------------------------------------
          Joins in SQL Server
---------------------------------------------*/

-- drop table employee Table

use office

CREATE TABLE Employee (
  Id INT PRIMARY KEY,
  Name VARCHAR(100) NOT NULL,
  Department VARCHAR(100) NOT NULL,
  Salary FLOAT NOT NULL,
  Gender VARCHAR(45) NOT NULL,
  Age INT NOT NULL,
  City VARCHAR(45) NOT NULL
);

-- Populate Employee Table
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1001, 'John Doe', 'IT', 35000, 'Male', 25, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1002, 'Mary Smith', 'HR', 45000, 'Female', 27, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1003, 'James Brown', 'Finance', 50000, 'Male', 28, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1004, 'Mike Walker', 'Finance', 50000, 'Male', 28, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1005, 'Linda Jones', 'HR', 75000, 'Female', 26, 'London');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1006, 'Anurag Mohanty', 'IT', 35000, 'Male', 25, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1007, 'Priyanla Dewangan', 'HR', 45000, 'Female', 27, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1008, 'Sambit Mohanty', 'IT', 50000, 'Male', 28, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1009, 'Pranaya Kumar', 'IT', 50000, 'Male', 28, 'Mumbai');
INSERT INTO Employee (Id, Name, Department, Salary, Gender, Age, City) VALUES (1010, 'Hina Sharma', 'HR', 75000, 'Female', 26, 'Mumbai');

-- Create Projects Table
CREATE TABLE Projects (
    ProjectId INT PRIMARY KEY IDENTITY(1, 1),
    Title VARCHAR(200) NOT NULL,
    ClientId INT,
    EmployeeId INT,
    StartDate DATETIME,
    EndDate DATETIME,
    FOREIGN KEY (EmployeeId) REFERENCES Employee(Id)
);

-- Populate Projects Table
INSERT INTO Projects (Title, ClientId, EmployeeId, StartDate, EndDate) VALUES 
('Develop ecommerse website from scratch', 1, 1003, GETDATE(), (Getdate() + 35)),
('WordPress website for our company', 1, 1002, GETDATE(), (Getdate() + 45)),
('Manage our company servers', 2, 1007, GETDATE(), (Getdate() + 55)),
('Hosting account is not working', 3, 1009, GETDATE(), (Getdate() + 65)),
('MySQL database from my desktop application', 4, 1010, GETDATE(), (Getdate() + 75)),
('Develop new WordPress plugin for my business website', 2, NULL, GETDATE(), (Getdate() + 85)),
('Migrate web application and database to new server', 2, NULL, GETDATE(), (Getdate() + 95)),
('Android Application development', 4, 1004, GETDATE(), (Getdate() + 60)),
('Hosting account is not working', 3, 1001, GETDATE(), (Getdate() + 70)),
('MySQL database from my desktop application', 4, 1008, GETDATE(), (Getdate() + 80)),
('Develop new WordPress plugin for my business website', 2, NULL, GETDATE(), (Getdate() + 90));

select * from Employee
select * from Projects
/*
Inner Join in SQL Server

The Inner Join in SQL Server is used to return only the matching rows from both the tables
involved in the join by removing the non-matching records. */

SELECT Id as EmployeeID,
       Name, 
	   Department, 
	   City, 
	   Title as Project,
	   ClientId
FROM   Employee 
       INNER JOIN Projects ON Employee.Id = Projects.EmployeeId;




/* Left Join in SQL Server

The LEFT JOIN in SQL Server is used to retrieve all the matching rows from both the tables
involved in the join as well as 
non-matching rows from the left side table. */


SELECT Id as EmployeeID, 
       Name, 
	   Department, 
	   City, 
	   Title as Project, 
	   ClientId
FROM   Employee 
       LEFT JOIN Projects ON Employee.Id = Projects.EmployeeId;

	   SELECT * FROM CartDetails iNNER JOIN Products ON CartDetails.productId = Products.ID
	   SELECT	Products.id as productId ,
				productImage,
				productName,
				brand,
				sellingPrice,
				quantity
	   FROM  Products
	   LEFT JOIN CartDetails ON CartDetails.productId = Products.ID
	   LEFT JOIN CartMaster ON CartMaster.id = CartDetails.cartId

	   SELECT * FROM Products
	   SELECT * FROM CartDetails
	   select * from CartMaster

/*
Right Outer Join in SQL Server

The RIGHT OUTER JOIN in SQL Server is used to retrieve all the matching rows from both the tables 
involved in the join as well as non-matching rows from the right-side table. */

SELECT Id as EmployeeID, 
       Name, 
	   Department, 
	   City, 
	   Title as Project, 
	   ClientId
FROM   Employee 
       RIGHT JOIN Projects ON Employee.Id = Projects.EmployeeId;

/*
Full Outer Join in SQL Server

The Full Outer Join in SQL Server is used to retrieve all the matching records
as well as all the non-matching records from both the tables involved in the JOIN. 
The Un-matching data in such cases will take the NULL values.*/


SELECT Id as EmployeeID, 
       Name, 
	   Department,
	   City, 
	   Title as Project, 
	   ClientId
FROM   Employee 
       FULL JOIN Projects ON Employee.Id = Projects.EmployeeId;

/*
Cross Join in SQL Server

The CROSS JOIN is created by using the CROSS JOIN keyword. 
The CROSS JOIN does not contain an ON clause.
In Cross Join, each record of a table is joined with each record of the other table.*/


SELECT Employee.Id as EmployeeId, 
       Name,
	   Department, 
	   City, 
	   Title as Project
FROM   Employee 
       CROSS JOIN Projects;	

/*
What is Self-Join in SQL Server?

Joining a table by itself is called self-join in SQL Server. 
When we have some relation between the columns within the same table 
then we need to use the self-join mechanism. */

-- Create the Employees table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    EmployeeName VARCHAR(255),
    ManagerID INT
);

-- Insert sample data into the Employees table
INSERT INTO Employees (EmployeeID, EmployeeName, ManagerID)
VALUES
    (1, 'Alice', 3),  -- Alice's manager is Carol (EmployeeID 3)
    (2, 'Bob', 3),    -- Bob's manager is Carol (EmployeeID 3)
    (3, 'Carol', 4),  -- Carol's manager is David (EmployeeID 4)
    (4, 'David', NULL), -- David is a top-level manager (ManagerID is NULL)
    (5, 'Eve', 4);    -- Eve's manager is David (EmployeeID 4)


/*
In this example, we create an "Employees" table with 
three columns: "EmployeeID," "EmployeeName," and "ManagerID." "EmployeeID" 
is set as the primary key to ensure unique values for each employee.


We then insert sample data into the "Employees" table, representing a simple hierarchy:

Alice and Bob report to Carol.
Carol reports to David.
David is a top-level manager with no manager.
Eve also reports to David.
You can use SQL queries to retrieve 
information about employees and their managers based on this table structure. */

select *
from   Employees


SELECT e1.EmployeeName AS Employee, 
       e2.EmployeeName AS Manager
FROM   Employees e1
      left   JOIN Employees e2 ON e1.ManagerID = e2.EmployeeID;

