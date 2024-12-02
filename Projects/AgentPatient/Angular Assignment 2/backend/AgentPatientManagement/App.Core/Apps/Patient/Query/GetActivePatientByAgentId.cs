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
    public class GetActivePatientByAgentId : IRequest<List<Domain.Patient>>
    {
        public int AgentId { get; set; }
    }

    public class GetActivePatientByAgentIdHandler : IRequestHandler<GetActivePatientByAgentId, List<Domain.Patient>>
    {
        private readonly IAppDbContext _context;

        public GetActivePatientByAgentIdHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Domain.Patient>> Handle(GetActivePatientByAgentId request, CancellationToken cancellationToken)
        {
            var patients = await _context.Set<Domain.Patient>()
                .Where(p => p.IsPatientActive == true && p.AId == request.AgentId)
                .ToListAsync(cancellationToken);
            return patients;
        }
    }

}
