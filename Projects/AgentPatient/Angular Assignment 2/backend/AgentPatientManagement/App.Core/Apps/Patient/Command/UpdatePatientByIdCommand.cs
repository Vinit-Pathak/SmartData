using App.Core.Interface;
using Domain;
using Domain.ModelDto;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Patient.Command
{
    public class UpdatePatientByIdCommand : IRequest<bool>
    {
        public PatientDto Patient { get; set; }
        public int Id { get; set; }
    }



    public class UpdatePatientByIdCommandHandler : IRequestHandler<UpdatePatientByIdCommand, bool>
    {

        private readonly IAppDbContext _appDbContext;

        public UpdatePatientByIdCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }


        public async Task<bool> Handle(UpdatePatientByIdCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;

            var patient = await _appDbContext.Set<Domain.Patient>().FindAsync(id);

            if (patient == null)
            {
                return false;
            }

            patient.FirstName = request.Patient.FirstName;
            patient.LastName = request.Patient.LastName;
            patient.DateOfBirth = request.Patient.DateOfBirth;
            patient.Email = request.Patient.Email;
            patient.Gender = request.Patient.Gender;
            patient.PhoneNumber = request.Patient.PhoneNumber;
            patient.Address = request.Patient.Address;
            patient.State = request.Patient.State;
            patient.Country = request.Patient.Country;
            patient.PostalCode = request.Patient.PostalCode;
            patient.BloodType = request.Patient.BloodType;
            patient.CurrentMedications = request.Patient.CurrentMedications;
            patient.NextAppointmentDate = request.Patient.NextAppointmentDate;
            patient.ReasonForVisit = request.Patient.ReasonForVisit;
            patient.Allergies = request.Patient.Allergies;
            patient.HasAgreeToTerms = request.Patient.HasAgreeToTerms;
            patient.IsPatientActive = request.Patient.IsPatientActive;



            await _appDbContext.SaveChangesAsync(cancellationToken);

            return true;
        }
    }





}
