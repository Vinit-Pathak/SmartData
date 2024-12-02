/************************************************/
--          SQL Practice Assignment
/************************************************/

-- Create one new Database and execute below tables to solve questions


CREATE TABLE Students (
    StudentID INT,
    StudentName VARCHAR(50),
    CourseID INT
);
 
INSERT INTO Students (StudentID, StudentName, CourseID)
VALUES
    (1, 'John Doe', 101),
    (2, 'Jane Smith', 102),
    (3, 'Bob Johnson', 101),
    (4, 'Alice Brown', 103),
    (5, 'Emily White', 102),
    (6, 'John Doe', 101);
 

CREATE TABLE Courses (
    CourseID INT,
    CourseName VARCHAR(50)
);
 
INSERT INTO Courses (CourseID, CourseName)
VALUES
    (101, 'Mathematics'),
    (102, 'History'),
    (103, 'Physics'),
    (104, 'Computer Science'),
    (101, 'Mathematics');

/*****************************************************************************

1] Write a SQL query using a Common Table Expression to list all students who are enrolled in the 'Mathematics' course.
 
2] Create a CTE that counts the number of duplicate student records in the 'Students' table.
 
3] Write a CTE query to find the average number of courses each student is enrolled in.
 
4] Create a CTE that joins the 'Students' and 'Courses' tables to list the names of students along with the courses they are enrolled in.


********************************************************************************************************/


-- Create Below tables if required drop above tables and create below 

CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Age INT
);
 
INSERT INTO Students (StudentID, FirstName, LastName, Age)
VALUES
    (1, 'John', 'Doe', 20),
    (2, 'Jane', 'Smith', 22),
    (3, 'Mike', 'Johnson', 21),
    (4, 'Sarah', 'Davis', 19),
    (5, 'John', 'Doe', 20),
    (6, 'David', 'Wilson', 23);
 
CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(50),
    Instructor VARCHAR(50)
);
 
INSERT INTO Courses (CourseID, CourseName, Instructor)
VALUES
    (101, 'Mathematics', 'Professor Smith'),
    (102, 'History', 'Professor Johnson'),
    (103, 'Physics', 'Professor Davis'),
    (104, 'Mathematics', 'Professor Smith'),
    (105, 'Biology', 'Professor Wilson'),
    (106, 'Computer Science', 'Professor Smith');
 
/*

1] Write an SQL query to retrieve the first and last names of students who have the same first and last name as other students.
 
2] Create an SQL query to list the course names that are taught by instructors whose names contain the word "Smith."
 
3] Write an SQL query to count the number of courses that have the same name as other courses.
 
4] Write an SQL query to find the students who are enrolled in the same courses as a specific student (e.g., John Doe).*/

/*********************************************************************************************************************************/

-- Note :- Based on below tables create stored procedure 

CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Age INT,
    Gender VARCHAR(10),
    ContactNumber VARCHAR(15)
);
 
INSERT INTO Patients (PatientID, FirstName, LastName, Age, Gender, ContactNumber)
VALUES
    (1, 'John', 'Doe', 35, 'Male', '123-456-7890'),
    (2, 'Jane', 'Smith', 28, 'Female', '987-654-3210'),
    (3, 'Mike', 'Johnson', 45, 'Male', '555-555-5555'),
    (4, 'Sarah', 'Davis', 30, 'Female', '777-123-4567');


CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Specialization VARCHAR(50),
    ContactNumber VARCHAR(15)
);
 
INSERT INTO Doctors (DoctorID, FirstName, LastName, Specialization, ContactNumber)
VALUES
    (101, 'Dr. David', 'Wilson', 'Cardiologist', '111-222-3333'),
    (102, 'Dr. Emily', 'Brown', 'Pediatrician', '444-555-6666'),
    (103, 'Dr. Robert', 'White', 'Dermatologist', '777-888-9999'),
    (104, 'Dr. Lisa', 'Lee', 'Orthopedic Surgeon', '222-111-4444');



CREATE TABLE Appointments (
    AppointmentID INT PRIMARY KEY,
    PatientID INT,
    DoctorID INT,
    AppointmentDate DATE,
    AppointmentTime TIME,
    AppointmentReason VARCHAR(100)
);
 
