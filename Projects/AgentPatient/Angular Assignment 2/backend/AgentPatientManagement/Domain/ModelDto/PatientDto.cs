using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ModelDto
{
    public class PatientDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int Country { get; set; }
        public int State { get; set; }
        public string PostalCode { get; set; }
        public string CurrentMedications { get; set; }
        public string BloodType { get; set; }
        public DateTime NextAppointmentDate { get; set; }
        public string ReasonForVisit { get; set; }
        public string Allergies { get; set; }
        public bool HasAgreeToTerms { get; set; }
        public bool IsPatientActive { get; set; }
        public int AId { get; set; }
    }
}
