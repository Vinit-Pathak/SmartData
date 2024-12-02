using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Query
{
    public class GetAllPatientQuery : IRequest<List<Domain.Patient>>
    {
    }

    public class GetAllPatientQueryHandler : IRequestHandler<GetAllPatientQuery, List<Domain.Patient>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllPatientQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Domain.Patient>> Handle(GetAllPatientQuery request, CancellationToken cancellationToken)
        {
            var allPatient = await _appDbContext.Set<Domain.Patient>().ToListAsync();

            return allPatient;
        }
    }



}
