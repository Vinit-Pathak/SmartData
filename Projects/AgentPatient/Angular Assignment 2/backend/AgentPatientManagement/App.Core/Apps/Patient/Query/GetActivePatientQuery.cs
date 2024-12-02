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
    public class GetActivePatientQuery : IRequest<List<Domain.Patient>>
    {
    }


    public class GetActivePatientQueryHandler : IRequestHandler<GetActivePatientQuery, List<Domain.Patient>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetActivePatientQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Domain.Patient>> Handle(GetActivePatientQuery request, CancellationToken cancellationToken)
        {
            var allPatient = await _appDbContext.Set<Domain.Patient>().Where(pat => pat.IsPatientActive == true).ToListAsync();

            return allPatient;
        }
    }







}
