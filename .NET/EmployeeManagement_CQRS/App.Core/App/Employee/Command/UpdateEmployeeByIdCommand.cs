using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Employee.Command
{
    // Define the request
    public class UpdateEmployeeByIdCommand : IRequest<EmployeeDto>
    {
        public EmployeeDto Employee { get; set; }
    }

    // UpdateEmployeeByIdCommandHandler
    public class UpdateEmployeeByIdCommandHandler : IRequestHandler<UpdateEmployeeByIdCommand, EmployeeDto>
    {
        private readonly IAppDbContext _appDbContext;

        // Constructor
        public UpdateEmployeeByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle
        public async Task<EmployeeDto> Handle(UpdateEmployeeByIdCommand request, CancellationToken cancellationToken)
        {
            var empId = request.Employee.Eid;
            var employee = await _appDbContext.Set<Domain.Employee>().FindAsync(empId);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found");
            }
            employee.FirstName = request.Employee.FirstName;
            employee.LastName = request.Employee.LastName;
            employee.Salary = request.Employee.Salary;
            employee.DeptId = request.Employee.DeptId;
            await _appDbContext.SaveChangesAsync(cancellationToken);

            return request.Employee;
        }
    }

}
