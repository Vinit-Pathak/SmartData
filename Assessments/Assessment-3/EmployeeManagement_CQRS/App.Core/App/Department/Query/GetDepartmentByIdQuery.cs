using App.Core.Interface;
using App.Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Department.Query
{

    // Define the request
    public class GetDepartmentByIdQuery : IRequest<DepartmentDto>
    {
        public int Id { get; set; }
    }

    // Define the request handler
    public class GetDepartmentByIdQueryHandler : IRequestHandler<GetDepartmentByIdQuery, DepartmentDto>
    {
        private readonly IAppDbContext _appDbContext;

        // Constructor
        public GetDepartmentByIdQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request
        public async Task<DepartmentDto> Handle(GetDepartmentByIdQuery request, CancellationToken cancellationToken)
        {

            //By this query we are getting the department by id and including the employees which are present in the particular department
            var department = await _appDbContext.Set<Domain.Department>()
                .Include(d => d.Employees)
                .Where(d => d.DeptId == request.Id)
                .Select(d => new DepartmentDto
                {
                    DeptId = d.DeptId,
                    DeptName = d.DeptName,
                    Employees = d.Employees.Select(e => new EmployeeDto
                    {
                        Eid = e.Eid,
                        FirstName = e.FirstName,
                        LastName = e.LastName,
                        Salary = e.Salary,
                        DeptId = e.DeptId,

                    }).ToList()
                }).FirstOrDefaultAsync(cancellationToken);

            if (department == null)
            {
                throw new KeyNotFoundException("Department not found");
            }

            return department;
        }
    }
}
