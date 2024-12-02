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
    public class UpdatePatientCommand : IRequest<string>
    {
        public Domain.models.Patient Patient { get; set; }
    }

    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, string>
    {
        private readonly IAppDbContext _context;

        public UpdatePatientCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<string> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            var patientId = request.Patient.patientId;
            var patient = await _context.Set<Domain.models.Patient>().FindAsync(patientId);
            if (patient == null)
            {
                throw new KeyNotFoundException("Patient not found");
            }

            // Update patient properties
            patient.firstName = request.Patient.firstName;
            patient.middleName = request.Patient.middleName;
            patient.lastName = request.Patient.lastName;
            patient.dob = request.Patient.dob;
            patient.addressLine1 = request.Patient.addressLine1;
            patient.addressLine2 = request.Patient.addressLine2;
            patient.city = request.Patient.city;
            patient.state = request.Patient.state;
            patient.zipCode = request.Patient.zipCode;
            patient.country = request.Patient.country;
            patient.email = request.Patient.email;
            patient.primaryContactNumber = request.Patient.primaryContactNumber;
            patient.secondaryContactNumber = request.Patient.secondaryContactNumber;
            patient.gender = request.Patient.gender;
            patient.insuranceProvider = request.Patient.insuranceProvider;
            patient.insurancePolicyNumber = request.Patient.insurancePolicyNumber;
            patient.bloodGroup = request.Patient.bloodGroup;
            patient.allergies = request.Patient.allergies;
            patient.currentMedications = request.Patient.currentMedications;
            patient.IsTermsAccepted = request.Patient.IsTermsAccepted;

            await _context.SaveChangesAsync(cancellationToken);
            return "Patient updated";


        }
    }
}
