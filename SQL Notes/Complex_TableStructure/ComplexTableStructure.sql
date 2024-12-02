

create database S_DirectLocal
Use S_DirectLocal

Create table Roles
(
RoleId smallint primary key identity(100,2),
RoleName varchar(50)
)

insert into Roles(RoleName)
values('Dean'),('Accountant'),('Professor'),('Staff'),('Admin')

select *
from   Roles


create table Users
(UserId smallint primary key identity,
 RoleId smallint foreign key references Roles(RoleID),
 UserName varchar(50) not null,
 Email varchar(50)not null)


insert into Users (RoleId,UserName,Email)
values(100,'DR.Parth','Dp.54@gmail.com'),
(104,'DR.Giri','Giri.54@gmail.com'),
(102,'Shubhash Sah','Shubhas@gmail.com'), 
(106,'Ramu Dawre','Rd@gmail.com'),
(108,'Mr Saini','Dp.54@gmail.com')

update Users
set Email = 'Saini@gmail.com'
where userid = 5


select * from  Roles
select * from  Users


CREATE TABLE [GlobalCategory](
	GlobalCategoryId int IDENTITY(1,1) primary key NOT NULL,
	category_name nvarchar(100) NOT NULL,
	category_key nvarchar(100) NOT NULL

)

insert into GlobalCategory(category_name,category_key)
values('Gender','Represent Genders'),
      ('Ethnicity','Represent Ethnicity'),
	  ('Comminication','Represent Ethnicity'),
	  ('Language','Communication Way')

select * from GlobalCategory
select * from CategoryToCode



CREATE TABLE [CategoryToCode](
	CategoryToCodeId int IDENTITY(500,1) primary key NOT NULL,
	GlobalCategoryId int foreign key references GlobalCategory(GlobalCategoryId),
	CategoryValue nvarchar(100) NOT NULL
	)

insert into CategoryToCode(GlobalCategoryId,CategoryValue)
values(1,'Male'),(1,'Female'),(1,'Gay'),(1,'Tran'),(1,'Other'),
      (2,'Asian'),(2,'Hispanic'),(2,'Black'),(2,'White'),(2,'Indian'),
	  (4,'English'),(4,'Arebic'),(4,'Hindi'),(4,'Urdu'),(4,'British English')


select * from GlobalCategory
select * from CategoryToCode



CREATE TABLE Patient (
    PatientId INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(70),
    LastName VARCHAR(70),
    Dob DATE,
    Gender INT,
    PatientLanguage INT,
    Ethnicity INT,
	CreatedBy smallint foreign key references Users(UserId),

CONSTRAINT FK_Patient_Gender FOREIGN KEY (Gender) REFERENCES CategoryToCode(CategoryToCodeId),
CONSTRAINT FK_Patient_Language FOREIGN KEY (PatientLanguage) REFERENCES CategoryToCode(CategoryToCodeId),
CONSTRAINT FK_Patient_Ethnicity FOREIGN KEY (Ethnicity) REFERENCES CategoryToCode(CategoryToCodeId)
);



select *
from  Patient


select * from  GlobalCategory
select * from  CategoryToCode




INSERT INTO Patient (FirstName, LastName, Dob, Gender, PatientLanguage, Ethnicity,CreatedBy)
VALUES 
    ('John', 'Doe', '1985-05-15', 500, 510, 506,1),  
    ('Jane', 'Smith', '1990-08-22', 501, 511, 507,1),  
    ('Chris', 'Johnson', '1975-12-30', 500, 512, 505,1),  
    ('Emily', 'Davis', '2000-01-05', 501, 513, 508,1),  
    ('Michael', 'Brown', '1982-03-10', 500, 514, 509,2), 


	('Silva', 'Doe', '1985-05-15', 500, 510, 506,2),  
    ('Julia', 'Smith', '1990-08-22', 501, 511, 507,2),  
    ('Martian', 'Johnson', '1975-12-30', 500, 512, 505,1), 
    ('Lily', 'Davis', '2000-01-05', 501, 513, 508,2),  
    ('Mick', 'Brown', '1982-03-10', 500, 514, 509,1),  


	('Ram', 'Doe', '1985-05-15', 500, 510, 506,2),  
    ('Jeevna', 'Smith', '1990-08-22', 501, 511, 507,1),  
    ('Ramesh', 'Johnson', '1975-12-30', 500, 512, 505,1), 
    ('Ema', 'Davis', '2000-01-05', 501, 513, 508,2),  
    ('chael', 'Brown', '1982-03-10', 500, 514, 509,2) 


