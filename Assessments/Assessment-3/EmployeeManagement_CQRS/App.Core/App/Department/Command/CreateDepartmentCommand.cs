using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Department.Command
{
    // Define the request
    public class CreateDepartmentCommand : IRequest<string>
    {
        public EmployeeDepartmentDto Department { get; set; }
    }

    // Define the handler

    public class CreateDepartmentCommandHandler : IRequestHandler<CreateDepartmentCommand, string>
    {
        private readonly IAppDbContext _context;

        // Constructor
        public CreateDepartmentCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        // Handle the request
        public async Task<string> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
        {
            // Check if department with the same name already exists
            bool departmentExists = _context.Set<Domain.Department>()
                .Any(d => d.DeptName == request.Department.DeptName);

            if (departmentExists)
            {
                return "Error: Department with the same name already exists.";
            }

            // Create new department
            var department = new Domain.Department
            {
                DeptName = request.Department.DeptName
            };

            _context.Set<Domain.Department>().Add(department);
            await _context.SaveChangesAsync(cancellationToken);

            return "Department created successfully.";
        }
    }
}
