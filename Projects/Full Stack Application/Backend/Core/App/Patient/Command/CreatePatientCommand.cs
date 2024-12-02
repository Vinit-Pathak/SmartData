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
    public class CreatePatientCommand : IRequest<int>
    {
        public Domain.models.Patient Patient { get; set; }
    }

    public class CreatePatientCommandHandler: IRequestHandler<CreatePatientCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreatePatientCommandHandler(IAppDbContext context)
        {
           _context = context;
        }
        public async Task<int> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
        {
            var model = request.Patient;
            if (model == null)
            {
                throw new Exception("Patient model is null");
            }
            _context.Set<Domain.models.Patient>().Add(model);
            await _context.SaveChangesAsync(cancellationToken);
            return model.patientId;
        }

    }

}
