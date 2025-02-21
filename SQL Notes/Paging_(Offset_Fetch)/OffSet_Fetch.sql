
/* SQL Server OFFSET FETCH

The OFFSET and FETCH clauses are the options
of the ORDER BY clause. 
They allow you to limit the number of rows to be returned by a query. 

Note that you must use the OFFSET and FETCH clauses with
the ORDER BY clause. Otherwise, you will get an error.
*/
create database OffsetAndSorting

use OffsetAndSorting

select *
from   Patient
ORDER BY PatientId
OFFSET 2 ROWS  -- Skip the Provider rows
FETCH NEXT 5 ROWS ONLY;  -- Retrieve the next 5 rows


DECLARE @PageNumber INT = 3;  -- The page number you want to retrieve
DECLARE @PageSize INT = 4;    -- Number of rows per page

select *
from   Patient
Order  by PatientId
offset @PageNumber rows
fetch next @PageSize rows only

-- i want logic for paging and sorting

DECLARE @PageNumber INT = 4;  -- The page number you want to retrieve
DECLARE @PageSize INT = 8;    -- Number of rows per page


select *
from   Patient
Order  by PatientId
offset (@PageNumber - 1) * @PageSize rows
fetch next @PageSize rows only



-- Checkhow this logic works
select *
from   Patient
Order  by PatientId
offset 4 rows
fetch next 2 rows only




-- Calculate the OFFSET and FETCH values based on the page number and page size
DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;
DECLARE @Fetch INT = @PageSize;

-- Use OFFSET and FETCH in your query to retrieve the desired page
SELECT *
FROM Employee
ORDER BY ID -- Replace 'YourColumn' with the column you want to order by
OFFSET @Offset ROWS
FETCH NEXT @Fetch ROWS ONLY;