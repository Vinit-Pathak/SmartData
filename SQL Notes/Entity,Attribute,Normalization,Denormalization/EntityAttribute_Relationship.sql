-- Command to create database
create database [xyz]
use [xyz]

select * from  INFORMATION_SCHEMA.TABLES


/*----------------------------------------------------------
      Entity_Attribute_Relationship in SQL Server
-----------------------------------------------------------

1. Entity
Definition : An entity represents a distinct object, person, place, or 
concept that can be identified and has attributes. In database design,
            entities are often represented as tables.

Explanation: Entities are essentially objects or things we want to 
store information about.
             Each entity in a database corresponds to a table, 
			 and the columns in that 
			 table represent attributes of the entity.

Example    : Consider a university database. Two possible entities 
might be Student and Course.




Entity: Student
Represents an individual student.
Attributes might include: StudentID, FirstName, LastName, DateOfBirth, Email. */

CREATE TABLE Student (
    StudentID INT PRIMARY KEY,       -- Unique identifier for each student
    FirstName VARCHAR(50),           -- First name of the student
    LastName VARCHAR(50),            -- Last name of the student
    DateOfBirth DATE,                -- Date of birth of the student
    Email VARCHAR(100)               -- Email address of the student
)

/*

Attributes
Definition : Attributes are properties or details about an entity. 
    Each attribute provides a specific piece of information 
	about an entity.

Explanation: Attributes are the columns in a table
 and store data for each instance of the entity. They help to define the 
             characteristics of the entity and are used 
			 to retrieve and manage data.

Example    : For the Student entity, the attributes are:

StudentID: A unique identifier for each student.
FirstName: The student’s first name.
LastName: The student’s last name.
DateOfBirth: The student’s date of birth.
Email: The student’s email address.


*/

CREATE TABLE Student (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE,
    Email VARCHAR(100)
);




/*********************      Relationship    ****************

Definition: A relationship defines how two or more entities are 
related to each other. Relationships can be categorized as 

1] one-to-one, 
2] one-to-many, 
3] many-to-many.

Explanation: Understanding relationships is crucial for 
designing a database schema that accurately reflects real-world 
interactions between entities.

Types of Relationships:

One-to-One (1:1): Each record in one entity relates to one 
record in another entity. 

One-to-Many (1
): A record in one entity can be related to multiple 
records in another entity. 

Many-to-Many (M
): Multiple records in one entity can relate to multiple 
records in another entity.


*/


-- One-to-One Relationship

CREATE TABLE Patient (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE
);

select * from Patient
select * from PatientRecord


CREATE TABLE PatientRecord (
    RecordID INT PRIMARY KEY,
    PatientID INT UNIQUE,  -- Unique constraint ensures one-to-one relationship
    RecordDate DATE,
    Notes TEXT,
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
);



-- Inserting data into Patient Table
INSERT INTO Patient (PatientID, FirstName, LastName, DateOfBirth)
VALUES 
(1, 'John', 'Doe', '1980-05-15'),
(2, 'Jane', 'Smith', '1992-11-23');

select * from Patient

-- Inserting data into PatientRecord Table
INSERT INTO PatientRecord (RecordID, PatientID, RecordDate, Notes)
VALUES
(101, 1, '2024-01-10', 'Annual check-up'),
(102, 2, '2024-02-14', 'Routine examination');


select * from Patient
select * from PatientRecord



--  One-to-Many Relationship
CREATE TABLE Patient2 (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE
);


CREATE TABLE Appointment (
    AppointmentID INT PRIMARY KEY,
    PatientID INT,                  -- Foreign key to Patient
    AppointmentDate DATE,
    DoctorName VARCHAR(50),
    FOREIGN KEY (PatientID) REFERENCES Patient(PatientID)
);



-- Inserting data into Patient Table
INSERT INTO Patient2 (PatientID, FirstName, LastName, DateOfBirth)
VALUES 
(1, 'Ravi', 'Kumar', '1980-05-15'),
(2, 'Simran', 'Saina', '1992-11-23');

-- Inserting data into Appointment Table
INSERT INTO Appointment (AppointmentID, PatientID, AppointmentDate, DoctorName)
VALUES
(1, 1, '2024-01-15', 'Dr. Brown'),
(2, 1, '2024-03-20', 'Dr. Green'),
(3, 2, '2024-02-25', 'Dr. White');

select * from Patient2
select * from Appointment


-- 3. Many-to-Many Relationship

CREATE TABLE Patient3 (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DateOfBirth DATE
);


CREATE TABLE Medication (
    MedicationID INT PRIMARY KEY,
    MedicationName VARCHAR(100)
);


CREATE TABLE PatientMedication (
    PatientID INT,
    MedicationID INT,
    StartDate DATE,
    PRIMARY KEY (PatientID, MedicationID),-- composite primay 
    FOREIGN KEY (PatientID) REFERENCES Patient3(PatientID),
    FOREIGN KEY (MedicationID) REFERENCES Medication(MedicationID)
);








-- Inserting data into Patient Table
INSERT INTO Patient3 (PatientID, FirstName, LastName, DateOfBirth)
VALUES 
(1, 'Krishan', 'Kumar', '1980-05-15'),
(2, 'Zahid', 'Akhtar', '1992-11-23');

-- Inserting data into Medication Table
INSERT INTO Medication (MedicationID, MedicationName)
VALUES
(1, 'Aspirin'),
(2, 'Metformin');

-- Inserting data into PatientMedication Table (Many-to-Many Relationship)
INSERT INTO PatientMedication (PatientID, MedicationID, StartDate)
VALUES
(1, 1, '2024-01-10'), 
(1, 2, '2024-03-01'), 
(2, 1, '2024-02-15'); 


select * from Patient3
select * from Medication
select * from PatientMedication






























