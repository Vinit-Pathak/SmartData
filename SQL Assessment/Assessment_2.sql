create database Assessment2;
use Assessment2;


CREATE TABLE Patient (
    PatientId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    DateOfBirth DATE,
    Gender NVARCHAR(10),
    Active BIT,
    CreatedDatetime DATETIME DEFAULT GETDATE()
);


-- Sample Data
INSERT INTO Patient (FirstName, LastName, DateOfBirth, Gender, Active) 
VALUES ('Sam', 'Will', '1985-06-15', 'Male', 1),
       ('Mark', 'Wagh', '1990-03-10', 'Female', 1),
	   ('Maria', 'Joseph', '1990-03-10', 'Female', 1),
	   ('Jane', 'Foster', '1990-03-10', 'Female', 1),
	   ('Ramesh', 'Kumar', '1990-03-10', 'Male', 0),
	   ('Will', 'Smith', '1990-03-10', 'Male', 1),
	   ('Julia', 'Robert', '1990-03-10', 'Female', 0)



CREATE TABLE PatientContact (
    ContactId INT PRIMARY KEY IDENTITY(1,1),
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    ContactType NVARCHAR(50),
    ContactValue NVARCHAR(100),
    CreatedDatetime DATETIME DEFAULT GETDATE()
);



-- Sample Data
INSERT INTO PatientContact (PatientId, ContactType, ContactValue) 
VALUES (1, 'phone', '9638527412'),
       (2, 'phone', '8638527412'),
       (3, 'phone', '7638527412'),
	   (4, 'phone', '6638527412'),
	   (5, 'phone', '5638527412'),
	   (6, 'phone', '4638527412')


CREATE TABLE Practitioner (
    PractitionerId INT PRIMARY KEY IDENTITY(1,1),
    FirstName NVARCHAR(100),
    LastName NVARCHAR(100),
    Specialty NVARCHAR(100),
    Active BIT,
    CreatedDatetime DATETIME DEFAULT GETDATE()
);


-- Sample Data
INSERT INTO Practitioner (FirstName, LastName, Specialty, Active)
VALUES ('Dr. Alice', 'Wong', 'Cardiology', 1),
       ('Dr. Bob', 'Lee', 'Neurology', 1),
	   ('Dr. Ashish', 'Gaikwad', 'Opth', 1),
	   ('Dr. Robin', 'Lee', 'Gnya', 1)



CREATE TABLE AppointmentStatus (
    AppointmentStatusId INT PRIMARY KEY IDENTITY(1,1),
    Status NVARCHAR(50),
    CreatedDatetime DATETIME DEFAULT GETDATE()
);


-- Sample Data
INSERT INTO AppointmentStatus (Status)
VALUES ('Scheduled'),
       ('Completed'),
       ('Cancelled');



CREATE TABLE Appointment (
    AppointmentId INT PRIMARY KEY IDENTITY(1,1),
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    AppointmentStatusId INT,
    AppointmentDate DATETIME,
    Reason NVARCHAR(255),
    CreatedDatetime DATETIME DEFAULT GETDATE()
);

-- Sample Data
INSERT INTO Appointment (PatientId, AppointmentStatusId, AppointmentDate, Reason)
VALUES (1, 1, '2024-09-25 10:00', 'Routine Checkup'),
       (2, 2, '2024-09-25 11:30', 'Follow-up'),
	   (3, 1, '2024-09-25 12:30', 'Routine Checkup'),
	   (4, 1, '2024-09-25 03:30', 'Follow-up'),
	   (5, 3, '2024-09-25 05:30', 'Routine Checkup')


CREATE TABLE PatientPractitionerAppointmentMapping (
    MappingId INT PRIMARY KEY IDENTITY(1,1),
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    PractitionerId INT FOREIGN KEY REFERENCES Practitioner(PractitionerId),
    AppointmentId INT FOREIGN KEY REFERENCES Appointment(AppointmentId),
    CreatedDatetime DATETIME DEFAULT GETDATE()
);

-- Sample Data
INSERT INTO PatientPractitionerAppointmentMapping (PatientId, PractitionerId, AppointmentId)
VALUES (1, 1, 1),
       (2, 2, 2),
	   (5, 3, 2),
	   (6, 4, 2)