INSERT INTO Appointments (AppointmentID, PatientID, DoctorID, AppointmentDate, AppointmentTime, AppointmentReason)
VALUES
    (1001, 1, 101, '2023-11-10', '09:30:00', 'Chest pain'),
    (1002, 2, 102, '2023-11-15', '15:00:00', 'Child''s checkup'),
    (1003, 3, 103, '2023-11-20', '11:45:00', 'Skin rash'),
    (1004, 4, 104, '2023-11-25', '14:15:00', 'Knee pain')


/*
Create a Stored Procedure to Add a New Patient:
1] Create a stored procedure that takes input parameters 
   for a new patient's first name, last name, age, gender,
   and contact number, and inserts a new patient into the Patients table.
 
Create a Stored Procedure to Schedule an Appointment:
2] Develop a stored procedure that allows scheduling appointments.
It should accept parameters for patient ID, doctor ID, appointment date,
appointment time, and reason, and inserts a new appointment 
into the Appointments table.
 
Create a Stored Procedure to List Patients by Age Range:
3] Design a stored procedure that takes minimum and
   maximum age as input parameters and returns a list of patients within that age range.
 
Create a Stored Procedure to Update Doctor Information:
4] Develop a stored procedure that updates a doctor's contact number based on the doctor's ID.
 
Create a Stored Procedure to Delete Appointments by Date:
5] Build a stored procedure that accepts an appointment 
   date as a parameter and deletes all appointments that match the specified date.


/*********************************************************************************************************/
                       --                   ALL THE BEST                --
/*********************************************************************************************************/*/

-- List all students enrolled in the 'Mathematics' course.
WITH MathematicsStudents AS (
    SELECT S.StudentID, S.StudentName
    FROM Students S
    JOIN Courses C ON S.CourseID = C.CourseID
    WHERE C.CourseName = 'Mathematics'
)
SELECT * FROM MathematicsStudents;


-- Count the number of duplicate student records in the 'Students' table.
WITH DuplicateStudents AS (
    SELECT FirstName, LastName, COUNT(*) AS Count
    FROM Students
    GROUP BY FirstName, LastName
    HAVING COUNT(*) > 1
)
SELECT * FROM DuplicateStudents;


--Find the average number of courses each student is enrolled in.
WITH StudentCourseCount AS (
    SELECT StudentID, COUNT(CourseID) AS CourseCount
    FROM Students
    GROUP BY StudentID
)
SELECT AVG(CourseCount) AS AverageCourses
FROM StudentCourseCount;


-- List the names of students along with the courses they are enrolled in.
WITH StudentCourse AS (
    SELECT S.StudentName, C.CourseName
    FROM Students S
    JOIN Courses C ON S.CourseID = C.CourseID
)
SELECT * FROM StudentCourse;


-- Retrieve first and last names of students with duplicate names.

SELECT FirstName, LastName
FROM Students
WHERE (FirstName, LastName) IN (
    SELECT FirstName, LastName
    FROM Students
    GROUP BY FirstName, LastName
    HAVING COUNT(*) > 1
);


-- List course names taught by instructors whose names contain "Smith."

SELECT CourseName
FROM Courses
WHERE Instructor LIKE '%Smith%';

-- Count the number of courses with duplicate names.

SELECT CourseName, COUNT(*)
FROM Courses
GROUP BY CourseName
HAVING COUNT(*) > 1;


-- Find students enrolled in the same courses as a specific student (e.g., John Doe).

SELECT S2.FirstName, S2.LastName
FROM Students S1
JOIN Students S2 ON S1.CourseID = S2.CourseID
WHERE S1.FirstName = 'John' AND S1.LastName = 'Doe' AND S2.StudentID != S1.StudentID;


-- Stored Procedure to List Patients by Age Range

CREATE PROCEDURE ListPatientsByAgeRange (
    IN p_MinAge INT,
    IN p_MaxAge INT
)
BEGIN
    SELECT * FROM Patients
    WHERE Age BETWEEN p_MinAge AND p_MaxAge;
END;


-- Stored Procedure to Delete Appointments by Date

CREATE PROCEDURE DeleteAppointmentsByDate (
    IN p_AppointmentDate DATE
)
BEGIN
    DELETE FROM Appointments
    WHERE AppointmentDate = p_AppointmentDate;
END;

