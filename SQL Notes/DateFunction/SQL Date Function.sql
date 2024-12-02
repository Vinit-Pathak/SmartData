/*-------------------------------------------
            SQL Date Function 
---------------------------------------------

DATENAME()	:- Returns a date part of a date as a character string
DATEPART()	:- Returns a date part of a date as an integer number
DAY()	    :- Returns the day of a specified date as an integer
MONTH()	    :- Returns the month of a specified date as an integer
YEAR()	    :- Returns the year of the date as an integer.   
DATEDIFF()  :- To calculate the difference between two dates in years, months, weeks, etc., you use the DATEDIFF() */



-- DATENAME()

DECLARE @dt DATETIME2= '2020-10-02 10:20:30.1234567 +08:10';

SELECT 'year' date_part, 
    DATENAME(year, @dt) result
UNION
SELECT 'quarter', 
    DATENAME(quarter, @dt)
UNION
SELECT 'month', 
    DATENAME(month, @dt)
UNION
SELECT 'dayofyear', 
    DATENAME(dayofyear, @dt)
UNION
SELECT 'day', 
    DATENAME(day, @dt)
UNION
SELECT 'week', 
    DATENAME(week, @dt)
UNION
SELECT 'weekday', 
    DATENAME(weekday, @dt)
UNION
SELECT 'hour' date_part, 
    DATENAME(hour, @dt)
UNION
SELECT 'minute', 
    DATENAME(minute, @dt)
UNION
SELECT 'second', 
    DATENAME(second, @dt)
UNION
SELECT 'millisecond', 
    DATENAME(millisecond, @dt)
UNION
SELECT 'microsecond', 
    DATENAME(microsecond, @dt)
UNION
SELECT 'nanosecond', 
    DATENAME(nanosecond, @dt)



-- DATEPART()

DECLARE @d DATETIME = '2019-01-01 14:30:14';
SELECT 
   DATEPART(year, @d) year, 
   DATEPART(quarter, @d) quarter, 
   DATEPART(month, @d) month, 
   DATEPART(day, @d) day, 
   DATEPART(hour, @d) hour, 
   DATEPART(minute, @d) minute, 
   DATEPART(second, @d) second;




-- DAY()
SELECT DAY('2030-12-01') [DAY];

	    
--MONTH()
SELECT  MONTH('2020-12-01') [month];

-- YEAR()
SELECT YEAR('2019-02-01') [year];




-- DATEDIFF

DECLARE 
    @start_dt DATETIME2= '2019-12-31 23:59:59.9999999', 
    @end_dt DATETIME2= '2020-01-01 00:00:00.0000000';

SELECT 
    DATEDIFF(year, @start_dt, @end_dt) diff_in_year, 
    DATEDIFF(quarter, @start_dt, @end_dt) diff_in_quarter, 
    DATEDIFF(month, @start_dt, @end_dt) diff_in_month, 
    DATEDIFF(dayofyear, @start_dt, @end_dt) diff_in_dayofyear, 
    DATEDIFF(day, @start_dt, @end_dt) diff_in_day, 
    DATEDIFF(week, @start_dt, @end_dt) diff_in_week, 
    DATEDIFF(hour, @start_dt, @end_dt) diff_in_hour, 
    DATEDIFF(minute, @start_dt, @end_dt) diff_in_minute, 
    DATEDIFF(second, @start_dt, @end_dt) diff_in_second, 
    DATEDIFF(millisecond, @start_dt, @end_dt) diff_in_millisecond;