Create table ContactType 
(ContactTypeId smallint primary key identity(200,1),ContactType varchar(50))

insert into ContactType(ContactType)
values('Mobile'),('Email'),('Fax'),('Other')


create table PatientContact 
(
PatientContactId int primary key identity,
PatientId int foreign key references Patient(PatientId),
ContactTypeId smallint foreign key references ContactType(ContactTypeId),
ContactValue varchar(100),
Isactive bit ,
CreateDatetime datetime
)


select * from ContactType
--select * from Patient
select * from PatientContact


insert into PatientContact (PatientId,ContactTypeId,ContactValue,Isactive,CreateDatetime)
values (2 ,200,'8527412365',1,getdate()-100),
       (2 ,200,'7418523698',1,getdate()-200),
       (2 ,203,'456-859-96',1,getdate()-12),
	   (12,200,'8657458965',1,getdate()-500),
	   (12,201,'Test@gmail.com',1,getdate()-450),
	   (15,200,'3256987456',1,getdate()-50),
	   (13,200,'3265874562',1,getdate()-2),
	   (14,200,'6547895412',1,getdate()),
	   (14,202,'456-959-63',1,getdate()),
	   (14,200,'4593256874',1,getdate()-1000),
	   (11,201,'Yup.test@gmail.com',1,getdate())




Create table PatientAddress
(
AddressId int primary key identity,
PatientId int foreign key references Patient(PatientId),
AddressLine1 varchar(200),
AddressLine2 varchar(200),
ZipCode char(6),
City varchar(100),
CreatedDatetime datetime
)


INSERT INTO PatientAddress (PatientId, AddressLine1, AddressLine2, ZipCode, City, CreatedDatetime) VALUES
(1, '123 Main St', 'Apt 4B', '123456', 'New York', '2023-09-27 09:45:00'),
(1, '456 Elm St', 'Suite 12', '654321', 'Los Angeles', '2023-09-27 10:15:00'),
(1, '789 Oak St', NULL, '789123', 'Chicago', '2023-09-27 11:05:00'),
(3, '321 Pine St', 'Floor 2', '321987', 'Houston', '2023-09-27 12:25:00'),
(3, '654 Maple Ave', NULL, '654789', 'San Francisco', '2023-09-27 14:10:00'),
(3, '987 Cedar Rd', 'Building 5', '987654', 'Miami', '2023-09-27 15:20:00'),
(5, '543 Birch Dr', 'Apt 7A', '543210', 'Phoenix', '2023-09-27 16:45:00'),
(5, '876 Willow St', NULL, '876543', 'Dallas', '2023-09-27 17:30:00'),
(5, '345 Poplar Ln', 'Suite 22', '345678', 'Denver', '2023-09-27 18:15:00'),
(5, '210 Spruce Blvd', 'Apt 1C', '210987', 'Boston', '2023-09-27 19:05:00'),
(10, '12 River St', NULL, '112233', 'Seattle', '2023-09-28 08:30:00'),
(10, '98 Lake View', 'Apt 9C', '334455', 'Austin', '2023-09-28 09:45:00'),
(10, '67 Hilltop Dr', 'Unit 3', '556677', 'Portland', '2023-09-28 10:50:00'),
(11, '234 Forest Ave', NULL, '778899', 'Atlanta', '2023-09-28 11:35:00'),
(11, '89 Green St', 'Suite 6B', '998877', 'Orlando', '2023-09-28 12:25:00'),
(12, '45 Ocean Blvd', 'Apt 2A', '123789', 'San Diego', '2023-09-28 13:55:00'),
(13, '16 Mountain Rd', NULL, '654123', 'Salt Lake City', '2023-09-28 14:40:00'),
(13, '301 Valley St', 'Floor 4', '987321', 'Las Vegas', '2023-09-28 15:20:00'),
(13, '77 Meadow Ln', 'Unit 8', '321654', 'Kansas City', '2023-09-28 16:10:00'),
(13, '91 Sunset Blvd', NULL, '789654', 'Charlotte', '2023-09-28 17:45:00');




