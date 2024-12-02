


/******************************************************************
                   Transaction in SQL server
******************************************************************/

CREATE TABLE #Employee
(
  ID INT PRIMARY KEY,
  Name VARCHAR(50),
  DOB DATETIME
)
GO

-- Populate Employee table with some test data
INSERT INTO #Employee(ID, Name, DOB) VALUES(1, 'Pranaya', '1988-02-29 21:29:16.667')
INSERT INTO #Employee(ID, Name, DOB) VALUES(2, 'Kumar', '1989-03-27 21:29:16.667')
INSERT INTO #Employee(ID, Name, DOB) VALUES(3, 'Rout', '1990-04-15 21:29:16.667')


/*

Begin Tran  -- Starting point of transaction
Rollback    -- Undo the changes
Commit      -- Do permamant changes to the database

*/


select * from #Employee

update #Employee
set    [Name] = 'Rahul'
where  Id = 1


select * from #Employee

select * from INFORMATION_SCHEMA.TABLES



---------------------

Begin tran

update #Employee
set    [Name] = 'RR'
where  Id = 1


-- Rollback
-- commit


select * from #Employee


/*******************************************/

select * from  Patient


begin tran 
update Patient
set    FirstName = 'AA'
where  PatientId = 1


-- Rollback 
-- Commit


/* once you begin the transaction you must either commit it or rollback it
   otherwise it will affect the state of the databse 

   Query to check if any transaction is open or not  */


dbcc opentran



