/*-------------------------------------------------------------
                      Stored Procedure 
---------------------------------------------------------------

Why do we need a Stored Procedure in SQL Server?

let us first understand what happens when we execute a simple SQL statement in SQL Server. 
When any SQL Statements are fired on SQL Server, 
then three steps are happening in order which is shown in the below image.

Step-1
1] Syntax are checked 
2] Plan selected
3] Query Execution


Syntax Checked:- 
This step ensures that the syntaxes are correct and there 
is no error and the query is ready for executing on SQL Server.

Plan Selected:- 
Once the syntaxes are checked, the second step is to select a plan.
The SQL Query must be using some tables. 
It will go and check what types of indexes are exists on these tables,
it will also check can use these indexes or a table scan is fine. 
So, the second step is to select a proper execution plan to execute the query.

Query Execution:-
Once the plan is selected, the final step is to 
execute the query and the output is seen by the end-user



Now somehow, if we ensure that the first two steps (i.e. Syntax Checked and Plan Selected) 
are executed only once, would not it be great.

In other words, the first time the SQL is executed, 
the syntaxes are checked, the execution plan is selected 
and the execution plan is cached in memory. So, 
if the same SQL statements are fired again, then these 
two steps are not going to be executed, rather the execution 
plan is taken from the cache and executed and that will definitely 
increase the performance of the application 




This is what exactly the stored procedure does in SQL Server. 
When we create a stored procedure, the syntaxes are checked 
while creating the procedure or we can say at the design. 
When we execute the procedure for the first time, the best 
execution plan is selected and is cached in memory. And after 
that whenever we call the stored procedure, the query execution 
plan is taken from the cache rather than creating again and
again and executed.





What is a Stored Procedure in SQL Server?

A SQL Server Stored Procedure is a database object which 
contains pre-compiled queries (a group of T-SQL Statements).
In other words, we can say that the Stored Procedures are a block of code
designed to perform a task whenever we called.  */


