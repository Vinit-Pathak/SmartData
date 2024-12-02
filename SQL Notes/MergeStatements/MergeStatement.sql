
/*

1] The MERGE statement in SQL is a very popular clause that can handle 
   inserts, updates, and deletes all in a single transaction 
   without having to write separate logic for each of these. 
   
2] You can specify conditions on which you expect the MERGE statement to insert, update, or delete, etc.

3] Using the MERGE statement in SQL gives you better 
   flexibility in customizing your complex SQL scripts and
   also enhances the readability of your scripts. 
   
4] The MERGE statement basically modifies an existing table 
   based on the result of comparison between the key fields with 
   another table in the context.





*/









-- Sample data for TargetTable
CREATE TABLE TargetTable (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Salary DECIMAL(10, 2)
);

INSERT INTO TargetTable (ID, Name, Salary)
VALUES (1, 'John', 50000),
       (2, 'Jane', 60000),
       (3, 'Bob', 70000);

-- Sample data for SourceTable
CREATE TABLE SourceTable (
    ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Salary DECIMAL(10, 2)
);

INSERT INTO SourceTable (ID, Name, Salary)
VALUES (1, 'John', 55000),
       (2, 'Jane', 60000),
       (4, 'Alice', 80000);



select * from SourceTable
select * from TargetTable



/* Merge Statement */

MERGE INTO TargetTable AS target
USING SourceTable AS source
ON target.ID = source.ID

WHEN MATCHED THEN
    UPDATE SET
        target.Name = source.Name,
        target.Salary = source.Salary
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ID, Name, Salary)
    VALUES (source.ID, source.Name, source.Salary)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;




/*
Explanation:

1] MERGE INTO TargetTable AS target: Specifies the target table and assigns it an alias.
2] USING SourceTable AS source: Specifies the source table and assigns it an alias.
3] ON target.ID = source.ID: Defines the join condition between the target and source tables.
4] WHEN MATCHED THEN UPDATE SET ...: Specifies the update action when a match is found.
5] WHEN NOT MATCHED BY TARGET THEN INSERT ...: Specifies the insert action 
6] when there is no match in the target table.
7] WHEN NOT MATCHED BY SOURCE THEN DELETE: Specifies the delete action 
when there is no match in the source table.

*/


/*

MergeEmployeeData @ID = 102,
                  @Name = 'John D',
				  @Salary = 55000;


select * from TargetTable

*/





CREATE PROCEDURE MergeEmployeeData   @ID INT,
                                     @Name NVARCHAR(100),
                                     @Salary DECIMAL(10, 2)
AS
BEGIN
    -- Using MERGE to synchronize source with target

MERGE INTO TargetTable AS target
USING (
        SELECT @ID AS ID, 
               @Name AS Name, 
	           @Salary AS Salary
	   ) AS source

ON target.ID = source.ID
    
-- Update if matched
WHEN MATCHED THEN
     UPDATE SET 
        target.Name   = source.Name,
        target.Salary = source.Salary

-- Insert if no match in target
WHEN NOT MATCHED BY TARGET THEN
     INSERT (ID, Name, Salary)
     VALUES (source.ID, source.Name, source.Salary)

-- Delete if no match in source (optional, based on your use case)
WHEN NOT MATCHED BY SOURCE THEN
    DELETE;
END







