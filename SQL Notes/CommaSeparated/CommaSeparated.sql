/* Comma Seperated Values */


Create Table #Patient
(
PatientId int identity,
PatientName varchar(100),
Age int,
)

insert into #Patient(PatientName,Age)
values('Ron',40),('Robert',89),
      ('Albert',50),('Kim',85),('Fahim',32),('Watson',88),
      ('Chris',55),('Julia',74),('AkJ',61),('Wiliio',96)



select * from  #Patient


Create Table #PatientContact
(
ContactId int identity(200,1),
PatientId int,
PhoneNumber varchar(100),
CreateDate datetime
)

insert into #PatientContact(PatientId,PhoneNumber,CreateDate)
values (1,'456317896',Getdate()-100),(3,'3636363636',Getdate()-800),(5,'9996668978',Getdate()-96),
       (1,'7485965412',Getdate()-500),(3,'789664789',Getdate()-1000),(5,'7878785489',Getdate()-65),
       (1,'3254897455',Getdate()-856),(3,'4569871115',Getdate()-411),(5,'3214569874',Getdate()-36),
       (2,'6398745896',Getdate()-20),(4,'5569871115',Getdate()-120),(5,'6325987412',Getdate()-74),
       (2,'1593574852',Getdate()-56),(4,'7569871115',Getdate()-74),(7,'6359874512',Getdate()-89),
       (2,'6527945136',Getdate()-88),(4,'3569871115',Getdate()-63),(7,'3579514562',Getdate()-52),
       (2,'7778889991',Getdate()-99),(4,'9569871115',Getdate()-32),(7,'7899654653',Getdate()-43)



select * from #Patient
select * from #PatientContact


--- Comma seperated Data

select P.PatientId,
       P.PatientName,
	   P.Age,
	   CreateDate
from   #Patient P
       join #PatientContact PC on Pc.PatientId = P.PatientId
order  by 1 


-- Getting comma seperated using "string_agg" function
-- Use full in higher version of SQL 2017

select P.PatientId,
       P.PatientName,
	   P.Age,	  
	   string_agg(PC.PhoneNumber, ',') AS PhoneNumbers
from   #Patient P
       join #PatientContact PC on Pc.PatientId = P.PatientId
group by  P.PatientId, P.PatientName, P.Age
order  by P.PatientId


-- below Query usefull in lower version of SQL server 


SELECT PC.PhoneNumber
FROM #PatientContact PC       
FOR XML PATH('')


SELECT ', ' + PC.PhoneNumber
FROM #PatientContact PC       
FOR XML PATH('')


select stuff('My Name is Khan',1,4,';')

select stuff(', My Name is Khan',1,2,'')


SELECT ', ' + PC.PhoneNumber
FROM #PatientContact PC       
FOR XML PATH('')


-- XML result

SELECT PC.PhoneNumber
FROM #PatientContact PC       
FOR XML PATH('')



/*
Use of .value('.', 'NVARCHAR(MAX)'): This is necessary to extract the concatenated string from the XML result.
*/

select (SELECT ', ' +PC.PhoneNumber
        FROM #PatientContact PC
		join #Patient P on P.PatientId = PC.PatientId
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)')


select STUFF((
        SELECT ', ' + PC.PhoneNumber
        FROM #PatientContact PC
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') AS PhoneNumbers




-- Final Query with comma separated values

SELECT P.PatientId,
       P.PatientName,
       P.Age,
       STUFF((
           SELECT ', ' + PC.PhoneNumber
           FROM #PatientContact PC
           WHERE PC.PatientId = P.PatientId
           FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 2, '') AS PhoneNumbers

FROM   #Patient P
       JOIN #PatientContact PC ON PC.PatientId = P.PatientId
GROUP BY P.PatientId, P.PatientName, P.Age
ORDER BY P.PatientId;