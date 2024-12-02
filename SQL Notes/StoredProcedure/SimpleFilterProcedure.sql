/*
Title:			SpImportant
Creator:		Ashish

Purpose: 		
Functionality:	
Created:		
Applications:	

Comments:		
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Example:		

                    EXECUTE SpImportant @PatientName = 'chris'
                    EXECUTE SpImportant @Language = 'hin'

					



Output:		
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Return Values:	
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Modifications:

Date          Developer        Description
----------  --------------	--------------------------------------------------------------------------------------------------------------------

*/


Create Or Alter Procedure SpImportant  @PatientName varchar(100) = null,
                                       @Language    varchar(70)  = null
									   

                                       
as
begin


/* Getting Data into Temp Table */

select Concat(P.FirstName,' ',P.LastName) PatientName,

       P.Dob,

	   iif(GenderCode.CategoryValue = 'Male','M','F') as PatientGender,

	   Languages.CategoryValue as PatientLanguage,

	   Case when Ethnicity.CategoryValue = 'Indian'    then 'Bharatiy'
	        when Ethnicity.CategoryValue = 'White'     then 'Gora'
			when Ethnicity.CategoryValue = 'Black'     then 'African'
			when Ethnicity.CategoryValue = 'Hispanic'  then 'Spanish'
			else 'Univarsal'
			end  as PatientEhnicity,

	   isnull(Ct.ContactType,'Unknown Type') as ContactType,
	   isnull(PC.ContactValue,00000000)      as ContactValue,
	   Ur.UserName,
	   Roles.RoleName,
	   isnull(APS.StatusDescription,'Status is Unknown') as AppointmentStatus,
	   PIR.PolicyNumber,
	   PIR.CoverageDetails,
	   IPR.InsuranceProviderName as InsuranceProviderName,
	   IPR.[Address],
	   Cp.ClaimStatus

into   #PatientTemp

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




/* Filters */

if @PatientName>''
begin 

delete 
from  #PatientTemp
where PatientName not like concat('%',@PatientName,'%')


end



if @Language>''
begin

delete 
from  #PatientTemp
where PatientLanguage not like concat('%',@Language,'%')

end

declare @Patient varchar(10)
Set @Patient= 'Hello'

print(concat('%',@Patient,'%'))







/* Final Result */

select *
from   #PatientTemp




end