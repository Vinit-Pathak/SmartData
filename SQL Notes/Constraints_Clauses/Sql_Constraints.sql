/*------------------------------------------------------
            Constraints in SQL Server
--------------------------------------------------------

What is Data Integrity in SQL Server?

1] Data integrity means the data contained in the database is accurate, 
2] consistent, and reliable. To provide data integrity, 
   RDBMS provides us with a set of integrity constraints that ensures that 
   the data entered into the database is going to be accurate, consistent, and reliable. 
   This is the reason why the end-user can trust the data.

What is a Constraint in SQL Server?

1] We can define the SQL Server Constraint as a property 
   that can be assigned to a column or columns of a table. 
   
2] The SQL Server Constraints are mainly used to maintain data integrity. 

3] The SQL Server Constraints are used to restrict the insertion of unwanted data in any columns 
*/





/* Types Of Constraints 

1]  Default Constraint   
2]  UNIQUE KEY constraint
3]  NOT NULL constraint
4]  CHECK KEY constraint
5]  PRIMARY KEY constraint
6]  FOREIGN KEY constraint.


NULL  :- Please check the Image in teams



[Default Constraint]  

-- default value that is defined during the creation of a table 
   if the user does not supply any value while inserting the data.**/

CREATE TABLE Employee (
    ID int NOT NULL,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255),
    Age int,
    City varchar(255) DEFAULT 'Mumbai',  -- use of default constraints 
    DateOfBirth date DEFAULT GETDATE(),
    Salary   DECIMAL (18, 2) DEFAULT 5000.00    -- use of default constraints 
)


Insert into Employee (ID, LastName, Age) values(1, 'Rout', 30)

select * from Employee

/*

[NOT NULL Constraint ]

When you want a column not to accept NULL then you need to apply the NOT NULL constraint to that column. 
That means this constraint is used to avoid NULL values but it accepted duplicate values into a column. */

CREATE TABLE customer 
( 
    id    INT NOT NULL, 
    name  VARCHAR(30) NOT NULL, 
    mobno CHAR(10) NOT NULL 
) 



INSERT customer VALUES (101, 'AA', '1111111111')--ALLOWED 
INSERT customer VALUES (101, 'AA', '2222222222')--ALLOWED 
INSERT customer VALUES (NULL, NULL, NULL)--NOTALLOWED 
/*


[UNIQUE Constraint]

When you want a column or columns not to accept any duplicate values, 
then you need to apply UNIQUE Constraint to that column or columns. 
That means the UNIQUE constraint is used to avoid duplicate values 
but it accepts a single NULL value in that column. */

CREATE TABLE Customers 
( 
    Id      INT UNIQUE, 
    NAME    VARCHAR(300) UNIQUE, 
    Emailid VARCHAR(100) UNIQUE 
) 


INSERT customers  VALUES (10,  'AA',  'pranayakumar777@gmail.com')
INSERT customers  VALUES (10,  'AA',  'pranayakumar777@gmail.com')




-- Creating Constraint with own name: this is column level constraints 

CREATE TABLE customer_OwnName 
( 
    Id      INT CONSTRAINT cid_unique UNIQUE, 
    NAME    VARCHAR(30), 
    Emailid VARCHAR(100) CONSTRAINT email_unique UNIQUE 
) 
	

-- Imposing Constraint on Table Level:

CREATE TABLE CustomerTbl 
( 
    Id      INT, 
    NAME    VARCHAR(30), 
    Emailid VARCHAR(100),
    CONSTRAINT cid_unique UNIQUE(Id),          --  Table Level:  
    CONSTRAINT email_unique UNIQUE(Emailid)    --  Table Level:
) 



----------------------------------------------
--      Primary Key in SQL Server
----------------------------------------------
/*

1] The Primary Key in SQL Server is the combination of Unique and Not Null Constraint.
   That means it will not allow either NULL or Duplicate values into 
   a column or columns on which the primary key constraint is applied.
   
2] Using the primary key we can enforce entity integrity 
   i.e. using the primary key value we should uniquely identify a record.

3] A table should contain only 1 Primary Key which can be either on a single or multiple columns
   i.e. the composite primary key. */


