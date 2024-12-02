using App.Core.Interface;
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
    public class DeleteEmployeeByIdCommand : IRequest<string>
    {
        public int Id { get; set; }

    }

    // Define the request handler
    public class DeleteEmployeeByIdCommandHandler : IRequestHandler<DeleteEmployeeByIdCommand, string>
    {

        private readonly IAppDbContext _appDbContext;

        // Constructor
        public DeleteEmployeeByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request
        public async Task<string> Handle(DeleteEmployeeByIdCommand request, CancellationToken cancellationToken)
        {
            var employee = await _appDbContext.Set<Domain.Employee>().FindAsync(request.Id);
            if (employee == null)
            {
                return "Employee Not Found";
            }

            _appDbContext.Set<Domain.Employee>().Remove(employee);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return "Employee Deleted";
        }
    }

}
