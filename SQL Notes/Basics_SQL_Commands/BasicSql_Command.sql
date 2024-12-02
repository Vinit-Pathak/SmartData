-- DataBase
Create database MyFirstDB   -- To create Database
use MyFirstDB               -- To select database

Alter database MyFirstDB Modify Name = MyFirst -- Used to Modify the database name 

-----------------------------------------------------------------
         -- Different Types of SQL Commnd ---
/*-----------------------------------------------------------------

1] DDL (commands- create, alter, sp_rename, drop, truncate)
2] DML (commands- Insert, Update, Delete).
3] DQL (command- select).
4] TCL (commands- commit, rollback, savepoint)
5] DCL (commands- Grant, Revoke). */




---------------------------------------------------------------------
--        Rules for creating a table in SQL Server:
/*---------------------------------------------------------------------

1] The table name should be unique under a database.
2] The column name should be unique within the table definition.
3] A Table name should not start with numeric and special characters except the (-) underscore symbol.
4] Don’t provide space in the table name. If you want to provide space in a table name then you can use the underscore symbol.
5] A table name should contain a minimum of 1 character and a maximum of 128 characters.
6] A table should contain a minimum of 1 column and a maximum of 1024 columns.*/

select * from student

CREATE TABLE student 
( 
    studid INT, 
    sname  VARCHAR(max), 
    salary DECIMAL(6, 2) 
) 


ALTER TABLE Student 
ALTER COLUMN sname VARCHAR(100) -- Command to change data type of a column 


ALTER TABLE Student 
ALTER COLUMN salary DECIMAL(6, 2) NULL -- Command to change from Null to Not Null


ALTER TABLE Student 
ADD Branch VARCHAR(20)   -- Command to Add new column to Existing table 


ALTER TABLE Student 
DROP  COLUMN Branch    -- Command to drop column from existng table 


 
sp_rename 'StudentDetails.salary', 
          's', 'COLUMN'; -- Commant is used to rename column name 


SP_RENAME 'Student', 
          'StudentDetails' -- Command to rename table name

Truncate Table  StudentDetails -- Command to Truncate table 

/* FYI :- Whenever you want to delete all the records or rows from a table without any condition, 
         then you need to use the Truncate command in SQL Server. 
		 So, using this command you cannot delete specific records from the table 
		 because the truncate command does not support the “where” clause. */



DROP TABLE StudentDetails  -- Command to drop table from database 




		
