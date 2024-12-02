----------------------------------------------------

CREATE PROCEDURE spDisplayWelcome
AS
BEGIN
  PRINT 'WELCOME TO PROCEDURE in SQL Server'
END

/*------------------------------------------------------


Calling a Stored Procedure: */

EXECUTE spDisplayWelcome

EXEC spDisplayWelcome

spDisplayWelcome

------------------------------------------------------



-- Create Employee Table
CREATE TABLE Employee100
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  Gender VARCHAR(50),
  DOB DATETIME,
  DeptID INT
)
GO

-- Populate the Employee Table with test data
INSERT INTO Employee100 VALUES(1, 'Pranaya', 'Male','1996-02-29 10:53:27.060', 1)
INSERT INTO Employee100 VALUES(2, 'Priyanka', 'Female','1995-05-25 10:53:27.060', 2)
INSERT INTO Employee100 VALUES(3, 'Anurag', 'Male','1995-04-19 10:53:27.060', 2)
INSERT INTO Employee100 VALUES(4, 'Preety', 'Female','1996-03-17 10:53:27.060', 3)
INSERT INTO Employee100 VALUES(5, 'Sambit', 'Male','1997-01-15 10:53:27.060', 1)
INSERT INTO Employee100 VALUES(6, 'Hina', 'Female','1995-07-12 10:53:27.060', 2)
GO

----------------------------------------------


/*

spGetEmployee

*/

CREATE PROCEDURE spGetEmployee
AS
BEGIN
  Select [Name], 
         Gender, 
		 DOB 
from     Employee100

END


-----------------------------------------------

-- To Execute the Procedure
EXEC spGetEmployee

-------------------------------------------------


/*


spGetEmployeesByGenderAndDepartment @Gender = 'Male',
                                    @DeptID = 1

spGetEmployeesByGenderAndDepartment @DeptID = 1,
                                    @Gender = 'Male'
                                    

spGetEmployeesByGenderAndDepartment 'Male',  -- valid
                                     1

spGetEmployeesByGenderAndDepartment 1,           -- invalid
                                    'Male' 


*/


CREATE PROCEDURE spGetEmployeesByGenderAndDepartment  @Gender VARCHAR(20),
                                                      @DeptID INT
AS
BEGIN
  SELECT [Name],
         Gender, 
		 DOB, 
		 DeptID 

  FROM   Employee100
  WHERE  Gender = @Gender AND DeptID = @DeptID
END
GO


--------------------------------------------------------------

/*


*/

select *
from   Employee100

update Employee100
set    [Name] = 'Ashish',
       Gender = 'Male'
where  id = 1


/*
spUpdateEmployeeByID 
@ID  = 2,   
@Name  = 'XYZ' , 
@Gender = 'Other',
@DOB    = '1996-02-29',
@DeptID = 2


select *
from   Employee100 

*/

-- Create a Procedure
CREATE PROCEDURE spUpdateEmployeeByID
(
  @ID         INT, 
  @Name       VARCHAR(50), 
  @Gender     VARCHAR(50), 
  @DOB        DATETIME, 
  @DeptID     INT
)
AS
BEGIN
  UPDATE Employee100 
  SET    [Name] = @Name, 
         Gender = @Gender,
         DOB = @DOB, 
         DeptID = @DeptID
  WHERE  ID = @ID
END
GO

-- Executing the Procedure
-- If you are not specifying the Parameter Names then the order is important
EXECUTE spUpdateEmployeeByID 3, 
                             'Palak', 
							 'Female',
							 '1994-06-17 10:53:27.060',
							 3

-- If you are specifying the Parameter Names then order is not mandatory
EXECUTE spUpdateEmployeeByID @ID =3, 
                             @Gender = 'Female', 
							 @DOB = '1994-06-17 10:53:27.060',
							 @DeptID = 3, 
							 @Name = 'Palak'