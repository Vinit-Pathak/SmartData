using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.State.Query
{
    public class GetAllStatesQuery : IRequest<List<Domain.models.State>>
    {  }

    public class GetAllStatesQueryHandler : IRequestHandler<GetAllStatesQuery, List<Domain.models.State>>
    {
        private readonly IAppDbContext _context;

        public GetAllStatesQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.State>> Handle(GetAllStatesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.State>()
                 .AsNoTracking()
                 .ToListAsync();
        }

        
    }
}
