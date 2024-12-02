using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Patient.Query
{
    public class GetAllPatientsQuery : IRequest<List<Domain.models.Patient>>
    {
    }

    public class GetAllPatientQueryHandler : IRequestHandler<GetAllPatientsQuery, List<Domain.models.Patient>>
    {
        private readonly IAppDbContext _context;

        public GetAllPatientQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.models.Patient>> Handle(GetAllPatientsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Set<Domain.models.Patient>()
                 .AsNoTracking()
                 .ToListAsync();
        }
    }
}
