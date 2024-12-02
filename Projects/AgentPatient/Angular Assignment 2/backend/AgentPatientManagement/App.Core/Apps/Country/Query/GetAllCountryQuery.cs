using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Country.Query
{
    public class GetAllCountryQuery : IRequest<List<Domain.Country>>
    {
    }

    public class GetAllCountryQueryHandler : IRequestHandler<GetAllCountryQuery, List<Domain.Country>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllCountryQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Domain.Country>> Handle(GetAllCountryQuery request, CancellationToken cancellationToken)
        {
            var allCountry = await _appDbContext.Set<Domain.Country>().ToListAsync();

            return allCountry;
        }
    }


}
