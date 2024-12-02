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
    public class DeleteEmployeeCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class DeleteEmployeeCommandHandler : IRequestHandler<DeleteEmployeeCommand, int>
    {
        private readonly IAppDbContext _context;

        public DeleteEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = await _context.Set<Domain.models.Employee>().FindAsync(request.Id);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found");
            }
            //_context.Set<Domain.models.Employee>().Remove(employee);
            employee.IsActive = false;
            await _context.SaveChangesAsync(cancellationToken);
            return employee.employeeId;
        }
    }
}