CREATE TABLE Branches 
( 
    Bcode INT PRIMARY KEY, 
    Bname VARCHAR(40), 
    Bloc  CHAR(40) PRIMARY KEY 
) 

-- Abobe query will give you an error 


CREATE TABLE Branches 
( 
    Bcode INT PRIMARY KEY, 
    Bname VARCHAR(40), 
    Bloc  CHAR(40) 
) 


---Composite Primary Key 

CREATE TABLE BranchDetails 
( 
    City  VARCHAR(40), 
    Bcode INT, 
    Bloc  VARCHAR(30), 
    PRIMARY KEY(City, Bcode) --  Composite Primary Key 
) 


----------------------------------------------
--      Foreign  Key in SQL Server
/*----------------------------------------------

What is a Foreign Key Constraint in SQL Server?

1] One of the most important concepts in a database is, 
   creating the relationship between the database tables. 
   This relationship provides a mechanism for linking the data stores 
   in multiple tables and retrieving them in an efficient manner.

2] In order to create a link between two tables, 
   we must specify a Foreign Key in one table that references a column in another table. 
   That means Foreign Key constraint is used for binding two tables with each other 
   and then verify the existence of one table data in other tables.

3] A foreign key in one TABLE points to a primary key or unique key in another table. 
   The foreign key constraints are used to enforce referential integrity.

   -----------------------------------------------------------

How to Create Foreign Key Constraint in SQL Server?

To Create a Foreign Key Constraint in SQL Server we require the following things

1] We require two tables for binding with each other and 
   those two tables must have a common column for linking the tables.

2] The common column that is present in both the tables need not have 
   the same name but their data type must be the same.

3] The common column that is present under the parent table or master table is 
  known as the reference key column and moreover, 
  the reference key column should not contain any duplicate values. 
  So we need to impose either UNIQUE or PRIMARY key constraint on that column.


4] If we impose the primary key constraint on the reference key column that column will 
   also be the identity column of the table.
   The common column which is present in the child or 
   detailed table is known as the Foreign key column and we need
   to impose a Foreign key constraint on the column which refers 
   to the reference key column of the master table. */


CREATE TABLE Dept 
( 
    Dno   INT PRIMARY KEY, 
    Dname VARCHAR(30), 
    Dloc  CHAR(40) 
) 
GO

INSERT Dept VALUES (10, '.NET', 'HYD') 
INSERT Dept VALUES (20, 'JAVA', 'PUNE') 
INSERT Dept VALUES (30, 'PHP', 'DELHI') 
Go

Select * from Dept
Go


CREATE TABLE Employee 
( 
    Eid    INT PRIMARY KEY, 
    Ename  VARCHAR(30), 
    Salary MONEY, 
    Dno    INT FOREIGN KEY REFERENCES Dept(Dno) 
) 


INSERT into Employee VALUES (101,'AA', 25000, 10) -- Allowed
INSERT into Employee VALUES (102,'BB', 32000, 20) -- Allowed
INSERT into Employee VALUES (103,'CC', 52000, 40) -- Not Allowed

/*
Rule1: Cannot insert a value into the foreign key column provided that 
       value is not existing in the reference key column of the parent (master) table. */

INSERT into Employee VALUES (105,'EE', 42000, 50) -- Not Allowed 

/*
Rule2: Cannot update the reference key value of a parent table provided that the value has a 
       corresponding child record in the child table without addressing what to do with the child records.*/

UPDATE DEPT SET DNO = 100 WHERE DNO = 10  -- Not Allowed

/*
Rule3: Cannot delete a record from the parent table provided that 
       records reference key value has child record in the child 
	   table without addressing what to do with the child record.*/

DELETE FROM DEPT WHERE DNO = 20  --  Not Allowed