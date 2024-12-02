use test;


Declare @number int;
--select @number=2;
set @number=2;

--if 
if @number is null
begin
select 'null value found'
end
else
begin
select 'null value not found'
end


--case 
select case when @number is null then 'null' else 'not null' end


--while
/*
*
* *
* * *
* * * *
* * * * *

DECLARE @i INT = 1,
		@stars varchar(MAX) = '';

WHILE @i <= 5
BEGIN
    SET @stars = @stars + '* ';
    PRINT @stars;
    SET @i = @i + 1;
END;

declare @min int = 1,
		@max int = 5,
		@star varchar(max) = ''
while @min <= @max
begin
	print replicate('* ',@min)
	set @min = @min + 1
end
*/

/*
* * * * * 
* * * *
* * *
* *
*

declare @min int = 1,
		@max int = 5,
		@star varchar(max) = ''
while @max >= @min
begin 
	set @star = @star + '* '
	print replicate('* ', @max)
	set @max = @max - 1
end
*/

/*
Factorial

declare @num int = 5,
		@fact int = 1,
		@i int = 1;

while @i <= @num
begin
	set @fact = @fact * @i
	set @i = @i + 1
end
print @fact;
*/

/*
Fibonacci Series

declare @n int = 5,
		@a int = 0, 
		@b int = 1, 
		@i int = 1,
		@c int;

while @i <= @n
begin
	print @a
	set @c = @a + @b
	set @a = @b
	set @b = @c
	set @i = @i + 1
end

*/


/*
--Palindrome Number

declare @n int = 121,
		@num int,
		@digit int,
		@rev int = 0

set @num = @n
while @n <> 0
begin
	set @digit = @n % 10
	set @rev = (@rev * 10) + @digit
	set @n = @n / 10
end
if @num = @rev
print cast(@num as varchar) + ' is palindrome number'
else
print cast(@num as varchar) + ' is not a palindrome number'
 
*/

/*
Armstrong Number

declare @num int = 154,
		@orgNum int,
		@rem int,
		@result int = 0
set @orgNum = @num
while @orgNum <> 0
begin++++++
	set @rem = @orgNum % 10
	set @result = @result + (@rem*@rem*@rem)
	set @orgNum = @orgNum / 10
end

if @result = @num
print cast(@num as varchar) + ' is an armstrong number'
else
print cast(@num as varchar) + ' is not an armstrong number'

*/

--isnull()

Declare @id int

select isnull(@id,0) + 3


--Case
declare @num int = 3
select case when @num is null then 'null' else 'not null' end

--Window Function

create table member(
	Id int primary key,
	Name varchar (25),
	Point int
)

insert into member values (1, 'Sachin', 978)
insert into member values (2, 'Rahul', 773)
insert into member values (3, 'Kamlesh', 1141)
insert into member values (4, 'Chirag', 773)
insert into member values (5, 'Pratik', 1242)
insert into member values (6, 'Rajesh', 1141)
insert into member values (7, 'Anil', 886)

select * from member

select ROW_NUMBER() OVER(ORDER BY [Name] desc) AS SrNo, Name, id
from member;

select ROW_NUMBER() OVER (PARTITION BY Point ORDER BY Point desc) as [Rank], Name, Point 
From member


select RANK() OVER (Order by Point desc) As [Rank], Name, Point From member;
select DENSE_RANK() OVER (Order by Point desc) as [Rank], Name, Point From member;
select NTILE(5) Over (Order by Point desc) as [Rank], Name, Point from member;

--or

SELECT Name, Point  
, ROW_NUMBER() OVER(ORDER BY Point desc) AS [ROW_NUMBER]  
, RANK() OVER( ORDER BY Point desc) AS [RANK]  
, DENSE_RANK() OVER( ORDER BY Point desc) AS [DENSE_RANK]  
FROM member  



