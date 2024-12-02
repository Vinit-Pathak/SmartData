using Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Employee.Command
{
    public class UpdateEmployeeCommand : IRequest<string>
    {
        public Domain.models.Employee Employee { get; set; }
    }

    public class UpdateEmployeeCommandHandler : IRequestHandler<UpdateEmployeeCommand, string>
    {
        private readonly IAppDbContext _context;

        public UpdateEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var empId = request.Employee.employeeId; 
            var employee = await _context.Set<Domain.models.Employee>().FindAsync(empId);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found");
            }

            employee.firstName = request.Employee.firstName;
            employee.middleName = request.Employee.middleName;
            employee.lastName = request.Employee.lastName;
            employee.dob = request.Employee.dob;
            employee.addressLine1 = request.Employee.addressLine1;
            employee.addressLine2 = request.Employee.addressLine2;
            employee.city = request.Employee.city;
            employee.state = request.Employee.state;
            employee.zipCode = request.Employee.zipCode;
            employee.country = request.Employee.country;
            employee.email = request.Employee.email;
            employee.primaryContactNumber = request.Employee.primaryContactNumber;
            employee.secondaryContactNumber = request.Employee.secondaryContactNumber;
            employee.gender = request.Employee.gender;
            employee.department = request.Employee.department;
            employee.jobTitle = request.Employee.jobTitle;
            employee.salary = request.Employee.salary;
            employee.startDate = request.Employee.startDate;
            employee.employementType = request.Employee.employementType;
            employee.IsTermsAccepted = request.Employee.IsTermsAccepted;

            await _context.SaveChangesAsync(cancellationToken);
            return "employee updated";
        }
    }
}