CREATE TABLE Practitioners (
    PractitionerId INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(70),
    LastName VARCHAR(70),
    Specialty NVARCHAR(100),
    Email VARCHAR(100),
    ContactNumber VARCHAR(15),
    CreatedBy SMALLINT FOREIGN KEY REFERENCES Users(UserId),
    CreatedDatetime DATETIME
);

-- Sample Data
INSERT INTO Practitioners (FirstName, LastName, Specialty, Email, ContactNumber, CreatedBy, CreatedDatetime)
VALUES 
('Dr. James', 'Brown', 'Cardiology', 'james.brown@example.com', '123-456-7890', 1, GETDATE()),
('Dr. Sarah', 'Taylor', 'Dermatology', 'sarah.taylor@example.com', '987-654-3210', 2, GETDATE()),
('Dr. Michael', 'Johnson', 'Orthopedics', 'michael.johnson@example.com', '654-987-1234', 1, GETDATE());




CREATE TABLE AppointmentStatus (
    StatusId SMALLINT PRIMARY KEY IDENTITY(300, 1),
    StatusDescription VARCHAR(50)
);

-- Sample Data
INSERT INTO AppointmentStatus (StatusDescription)
VALUES 
('Scheduled'), 
('Confirmed'), 
('Cancelled'), 
('Completed');






CREATE TABLE Appointment (
    AppointmentId INT PRIMARY KEY IDENTITY,
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    PractitionerId INT FOREIGN KEY REFERENCES Practitioners(PractitionerId),
    AppointmentDate DATETIME,
    AppointmentTime TIME,
    StatusId SMALLINT FOREIGN KEY REFERENCES AppointmentStatus(StatusId),
    CreatedBy SMALLINT FOREIGN KEY REFERENCES Users(UserId),
    CreatedDatetime DATETIME
);



-- Insert 20 sample appointment records
INSERT INTO Appointment (PatientId, PractitionerId, AppointmentDate, AppointmentTime, StatusId, CreatedBy, CreatedDatetime)
VALUES 
(1, 1, '2023-10-01', '10:00:00', 300, 1, GETDATE()),
(2, 2, '2023-10-02', '11:00:00', 301, 2, GETDATE()),
(3, 1, '2023-10-03', '09:30:00', 300, 1, GETDATE()),
(4, 3, '2023-10-04', '15:00:00', 302, 2, GETDATE()),
(5, 1, '2023-10-05', '13:00:00', 303, 1, GETDATE()),
(6, 2, '2023-10-06', '10:30:00', 300, 2, GETDATE()),
(7, 3, '2023-10-07', '12:00:00', 301, 1, GETDATE()),
(8, 2, '2023-10-08', '14:00:00', 303, 2, GETDATE()),
(9, 1, '2023-10-09', '08:30:00', 302, 1, GETDATE()),
(10, 1, '2023-10-10', '10:15:00', 301, 2, GETDATE()),
(11, 3, '2023-10-11', '16:00:00', 300, 1, GETDATE()),
(12, 2, '2023-10-12', '09:45:00', 302, 2, GETDATE()),
(13, 3, '2023-10-13', '11:30:00', 301, 1, GETDATE()),
(14, 1, '2023-10-14', '15:30:00', 300, 2, GETDATE()),
(15, 2, '2023-10-15', '13:45:00', 303, 1, GETDATE())



Create Table ClaimProcess
(
ClaimProcessId int primary key identity (21,6),
AppointmentId int foreign key references Appointment(AppointmentId),
ClaimStatus varchar(50)
)

