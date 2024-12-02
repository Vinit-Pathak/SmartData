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
    public class CreateEmployeeCommand : IRequest<int>
    {
        public Domain.models.Employee Employee { get; set; }
    }

    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var model = request.Employee;
            if (model == null)
            {
                throw new Exception("Employee model is null");
            }
            model.IsActive = true;
            _context.Set<Domain.models.Employee>().Add(model);
            await _context.SaveChangesAsync(cancellationToken);
            return model.employeeId;
        }
    }
}


