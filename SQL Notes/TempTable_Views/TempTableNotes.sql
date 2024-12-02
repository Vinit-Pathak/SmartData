

-- Temporary  Tables

-- 1] Local Temp Table   -- Works on query window where it gets created
-- 2] Global Temp Table  -- Works for Query session 


-- Table Name start with #

-- 1] Local Temp Table

create table #Test(Id int ,
                   TestName varchar(100))


create table #Testing(Id int ,
                      TestName varchar(100))



insert into #Test
values(1,'xyx')


select * from #Test


-- 2] Global Temp Table

create table ##GlobalTempTable(Id int ,
                               TestName varchar(100))

insert into ##GlobalTempTable
select 10,
       'Ronny'



select *
from   ##GlobalTempTable







CREATE TABLE #Patient (
    PatientId INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(70),
    LastName VARCHAR(70),
    Dob DATE,
    Gender INT,
    PatientLanguage INT,
    Ethnicity INT,
	CreatedBy smallint foreign key references Users(UserId),
);





INSERT INTO #Patient (FirstName, LastName, Dob, Gender, PatientLanguage, Ethnicity,CreatedBy)
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


select * from #Patient



/*
select into insert 
into 
*/


select * from INFORMATION_SCHEMA.tables


-- Into 

select APT.AppointmentId,
       APT.AppointmentTime,
	   APT.CreatedBy,
	   APTS.StatusDescription,
	   APTS.StatusId


into   #ConfirmAppointments 

from   Appointment APT
       join AppointmentStatus  APTS on APTS.StatusId = APT.StatusId
where  APTS.StatusId = 301  /* Confirm*/



drop table #ConfirmAppointments

select *
from   #ConfirmAppointments



/********************************************************************/


-- Insert into select 


create Table #sampleTable
(Id int,
 Names varchar(10),
 Age int)



insert into #sampleTable
select 1,
       'Ashish',
	   18


select *
from #sampleTable




insert into #sampleTable

select 2,
       'Ramesh',
	   32

union All

select 3,
       'Madhv',
	   34

union All 

select 4,
       'Surekha',
	   17



select *
from   #sampleTable





/*  Use */



/*

exec spTemp_Learning @PatientId = 1

exec spTemp_Learning @ClaimStatus = 'In-Progress'


*/







/*

exec spTemp_Learning @PatientId = 1

exec spTemp_Learning @ClaimStatus = 'In-Progress'


*/



Alter procedure spTemp_Learning @PatientId int = null,
                                @ClaimStatus varchar(50) = null
                                
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


into   #PatientDetails

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



/* To get date using only PatientID*/



--select *
--from   #PatientDetails
--where  PatientId = @PatientId



/* To get date using only With PatientID or Without PatientId  */

--select *
--from   #PatientDetails
--where  PatientId = coalesce(@PatientId,PatientId)


If @PatientId is not null and @ClaimStatus is null
begin 


select 'I am from PatientId'

select *
from   #PatientDetails
where  PatientId = @PatientId

end



--if @ClaimStatus is not null and @PatientId is null
--begin

--select 'I am from Status'

--select *
--from   #PatientDetails
--where  ClaimStatus = @ClaimStatus


--end


--- Filtering in differnt way 

if @ClaimStatus is not null and @PatientId is null
begin


delete from  
#PatientDetails
where ClaimStatus != @ClaimStatus
      or ClaimStatus is null
      


--delete 
--from   #PatientDetails
--where  ClaimStatus is null

select * 
from   #PatientDetails



end

/*Final Result*/


--select * 
--from   #PatientDetails



end