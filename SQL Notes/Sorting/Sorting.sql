select	*
from	Patient
order  by PatientId desc



-- Use of set nocount on

set nocount on

select *
from   Patient

select *
from   Patient


select *
from   Patient

/*  Sorting */

select lower('Ashish')



declare @SortColumn VARCHAR(50)= 'LastName',
		@SortOrder  VARCHAR(5) = 'desc'
													       


select	*
from	Patient

order by	(case when lower(@SortColumn) = ''				and lower(@SortOrder) = ''     then PatientId end) asc,
            (case when lower(@SortColumn) = ''				and lower(@SortOrder) = 'desc' then PatientId end) desc,            
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'asc'  then FirstName end) asc,
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'desc' then FirstName end) desc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'asc'  then LastName end) asc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'desc' then LastName end) desc			


							
	
	

/* Paging and Sorting combine */



declare @SortColumn VARCHAR(50)= 'FirstName',
		@SortOrder  VARCHAR(5) = 'asc',
		@PageNumber INT = 2,
		@PageSize INT = 3 											       


select	*
from	Patient

order by	(case when lower(@SortColumn) = ''				and lower(@SortOrder) = ''     then PatientId end) asc,
            (case when lower(@SortColumn) = ''				and lower(@SortOrder) = 'desc' then PatientId end) desc,            
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'asc'  then FirstName end) asc,
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'desc' then FirstName end) desc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'asc'  then LastName end) asc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'desc' then LastName end) desc	


offset (@PageNumber - 1) * @PageSize rows
fetch next @PageSize rows only


/*


SPPaging_Sorting
 @SortColumn = 'FirstName',
 @SortOrder  = 'asc',
 @PageNumber  = 2,
 @PageSize  = 3 

*/


create procedure SPPaging_Sorting  @SortColumn VARCHAR(50)= 'FirstName',
		                           @SortOrder  VARCHAR(5) = 'asc',
		                           @PageNumber INT = 2,
		                           @PageSize INT = 3 

as
begin

set nocount on

select	*
from	Patient

order by	(case when lower(@SortColumn) = ''				and lower(@SortOrder) = ''     then PatientId end) asc,
            (case when lower(@SortColumn) = ''				and lower(@SortOrder) = 'desc' then PatientId end) desc,            
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'asc'  then FirstName end) asc,
			(case when lower(@SortColumn) = 'FirstName'		and lower(@SortOrder) = 'desc' then FirstName end) desc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'asc'  then LastName end) asc,
			(case when lower(@SortColumn) = 'LastName'		and lower(@SortOrder) = 'desc' then LastName end) desc	


offset (@PageNumber - 1) * @PageSize rows
fetch next @PageSize rows only


end




