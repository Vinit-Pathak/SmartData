using App.Core.Interface;
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
    public class DeleteDepartmentByIdCommand : IRequest<string>
    {
        public int Id { get; set; }
    }

    // Define the handler
    public class DeleteDepartmentByIdCommandHandler : IRequestHandler<DeleteDepartmentByIdCommand, string>
    {
        private readonly IAppDbContext _appDbContext;

        // Constructor
        public DeleteDepartmentByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request
        public async Task<string> Handle(DeleteDepartmentByIdCommand request, CancellationToken cancellationToken)
        {
            var department = await _appDbContext.Set<Domain.Department>().FindAsync(request.Id);
            if (department == null)
            {
                return "Department Not Found";
            }
            _appDbContext.Set<Domain.Department>().Remove(department);
            await _appDbContext.SaveChangesAsync(cancellationToken);

            return "Department Deleted";
        }
    }
}
