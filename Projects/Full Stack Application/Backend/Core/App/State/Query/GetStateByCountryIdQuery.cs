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
    public class GetStateByCountryIdQuery: IRequest<List<Domain.models.State>>
    {
        public int CountryId { get; set; }

        public GetStateByCountryIdQuery(int countryId)
        {
            CountryId = countryId;
        }
    }
   
    public class GetAllStateQueryHandler : IRequestHandler<GetStateByCountryIdQuery, List<Domain.models.State>>
    {
        private readonly IAppDbContext _context;

        public GetAllStateQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.State>> Handle(GetStateByCountryIdQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.State>()
                .Where(x => x.country_id == request.CountryId)
                 .AsNoTracking()
                 .ToListAsync();
        }

        
    }
}