insert into ClaimProcess(AppointmentId,ClaimStatus)
values
(2,'Pending'),
(3,'Pending'),
(4,'In-Progress'),
(5,'Pending'),
(6,'Pending'),
(7,'Pending'),
(8,'Partially Done'),
(9,'Partially Done'),
(10,'Done'),
(11,'Pending'),
(12,'Done'),
(13,'Pending')




CREATE TABLE InsuranceProviders (
    InsuranceProviderId INT PRIMARY KEY IDENTITY,
    InsuranceProviderName VARCHAR(100) NOT NULL,
	PhoneNumber  varchar(70),
	Email varchar(40),
    [Address] VARCHAR(200)
);


INSERT INTO InsuranceProviders (InsuranceProviderName, PhoneNumber, Email, [Address])
VALUES 
('HealthCare Inc.', '555-1234', 'contact@healthcareinc.com', '101 Health St, New York, NY'),
('Wellness Insurance Co.', '555-5678', 'info@wellnessinsure.com', '202 Wellness Blvd, Los Angeles, CA'),
('CareFirst Insurance', '555-8765', 'support@carefirst.com', '303 Care Ave, Chicago, IL'),
('Guardian Health Plans', '555-4321', 'service@guardianhealth.com', '404 Guardian Way, Houston, TX'),
('United Health Group', '555-3456', 'customer.service@unitedhealth.com', '505 United Dr, Miami, FL'),
('Optima Health', '555-7654', 'help@optimahealth.com', '606 Optima Ln, San Francisco, CA'),
('Blue Cross Blue Shield', '555-6543', 'info@bcbs.com', '707 Blue Cross Rd, Seattle, WA'),
('Aetna Inc.', '555-9876', 'claims@aetna.com', '808 Aetna Blvd, Boston, MA'),
('Cigna Health Insurance', '555-8765', 'contact@cigna.com', '909 Cigna Ct, Denver, CO'),
('Humana Inc.', '555-1234', 'support@humana.com', '101 Humana St, Atlanta, GA');


select * from InsuranceProviders



select * from Patient





CREATE TABLE PatientInsurance (
    PatientInsuranceId INT PRIMARY KEY IDENTITY,
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    InsuranceProviderId INT FOREIGN KEY REFERENCES InsuranceProviders(InsuranceProviderId),
    PolicyNumber VARCHAR(50),
    CoverageDetails VARCHAR(200)
);


INSERT INTO PatientInsurance (PatientId, InsuranceProviderId, PolicyNumber,CoverageDetails)
VALUES 
(1, 1, 'HC123456',  'Full Coverage'),
(2, 2, 'WI654321',  'Partial Coverage'),
(3, 1, 'HC789012',  'Full Coverage'),
(4, 3, 'CP345678',  'Emergency Only'),
(5, 4, 'GH910111',  'Full Coverage'),
(6, 5, 'UHG121314', 'Dental Coverage'),
(7, 1, 'HC151617',  'Vision and Dental'),
(8, 2, 'WI181920',  'Full Coverage'),
(9, 3, 'CP212223',  'Partial Coverage'),
(10, 4, 'GH242526', 'Full Coverage');


select * from Patient
select * from PatientInsurance






CREATE TABLE Medication (
    MedicationId INT PRIMARY KEY IDENTITY,
    PatientId INT FOREIGN KEY REFERENCES Patient(PatientId),
    AppointmentId INT FOREIGN KEY REFERENCES Appointment(AppointmentId),
    MedicationName VARCHAR(100),
    Dosage VARCHAR(50),
    Frequency VARCHAR(50)
   
);

INSERT INTO Medication (PatientId, AppointmentId, MedicationName, Dosage)
VALUES 
(1, 2, 'Lisinopril', '10 mg'),
(2, 3, 'Hydrocortisone Cream', '1%'),
(3, 4, 'Ibuprofen', '400 mg'),
(4, 5, 'Cetirizine', '10 mg'),
(5, 6, 'Metformin', '500 mg'),
(6, 7, 'Tamiflu', '75 mg'),
(10,11 , 'Sertraline', '50 mg'),
(14,15 , 'Albuterol Inhaler', '90 mcg'),
(15,16 , 'Acetaminophen', '500 mg')

