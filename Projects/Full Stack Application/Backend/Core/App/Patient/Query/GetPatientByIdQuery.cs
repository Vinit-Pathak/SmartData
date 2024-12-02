using Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Patient.Query
{
    public class GetPatientByIdQuery: IRequest<Domain.models.Patient>
    {
        public int Id { get; set; }
    }
    
    public class GetPatientByIdQueryHandler: IRequestHandler<GetPatientByIdQuery, Domain.models.Patient>
    {
        private readonly IAppDbContext _context;

        public GetPatientByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Domain.models.Patient> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
        {
            var patient = await _context.Set<Domain.models.Patient>().FindAsync(request.Id);
            if (patient == null)
            {
                throw new KeyNotFoundException("Patient not found");
            }
            return patient;
        }
    }
}
