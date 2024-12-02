using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Employee.Query
{
    // Define the request
    public class GetEmployeeByIdQuery:IRequest<EmployeeDto>
    {
        public int Id { get; set; }
    }

    // Define the request handler
    public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, EmployeeDto>
    {
        private readonly IAppDbContext _appDbContext;

        // Constructor
        public GetEmployeeByIdQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request 
        public async Task<EmployeeDto> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {
            var employee = await _appDbContext.Set<Domain.Employee>().FindAsync(request.Id);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found");
            }
            return new EmployeeDto
            {
                Eid = employee.Eid,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Salary = employee.Salary,
                DeptId = employee.DeptId
            };
        }

    }

}