select * from Patient
select * from Appointment
select * from Medication



select * from INFORMATION_SCHEMA.TABLES


select * from Roles
select * from Users

select U.*
from   Users U
       join  Roles R on R.RoleId = U.RoleId


select R.*
from   Users U
       join  Roles R on R.RoleId = U.RoleId


select U.UserId,
       U.UserName,
	   R.RoleName
from   Users U
       join  Roles R on R.RoleId = U.RoleId



select * from Roles
select * from Users
select * from Patient
select * from ContactType
select * from PatientContact
select * from PatientAddress
select * from Practitioners
select * from AppointmentStatus
select * from Appointment
select * from Medication
select * from ClaimProcess

select * from InsuranceProviders
select * from PatientInsurance








select * from InsuranceProviders
select * from PatientInsurance
select * from Medication
select * from GlobalCategory
select * from CategoryToCode

select * from Patient
select * from ContactType
select * from PatientContact
select * from PatientAddress
select * from Practitioners
select * from AppointmentStatus
select * from Appointment
select * from ClaimProcess



select top 2 * from GlobalCategory
select top 2 * from CategoryToCode


-- To get all the details 


/*

exec spPatientDetails 1   @Patient = 1

*/


Alter  procedure  spPatientDetails @Patient int 
as
begin

select P.PatientId,
       Concat(P.FirstName,' ',P.LastName) PatientName,
       P.Dob,
	   GenderCode.CategoryValue as PatientGender,
	   Languages.CategoryValue as PatientLanguage,
	   Ethnicity.CategoryValue as PatientEhnicity,
	   Ct.ContactType,
	   PC.ContactValue,
	   Ur.UserName,
	   Roles.RoleName,
	   APS.StatusDescription as AppointmentStatus,
	   PIR.PolicyNumber,
	   PIR.CoverageDetails,
	   IPR.InsuranceProviderName as InsuranceProviderName,
	   IPR.[Address],
	   Cp.ClaimStatus



from   Patient P
       left join CategoryToCode GenderCode on GenderCode.CategoryToCodeId = P.Gender
	   left join CategoryToCode Languages on Languages.CategoryToCodeId = P.PatientLanguage
	   left join CategoryToCode Ethnicity on Ethnicity.CategoryToCodeId = P.Ethnicity
       left join PatientContact PC on PC.PatientId = P.PatientId
	   left join ContactType CT on CT.ContactTypeId = PC.ContactTypeId
	   left join Users UR on UR.UserId = P.CreatedBy
	   left join Roles Roles on Roles.RoleId = UR.RoleId
	   left join Appointment APT on APT.PatientId = P.PatientId
	   left join AppointmentStatus APS on APS.StatusId = APT.StatusId
	   Left join PatientInsurance PIR on PIR.PatientId = P.PatientId
	   Left join InsuranceProviders IPR on IPR.InsuranceProviderId = PIR.InsuranceProviderId
	   Left join ClaimProcess CP on Cp.AppointmentId = APT.AppointmentId
where  P.PatientId = @Patient

end





--- To Get the Latest Contacts using outer apply 





select Concat(P.FirstName,' ',P.LastName) PatientName,
       P.Dob,
	   GenderCode.CategoryValue as PatientGender,
	   Languages.CategoryValue as PatientLanguage,
	   Ethnicity.CategoryValue as PatientEhnicity,
	   Ct.ContactType,
	   LatestContact.ContactValue,
	   Ur.UserName,
	   Roles.RoleName,
	   APS.StatusDescription as AppointmentStatus,
	   PIR.PolicyNumber,
	   PIR.CoverageDetails,
	   IPR.InsuranceProviderName as InsuranceProviderName,
	   IPR.[Address],
	   Cp.ClaimStatus

