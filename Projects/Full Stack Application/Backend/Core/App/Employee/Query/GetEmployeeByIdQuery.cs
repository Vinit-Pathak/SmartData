using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Employee.Query
{
    public class GetEmployeeByIdQuery : IRequest<Domain.models.Employee>
    {
        public int Id { get; set; }
    }

    public class GetEmployeeByIdQueryHandler : IRequestHandler<GetEmployeeByIdQuery, Domain.models.Employee>
    {
        private readonly IAppDbContext _context;

        public GetEmployeeByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<Domain.models.Employee> Handle(GetEmployeeByIdQuery request, CancellationToken cancellationToken)
        {

            var employee = await _context.Set<Domain.models.Employee>().FindAsync(request.Id);
            if (employee == null)
            {
                throw new KeyNotFoundException("Employee not found");
            }
            return employee;
        }
    }
}
