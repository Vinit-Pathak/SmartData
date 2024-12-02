
/**************************************************************
             -- CTE in SQL Server
***************************************************************

A Common Table Expression (CTE) is a temporary result set that you can 
reference within a SELECT, INSERT, UPDATE, 
or DELETE statement. 

CTEs are defined using the WITH keyword and are
useful for simplifying complex queries, 
making them more readable and manageable.
*/


-- Create the Employees table
CREATE TABLE Employeesss (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    ManagerID INT
);

-- Insert sample data
INSERT INTO Employeesss (EmployeeID, FirstName, LastName, ManagerID)
VALUES
    (1, 'John', 'Doe', NULL),
    (2, 'Jane', 'Smith', 1),
    (3, 'Robert', 'Johnson', 1),
    (4, 'Lisa', 'Williams', 3),
    (5, 'Michael', 'Brown', 2),
    (6, 'Sarah', 'Davis', 2),
    (7, 'David', 'Wilson', NULL);



WITH EmployeeCTE AS (
    SELECT EmployeeID, 
	       FirstName, 
		   LastName, 
		   ManagerID
    FROM   Employeesss
	where ManagerID is not null
)


SELECT *         
FROM    EmployeeCTE 



-- Define the CTE to insert data
;WITH EmployeeToInsert AS (


    SELECT 8 AS EmployeeID, 
   'Mary' AS FirstName, 
   'Jones' AS LastName, 
   1 AS ManagerID

)
-- Insert the data from the CTE into the Employees table
INSERT INTO Employeesss (EmployeeID, FirstName, LastName, ManagerID)
SELECT EmployeeID, FirstName, LastName, ManagerID
FROM EmployeeToInsert;










-- Define the CTE to update data
;WITH EmployeeToUpdate AS (

    SELECT EmployeeID, 
	      'Johnson' AS NewLastName
    FROM Employeesss
    WHERE FirstName = 'Robert'

)
-- Update the data in the Employees table based on the CTE
UPDATE Employeesss
SET LastName = NewLastName
FROM EmployeeToUpdate;


select *
from   Employeesss



-- Define the CTE to select employees to delete
;WITH EmployeeToDelete AS (

    SELECT EmployeeID
    FROM Employeesss
    WHERE FirstName = 'David'
)

-- Delete the selected employees based on the CTE
DELETE FROM Employeesss
WHERE EmployeeID IN (SELECT EmployeeID FROM EmployeeToDelete);


select *
from   Employeesss 






;WITH EmployeeCTE1 AS (
    SELECT EmployeeID, 
	       FirstName, 
		   LastName, 
		   ManagerID
    FROM   Employeesss
)



SELECT e.FirstName AS EmployeeName, 
       m.FirstName AS ManagerName
FROM   EmployeeCTE1 e
LEFT JOIN EmployeeCTE1 m ON e.ManagerID = m.EmployeeID;



-- CTE to remove duplicate data


CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100),
    email VARCHAR(100),
    course VARCHAR(100),
    enrollment_date DATE
);



INSERT INTO students (student_id, student_name, email, course, enrollment_date)
VALUES
(1, 'Alice Brown', 'alice@example.com', 'Math', '2021-09-01'),
(2, 'Bob Smith', 'bob@example.com', 'Science', '2021-06-15'),
(3, 'Alice Brown', 'alice@example.com', 'Physics', '2022-03-20'),
(4, 'Charlie Rose', 'charlie@example.com', 'Math', '2021-11-05'),
(5, 'Alice Brown', 'alice@example.com', 'Chemistry', '2022-05-10'),
(6, 'Bob Smith', 'bob@example.com', 'History', '2021-07-30'),
(7, 'Charlie Rose', 'charlie@example.com', 'Science', '2022-04-12'),

(8, 'Ashish Gaikwad', 'Asg@example.com', 'Science', '2022-04-12'),
(9, 'Samar Rose', 'SR@example.com', 'Science', '2022-04-12'),
(10, 'Charlie Rose', 'charlie@example.com', 'Science', '2022-04-12'),
(11, 'Samar Rose', 'SR@example.com', 'Science', '2022-04-12'),
(12, 'Ashish Gaikwad', 'Asg@example.com', 'Science', '2022-04-12')



select *
from   students


-- Duplicate Data

select *
into   #TestStudents
from   students


select *
from   #TestStudents



;WITH CTE_StudentDuplicates AS (

      
select  student_id, 
        student_name, 
        email, 
        ROW_NUMBER() OVER ( PARTITION BY student_name, email ORDER BY enrollment_date DESC) AS row_num

FROM    #TestStudents

)

	
select *
from   CTE_StudentDuplicates
where  row_num = 1
select *
from   CTE_StudentDuplicates
	
-- Delete all records except the latest one for each duplicate set

--select * from #TestStudents


DELETE 
FROM  #TestStudents
WHERE student_id IN (
                      SELECT student_id
                      FROM CTE_StudentDuplicates
                      WHERE row_num > 1
                    );


select *
from   


------------

