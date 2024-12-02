using Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Patient.Command
{
    public class DeletePatientCommand: IRequest<int>
    {
        public int Id { get; set; }
    }

    public class DeletePatientCommandHandler : IRequestHandler<DeletePatientCommand, int>
    {
        private readonly IAppDbContext _context;

        public DeletePatientCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
        {
            var patient = await _context.Set<Domain.models.Patient>().FindAsync(request.Id);
            if (patient == null)
            {
                throw new KeyNotFoundException("Patient not found");
            }
            _context.Set<Domain.models.Patient>().Remove(patient);
            await _context.SaveChangesAsync(cancellationToken);
            return patient.patientId;
        }

       
    }

}
