using App.Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Command
{
    public class DeletePatientByIdPermanentCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }



    public class DeletePatientByIdCommandHandler : IRequestHandler<DeletePatientByIdPermanentCommand, bool>
    {

        private readonly IAppDbContext _appDbContext;

        public DeletePatientByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> Handle(DeletePatientByIdPermanentCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;

            var patient = await _appDbContext.Set<Domain.Patient>().FindAsync(id);

            if (patient == null)
            {
                return false;
            }
            patient.IsPatientActive = false;
            //_appDbContext.Set<Domain.Patient>().Remove(patient);

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return true;
        }
    }






}
