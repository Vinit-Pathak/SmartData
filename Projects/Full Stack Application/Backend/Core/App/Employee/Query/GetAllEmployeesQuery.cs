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
    public class GetAllEmployeeQuery : IRequest<List<Domain.models.Employee>>
    {
    }

    public class GetAllEmployeeQueryHandler : IRequestHandler<GetAllEmployeeQuery, List<Domain.models.Employee>>
    {
        private readonly IAppDbContext _context;

        public GetAllEmployeeQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.Employee>> Handle(GetAllEmployeeQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.Employee>()
                .Where(x => x.IsActive == true)
                 .AsNoTracking()
                 .ToListAsync();

        }


    }
}
