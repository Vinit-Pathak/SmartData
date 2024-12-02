using App.Core.Interface;
using App.Core.Models;
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
    public class UpdateDepartmentByIdCommand : IRequest<DepartmentDto>
    {
        public DepartmentDto Department { get; set; }
    }

    // Define the request handler
    public class UpdateDepartmentByIdCommandHandler : IRequestHandler<UpdateDepartmentByIdCommand, DepartmentDto>
    {
        private readonly IAppDbContext _appDbContext;

        // Constructor
        public UpdateDepartmentByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request  
        public async Task<DepartmentDto> Handle(UpdateDepartmentByIdCommand request, CancellationToken cancellationToken)
        {
            var deptId = request.Department.DeptId;
            var department = await _appDbContext.Set<Domain.Department>().FindAsync(new object[] { deptId }, cancellationToken);
            if (department == null)
            {
                throw new KeyNotFoundException("Department not found");
            }

            department.DeptName = request.Department.DeptName;
            await _appDbContext.SaveChangesAsync(cancellationToken);

            return request.Department;
        }
    }
}
