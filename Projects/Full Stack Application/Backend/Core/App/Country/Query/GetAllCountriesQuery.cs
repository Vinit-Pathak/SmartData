using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Country.Query
{
    public class GetAllCountriesQuery : IRequest<List<Domain.models.Country>>
    {
    }

    public class GetAllCountriesQueryHandler : IRequestHandler<GetAllCountriesQuery, List<Domain.models.Country>>
    {
        private readonly IAppDbContext _context;

        public GetAllCountriesQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.Country>> Handle(GetAllCountriesQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.Country>()
                 .AsNoTracking()
                 .ToListAsync();
        }


    }
}