select * from Patient
select * from PatientContact
select * from Practitioner
select * from AppointmentStatus
select * from Appointment
select * from PatientPractitionerAppointmentMapping



--1] Retrieve all patient details along with their appointment status with only Active patients.
--ANS

SELECT     *
FROM       Patient AS p
LEFT JOIN  Appointment AS a
ON		   p.PatientId = a.PatientId
WHERE	   Active = 1


--2] Fetch the names of patients along with their practitioner for each appointment.
--ANS

SELECT 
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    pr.FirstName AS PractitionerFirstName,
    pr.LastName AS PractitionerLastName,
    a.AppointmentDate,
    a.Reason
FROM 
    Patient AS p
JOIN 
    PatientPractitionerAppointmentMapping AS ppam ON p.PatientId = ppam.PatientId
JOIN 
    Practitioner AS pr ON ppam.PractitionerId = pr.PractitionerId
JOIN 
    Appointment AS a ON ppam.AppointmentId = a.AppointmentId;



--3] Get the contact details of all patients who have an appointment.
--ANS
SELECT 
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    pc.ContactType,
    pc.ContactValue,
    a.AppointmentDate,
    a.Reason
FROM 
    Patient AS p
JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
JOIN 
    PatientContact AS pc ON p.PatientId = pc.PatientId;



--4] Find the appointment details for a patient named 'Sam Will'.
--ANS

SELECT 
	p.PatientId,
    p.FirstName,
    p.LastName,
    a.AppointmentDate,
    a.Reason,
    a.AppointmentStatusId
FROM 
    Patient AS p
JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
WHERE 
    p.FirstName = 'Sam' AND p.LastName = 'Will';


--[5] List all practitioners along with the patients they have treated.
--ANS
SELECT 
    pr.FirstName AS PractitionerFirstName,
    pr.LastName AS PractitionerLastName,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    a.AppointmentDate,
    a.Reason
FROM 
    Practitioner AS pr
JOIN 
    PatientPractitionerAppointmentMapping AS ppam ON pr.PractitionerId = ppam.PractitionerId
JOIN 
    Patient AS p ON ppam.PatientId = p.PatientId
JOIN 
    Appointment AS a ON ppam.AppointmentId = a.AppointmentId;



--[6] Retrieve a list of all patients and their corresponding appointment status (if any).
--ANS
SELECT 
    p.PatientId,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    ap.AppointmentDate,
    apStatus.Status AS AppointmentStatus
FROM 
    Patient AS p
LEFT JOIN 
    Appointment AS ap ON p.PatientId = ap.PatientId
LEFT JOIN 
    AppointmentStatus AS apStatus ON ap.AppointmentStatusId = apStatus.AppointmentStatusId;


--[7] Fetch the patient details along with their contact information. Include patients without contact details.
--ANS
SELECT 
    p.PatientId,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    p.DateOfBirth,
    p.Gender,
    p.Active,
    pc.ContactType,
    pc.ContactValue
FROM 
    Patient AS p
LEFT JOIN 
    PatientContact AS pc ON p.PatientId = pc.PatientId;


--[8] List all patients and their practitioner for each appointment, showing patients even if they don't have a practitioner assigned.
--ANS
SELECT 
    p.PatientId,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    a.AppointmentDate,
    a.Reason,
    pr.FirstName AS PractitionerFirstName,
    pr.LastName AS PractitionerLastName
FROM 
    Patient AS p
JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
LEFT JOIN 
    PatientPractitionerAppointmentMapping AS ppam ON a.AppointmentId = ppam.AppointmentId
LEFT JOIN 
    Practitioner AS pr ON ppam.PractitionerId = pr.PractitionerId;


--[9] Get all practitioners and their appointments, including those practitioners without any appointments.
--ANS
SELECT 
    pr.PractitionerId,
    pr.FirstName AS PractitionerFirstName,
    pr.LastName AS PractitionerLastName,
    a.AppointmentId,
    a.AppointmentDate,
    a.Reason
FROM 
    Practitioner AS pr
LEFT JOIN 
    PatientPractitionerAppointmentMapping AS ppam ON pr.PractitionerId = ppam.PractitionerId
