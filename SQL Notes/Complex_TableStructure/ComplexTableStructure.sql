/*

SpComplexlogic_Learning

*/





create procedure SpComplexlogic_Learning 
as
begin

set nocount on 


Create table #PatientDetails
(
 PatientId int
,PatientName Varchar(100)
,Dob	date
,PatientGender Char(10)
,PatientLanguage varchar(50)
,PatientEhnicity  varchar(50)	
,ContactType  varchar(50)
,ContactValue int
,UserName  varchar(50)
,RoleName  varchar(50)
,AppointmentStatus  varchar(50)
,PolicyNumber  varchar(100)
,CoverageDetails	varchar(100) 
,InsuranceProviderName varchar(200)
,[Address] varchar(300)
,ClaimStatus varchar(50)
)



insert into #PatientDetails
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




end
