using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.User.Query
{
    public class GetAllUserQuery: IRequest<List<Domain.models.User>>
    {
    }

    public class GetAllUserQueryHandler : IRequestHandler<GetAllUserQuery, List<Domain.models.User>>
    {
        private readonly IAppDbContext _context;

        public GetAllUserQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.User>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.User>()
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }
    }
}