LEFT JOIN 
    Appointment AS a ON ppam.AppointmentId = a.AppointmentId;


--[10] Give me list off patients with contact details and having AppointmentReason = 'Follow-up'
--ANS
SELECT 
    p.PatientId,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    pc.ContactType,
    pc.ContactValue,
    a.AppointmentDate,
    a.Reason
FROM 
    Patient AS p
JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
JOIN 
    PatientContact AS pc ON p.PatientId = pc.PatientId
WHERE 
    a.Reason = 'Follow-up';


--[11] Count how many appointments each patient has.
--ANS
SELECT 
    p.PatientId,
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    COUNT(a.AppointmentId) AS AppointmentCount
FROM 
    Patient AS p
LEFT JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
GROUP BY 
    p.PatientId,
    p.FirstName,
    p.LastName;


--[12] Retrieve the number of patients for each gender.
--ANS
SELECT 
    Gender,
    COUNT(*) AS PatientCount
FROM 
    Patient
GROUP BY 
    Gender;

--[13] Give PatientName,PractitionerName,with their appointmentStatus.
--ANS
SELECT 
    p.FirstName AS PatientFirstName,
    p.LastName AS PatientLastName,
    pr.FirstName AS PractitionerFirstName,
    pr.LastName AS PractitionerLastName,
    apstatus.Status AS AppointmentStatus
FROM 
    Patient AS p
JOIN 
    Appointment AS a ON p.PatientId = a.PatientId
LEFT JOIN 
    PatientPractitionerAppointmentMapping AS ppam ON a.AppointmentId = ppam.AppointmentId
LEFT JOIN 
    Practitioner AS pr ON ppam.PractitionerId = pr.PractitionerId
JOIN 
    AppointmentStatus AS apstatus ON a.AppointmentStatusId = apstatus.AppointmentStatusId;


--[14] Give me Patient,Practitioner,Appointment,AppointmentStatus information using joins
--ANS


/*
[15] Write a stored procedure that takes a PatientId as input and returns the patient's contact details.
ANS

	EXEC GetPatientContactDetails @PatientId = 2;

*/



	CREATE OR ALTER PROCEDURE GetPatientContactDetails
    @PatientId INT
AS
BEGIN
    SELECT 
        p.PatientId,
        p.FirstName AS PatientFirstName,
        p.LastName AS PatientLastName,
        pc.ContactType,
        pc.ContactValue
    FROM 
        Patient AS p
    JOIN 
        PatientContact AS pc ON p.PatientId = pc.PatientId
    WHERE 
        p.PatientId = @PatientId;
END;






/*[16] Write a stored procedure that takes PractitionerId as input and returns all the appointments they have.
ANS

EXEC GetPractitionerAppointments @PractitionerId = 1;


*/
CREATE PROCEDURE GetPractitionerAppointments
    @PractitionerId INT
AS
BEGIN
    SELECT 
        a.AppointmentId,
        a.AppointmentDate,
        a.Reason,
        a.AppointmentStatusId,
        p.PatientId,
        p.FirstName AS PatientFirstName,
        p.LastName AS PatientLastName
    FROM 
        Appointment AS a
    JOIN 
        PatientPractitionerAppointmentMapping AS ppam ON a.AppointmentId = ppam.AppointmentId
    JOIN 
        Patient AS p ON ppam.PatientId = p.PatientId
    WHERE 
        ppam.PractitionerId = @PractitionerId;
END;


/*
[16] Create a stored procedure to add a new patient, taking FirstName, LastName, DateOfBirth, and Gender as parameters.
ANS

EXEC AddNewPatient 
    @FirstName = 'John', 
    @LastName = 'Doe', 
    @DateOfBirth = '1980-01-01', 
    @Gender = 'Male';


*/

CREATE OR ALTER PROCEDURE AddNewPatient
    @FirstName NVARCHAR(100),
    @LastName NVARCHAR(100),
    @DateOfBirth DATE,
    @Gender NVARCHAR(10)
AS
BEGIN
    INSERT INTO Patient (FirstName, LastName, DateOfBirth, Gender)
    VALUES (@FirstName, @LastName, @DateOfBirth, @Gender);
END;
