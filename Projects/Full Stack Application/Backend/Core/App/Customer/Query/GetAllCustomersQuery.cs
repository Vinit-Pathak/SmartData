using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Customer.Query
{
    public class GetAllCustomersQuery: IRequest<List<Domain.models.Customer>>
    {
    }

    public class GetAllCustomersQueryHandler: IRequestHandler<GetAllCustomersQuery, List<Domain.models.Customer>>
    {
        private readonly IAppDbContext _context;

        public GetAllCustomersQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.Customer>> Handle(GetAllCustomersQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.Customer>()
                 .AsNoTracking()
                 .ToListAsync();
            
        }

        
    }
}
