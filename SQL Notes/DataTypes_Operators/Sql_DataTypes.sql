---------------------------------------------
         --SQL Server Data Types
/*---------------------------------------------

What is SQL Server Data Type?

1] The SQL Server Data Types are the attribute that 
   specifies what types of data entered by the user 
   such as integer, character, decimal, date time, etc. 
	

Integer data types             ==  [Tiny(0-255) 1Byte,
                                    Smallint(-32768 to 32767) 2Byte,
									int(-2,147,483,648 to 2,147,483,647) 4Byte,
									Bigint(-9,223,372,036,854,775,808
									to 9,223,372,036,854,775,807) 8byte
Decimal data types             ==  [Decimal (P, S)] 
                                    P-Precision (P):The Precision 
									is nothing but the maximum number of 
								    digits that we can store both 
									to the left side and right side of the 
									decimal point. ex- Decimal (18, 0)
									Precision should have a value from 1 to 38. 
									That is the minimum value is 1 and 
									the maximum value is 38. 
									The default value of precision is 18.

Scale (S):The scale is nothing but it just indicates 
          the maximum number of decimal digits that 
		  we can store to the right of the decimal point.
		  
		  The most important point that you need to remember is the
		  default value of a scale is 0
		  and the maximum value of the scale depends on the precision value. 

		  
Example

declare @Price Decimal(7,1) 
set @Price = 12345.678
select @Price


Price Decimal (6,2)
1.0 OK
23.51 OK
473.5 OK
7231.52 OK
357.761 WRONG
74531.1 OK
745321.21 WRONG
12345.678 WRONG


											  

Date and Time data types      == Date :- The default 
 format of the date data type is ‘YYYY/MM/DD’

 DateTime :- The default 
format of DateTime data type is ‘YYYY/MM/DD hh:mm: ss.ms’.


example

declare @Todaydate date  ,  
		@TodaydateTime datetime

set @Todaydate     = getdate()
set @TodaydateTime = getdate()

select @Todaydate 
select @TodaydateTime


Character data types          
== 1] Fixed length       [ char (Size),nchar(size)] 
   2] Variable length    [varchar (size/max),nvarchar(size)]



Char (size):
It is a fixed-length data type (static data type).
It will store the data type in the Non-Unicode 
mechanism that means it will occupy 1byte for 1 character.
The maximum length of the char data type is from 1 to 8000 bytes.

Disadvantages: memory wastage because size cannot be changed at runtime

Varchar (size/max):
It is a variable-length data type (dynamic data type) and will 
store the character 
in a non-Unicode manner that means it will take 1 byte for 1 character.
The maximum length of the varchar data type is from 1 to 8000 bytes


nchar(Size) data type:
It is a fixed-length data type and will stores the characters in the 
Unicode manner 
that means it will take 2bytes memory per single character.
The maximum length of nchar data type is from up to 4000bytes.


Nvarchar(size/max) data type:
It is a variable-length data type and will store the 
data type in the Unicode manner 
that means it will occupy 2bytes of memory per single character.
The maximum length of nvarchar data type is from up to 4000 bytes.



Boolean/Bit Type: 
To hold the Boolean values it provides a bit data type 
that can take a value of 1, 0, or NULL.

Note: The string values TRUE and FALSE can be converted to bit values. 
TRUE is converted to 1 and FALSE is converted to 0.

*/

declare @isdead bit
set @isdead = 0
select @isdead

select * from
--drop table DataTypeMaster


 --  single line comment
/*
multi line comment 
*/

CREATE TABLE DataTypeMaster (
    -- Integer types
    IntColumn INT,
    SmallIntColumn SMALLINT,
    BigIntColumn BIGINT,
    
    -- Numeric types
    DecimalColumn DECIMAL(10, 2),
    FloatColumn FLOAT,
    
    -- Character strings
    CharColumn CHAR(10),
    VarcharColumn VARCHAR(255),
    TextColumn TEXT,
    
    -- Date and time
    DateColumn DATE,
    TimeColumn TIME,
    DateTimeColumn DATETIME,
    
    -- Binary data
    BinaryColumn VARBINARY(1024),
    ImageColumn IMAGE,
    
    -- Boolean
    BitColumn BIT,
    
    -- Miscellaneous
    UniqueIdentifierColumn UNIQUEIDENTIFIER,
    XmlColumn XML,
    MoneyColumn MONEY,
    RealColumn REAL,
    
    -- Auto-increment primary key
    IDColumn INT IDENTITY(1, 1) PRIMARY KEY
);





INSERT INTO DataTypeMaster (IntColumn, SmallIntColumn, BigIntColumn, DecimalColumn, FloatColumn,
                         CharColumn, VarcharColumn, TextColumn, DateColumn, TimeColumn,
                         DateTimeColumn, BinaryColumn, ImageColumn, BitColumn,
                         UniqueIdentifierColumn, XmlColumn, MoneyColumn, RealColumn)
VALUES
   (123, 456, 789, 123.45, 1234.56,
    'Char', 'SampleVarchar', 'SampleText', '2023-10-11', '15:30:00',
    '2023-10-11 15:30:00', 0x1234ABCD, 0x12FFAAEE, 1,
    'E28A736B-CDF4-4A29-A09E-83E4D80E2A4E', '<data>Sample XML</data>', 100.50, 3.14);


select CharColumn,VarcharColumn from DataTypeMaster


-- Display the inserted data
SELECT datalength(CharColumn)LengthOfChar,
       datalength(VarcharColumn)LengthOfVarchar 
FROM DataTypeMaster;

/*--------------------------------------------------------------------------------
Note :- above example tells what is fixed length and what is variable length 
----------------------------------------------------------------------------------