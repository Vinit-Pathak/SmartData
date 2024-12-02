/*----------------------------------------------------------
      
	  Normalization and Denormalization in SQL Server
-----------------------------------------------------------

1] The database is a centralized place to store the data and it should not accept duplicate, bad, and redundant data to store in it.
   So, that the end-user can trust the data i.e. the Data Integrity should be there. 
   In order to achieve this, the first and most important thing is how you design your database? 
   What kind of database design principles you are following?

2] Before going to understand the first, second, and third normal forms, 
   let us first understand what are the basic design mistakes database developers normally does.
   Once you understand the design mistakes, then you can easily understand the first, second, and third normal forms.



********************      Design Mistake 1: No Proper Primary and Unique Key ***********************************

The first database design mistake the developers are doing is they don’t put the proper primary key and unique keys or candidate keys. 
In order to understand this, please have a look at the following customer table. */


CREATE TABLE Customer(
 CustomerId INT IDENTITY (1, 1),
 Name VARCHAR(200),
 Code VARCHAR(200),
 PhoneNumber VARCHAR(200),
 SSN VARCHAR(200),
 Product VARCHAR(200)
)


-- Insert sample data into the table 


/*
The customer Code and SSN (Social Security Number) value should be unique for a customer. 
It should now accept any duplicate values. But here, as you can see,
we have not applied any key (primary or unique) on these two columns, 
so it accepts duplicate values it as shown in the following image. */


/* Now, let us solve the above problem by adding a unique key on Code and SSN column. But before that, 
   we need to truncate the table. So, please execute the following SQL Script. */


TRUNCATE TABLE Customer;

ALTER TABLE Customer  
ADD CONSTRAINT UK_Customer_Code UNIQUE (Code);  

ALTER TABLE Customer  
ADD CONSTRAINT UK_Customer_SSN UNIQUE (SSN);  /*



********************** Design Mistake 2: Multiple values into a single column *************************

The second design mistake people do is, they are adding multiple values into a single column. 
For example, let say a customer buys multiple products, then what people are doing is, 
they are adding all products in a single column separated them either by comma or pipe symbol as shown below. */

CREATE TABLE Customerss(
 CustomerId INT IDENTITY (1, 1),
 Name VARCHAR(200),
 Code VARCHAR(200),
 PhoneNumber VARCHAR(200),
 SSN VARCHAR(200),
 Product VARCHAR(200)
)



insert into Customerss(Name,Code,PhoneNumber,SSN,Product)
values ('Ashish','111012','9370531513,7418529632,6543214568','121-23-111','Fan'),
       ('Vasudha','111013','8370531513,6418529632,4444214568','121-24-112','Laptap')

/*
As you can see in the Product column we are adding three values. We need to understand that, it’s a column, not a whole. It should have an atomic value. The problem is that you can put duplicate data. In other
to solve the above problem, what people are doing is,
they are adding three columns to the table as shown below.


******************************************  Design Mistake 3: Repeating Group problems ********************************************

Repeating group problems means we are creating columns that are exactly the same (Product1, Product2, and Product3). 
Why these three columns are existing, now one knows. Again, tomorrow, 
if you want to add the fourth product, then again you need to add one more column into the table.

In order to solve the above repeating group problem what we need to do is we need to create another table called Product i.e. 
to resolve this problem we need to split the table. So, what we are going to do is, 
are going to create two tables, one table is going to hold Customer data and the other table is going to hold product information. */


CREATE TABLE Product(
[ProductId] [int] PRIMARY KEY,
 [ModelId] [int] UNIQUE,
 [ProductName] [nvarchar](50) NULL,
 [ProductCost] [money] NULL, 
 [ModelName] [nvarchar](50) NULL,
 [ManufacturerName] [nvarchar](50) NULL
);


/*
Modifying the Customer table:
From the Customer table, we are going to remove the Product1, Product2, and Product3 columns. 
Then we will add ProductId and ModelId as foreign key columns which will reference the ProductId and ModelId column of the Product table.
To keep things simple, first, we will delete the Customer table and then we will create the customer table with new columns.
To do so, please execute the following SQL Script.


*/


DROP TABLE Customer;

CREATE TABLE [Customer](
 [CustomerId] [int] PRIMARY KEY,
 [Name] [varchar](200) NULL,
 [Code] [varchar](200) NULL,
 [PhoneNumber] [varchar](200) NULL,
 [SSN] [varchar](200) NULL,
 [ProductId] INT FOREIGN KEY REFERENCES Product(ProductId),
 [ModelId] INT FOREIGN KEY REFERENCES Product(ModelId)
)


/*

That’s fine. There is no redundancy data or column. 
But this design is not what we are expecting. 
One customer can buy multiple products.
But putting the ProductId and ModelId column here means one customer can buy only one product. That is one to one relationship.

So, this design will not fit here. Here, 
we need to introduce an intermediate table that has reference to both Product (ProductId and ModelId) and Customer (CustomerId) table. 
That means we need to create a table that has many to many relationships between Customer and Product table i.e.
one customer can buy multiple products and multiple products can be bought by multiple customers.

First, delete the ProductId and ModelId column from the Customer table. Once you delete those two columns, 
your Customer table should look as below.




Creating ProductCustomerMapping table:

Please execute the below script to create the ProductCustomerMapping table.
This table maintains many to many relationships between the Customer and Product table. 
It has a reference to the CustomerId column of the Customer table as well as a reference 
to the ProductId and ModelId column of the Product table. */



CREATE TABLE [ProductCustomerMapping](
 [ProductCustomerId] INT PRIMARY KEY,
 [CustomerId] INT FOREIGN KEY REFERENCES Customer(CustomerId),
 [ModelId] INT FOREIGN KEY REFERENCES Product(ModelId),
        [ProductId] INT FOREIGN KEY REFERENCES Product(ProductId)
);


/******************************************************************

1. First Normal Form (1NF)

