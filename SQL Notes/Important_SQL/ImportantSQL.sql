

/***********************************************************************************************

                                   Important SQL 

***********************************************************************************************



IIF
Case Statement
Convert
Isnull
Coalesce
Concat
If,Else
*/

-- Create a database
CREATE DATABASE EmployeeDB
GO


--Create PermanentEmployee Table
CREATE TABLE PermanentEmployee
(
  EmployeeId INT,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  Department varchar(50),
  Age INT
)
GO

--Insert Rows into PermanentEmployee Table
INSERT INTO PermanentEmployee VALUES (1,'Pranaya','Male','IT',20)
INSERT INTO PermanentEmployee VALUES (2,'Priyanka','Female','IT',22)
INSERT INTO PermanentEmployee VALUES (3,'Sudhanshu','Male','HR',25)
INSERT INTO PermanentEmployee VALUES (4,'Subrat','Male','Sales',60)
INSERT INTO PermanentEmployee VALUES (5,'Tarun','Male','Sales',54)
INSERT INTO PermanentEmployee VALUES (6,'Lipika','Female','HR',27)
INSERT INTO PermanentEmployee VALUES (7,'Smita','Female','IT',40)
INSERT INTO PermanentEmployee VALUES (8,'Smith','Male','HR',29)

INSERT INTO PermanentEmployee VALUES (9, 'Ashish','Male',null,29)
INSERT INTO PermanentEmployee VALUES (10,null,'Male','HR',29)
INSERT INTO PermanentEmployee VALUES (11,'Ramesh','Male',null,29)


GO




select *
from   PermanentEmployee

/* IIF
IIF can be used for conditional logic in SQL

Simple Conditions: Use IIF for straightforward, 
                   binary conditions where you have one condition to check and two possible outcomes. 
				   It’s more concise and can improve readability for simple checks.

Quick Evaluations: If you only need to evaluate one condition and return two values,
                    IIF is a quick way to express that logic. */







select  EmployeeId
       ,[Name]
	   ,Gender
	   ,Department
	   ,Age
	   ,iif(age>25,'Adult','Younger') as Personality,
	   iif(Gender = 'Male','M','F') as NewGender

from   PermanentEmployee


/*
Case Statement

can be used for conditional logic in SQL

Multiple Conditions: Use CASE when you need to evaluate multiple conditions or ranges. 
                     It’s more versatile as it allows for multiple WHEN clauses.

Complex Logic:       If your logic involves several different possible outcomes or
                     complex expressions, 
                     CASE is clearer and easier to manage.

SQL Standard:        CASE is part of the SQL standard and is supported by all major 
                     database systems
             
*/



select  EmployeeId
       ,[Name]
	   ,Gender
	   ,Department
	   ,Age
	   ,Case when Age>54 then 'Adult'
	         when Age between 20 and 25 then 'Younger'
			 else 'kuch bhi'
		end  as AgeConditions

from   PermanentEmployee



/*
Isnull

Whenever we want to display a default value for null data. 

*/



select *
from   PermanentEmployee

select  EmployeeId
       ,[Name]
	   ,isnull([Name],'Random Name') as NullHandleForName
	   ,Gender
	   ,Department
	   ,Isnull(Department,'Admin')HandleNull
	   ,Age
	  
from   PermanentEmployee

/*
Coalesce
Coalesce function is used to handle the Null values. 
The null values are replaced with user-defined values
during the expression evaluation process. 
This function evaluates arguments in a particular order from the 
provided arguments list and always returns the first non-null value.

*/


select coalesce(null,null,'Random','Ram')



select  EmployeeId
       ,[Name]
	   ,coalesce([Name],'Random Name') as NullHandleForName
	   ,Gender
	   ,Department
	   ,coalesce(Department,'Admin') as HandleNull
	   ,Age
	  
from   PermanentEmployee




/*
Concat

Whenever we required to concat data from different column
*/


select  EmployeeId
       ,[Name]	   
	   ,Gender
	   ,Department
	   ,Age
	   ,Concat([Name],' ',Gender,' ',Department)ConcatColumns,
	   [Name]+ ' ' + Gender as bakwas
	  
from   PermanentEmployee




/*
If,Else

Khud hi smajh lo bacche nahi ho ab

*/

Declare @Name varchar(100) = 'Dinesh',
        @Age  int = 85


If @Name = 'Ashish'
begin 

print 'You are SQL teacher'

end

else 

Print 'you are .net Teacher'



if @Age between 60 and 70
begin

print 'you are very old'

end

if @Age <60
begin

print 'you are younger'

end



if @Age > 80
begin

print 'you are so dead now'

end