from   Patient P
       left join CategoryToCode GenderCode on GenderCode.CategoryToCodeId = P.Gender
	   left join CategoryToCode Languages on Languages.CategoryToCodeId = P.PatientLanguage
	   left join CategoryToCode Ethnicity on Ethnicity.CategoryToCodeId = P.Ethnicity

	   Outer apply (select top 1*
	                from   PatientContact PTC
					where  PTC.PatientId = P.PatientId
					order  by PTC.CreateDatetime desc)LatestContact

	   left join ContactType CT on CT.ContactTypeId = LatestContact.ContactTypeId
	   left join Users UR on UR.UserId = P.CreatedBy
	   left join Roles Roles on Roles.RoleId = UR.RoleId
	   left join Appointment APT on APT.PatientId = P.PatientId
	   left join AppointmentStatus APS on APS.StatusId = APT.StatusId
	   Left join PatientInsurance PIR on PIR.PatientId = P.PatientId
	   Left join InsuranceProviders IPR on IPR.InsuranceProviderId = PIR.InsuranceProviderId
	   Left join ClaimProcess CP on Cp.AppointmentId = APT.AppointmentId















      






select * from INFORMATION_SCHEMA.TABLES


select * from GlobalCategory
select * from CategoryToCode
select * from Roles
select * from Users
select * from Patient
select * from ContactType
select * from PatientContact
select * from PatientAddress
select * from Practitioners
select * from AppointmentStatus
select * from Appointment
select * from ClaimProcess




-- Subquery


select *
from   Patient
where  PatientId in (1,2,3)


select *
from   Patient
       where PatientId in (Select PatientId
	                       from   PatientContact)









/********************************  Stored Procedure With Filters **********************/ 


/*

SpGet_PatientDetails 
                     @AppointmentStatus = 'Cancelled',
					 @PatientId = 1,

@PatientName = 'chael'
@AppointmentStatus = 'Cancelled'


1 @Roles = 'pro'

*/


Create OR Alter Procedure  SpGet_PatientDetails @PatientId         int          = null,
                                                @Roles             varchar(70)  = null,
												@AppointmentStatus varchar(50)  = null,
												@PatientName       varchar(100) = null

as
begin

select Concat(P.FirstName,' ',P.LastName) PatientName,
       P.Dob,
	   GenderCode.CategoryValue as PatientGender,
	   Languages.CategoryValue as PatientLanguage,
	   Ethnicity.CategoryValue as PatientEhnicity,
	   Ct.ContactType,
	   PC.ContactValue,
	   Ur.UserName,
	   Roles.RoleName,
	   APS.StatusDescription as AppointmentStatus,
	   PIR.PolicyNumber,
	   PIR.CoverageDetails,
	   IPR.InsuranceProviderName as InsuranceProviderName,
	   IPR.[Address],
	   Cp.ClaimStatus

from   Patient P
       left join CategoryToCode GenderCode on GenderCode.CategoryToCodeId = P.Gender
	   left join CategoryToCode Languages on Languages.CategoryToCodeId = P.PatientLanguage
	   left join CategoryToCode Ethnicity on Ethnicity.CategoryToCodeId = P.Ethnicity
       left join PatientContact PC on PC.PatientId = P.PatientId
	   left join ContactType CT on CT.ContactTypeId = PC.ContactTypeId
	   left join Users UR on UR.UserId = P.CreatedBy
	   left join Roles Roles on Roles.RoleId = UR.RoleId
	   left join Appointment APT on APT.PatientId = P.PatientId
	   left join AppointmentStatus APS on APS.StatusId = APT.StatusId
	   Left join PatientInsurance PIR on PIR.PatientId = P.PatientId
	   Left join InsuranceProviders IPR on IPR.InsuranceProviderId = PIR.InsuranceProviderId
	   Left join ClaimProcess CP on Cp.AppointmentId = APT.AppointmentId

where P.PatientId = coalesce(@PatientId,P.PatientId)
      And Roles.RoleName like concat('%',@Roles,'%') 
	  And APS.StatusDescription like concat('%',@AppointmentStatus,'%')  
	  And Concat(P.FirstName,' ',P.LastName) like concat('%',@PatientName,'%') 
	  And (P.PatientId = @PatientId or APS.StatusDescription like concat('%',@AppointmentStatus,'%'))

end























