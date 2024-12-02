using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class Patient
    {
        public int patientId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public DateTime dob { get; set; }
        public string gender { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipCode { get; set; }
        public string country { get; set; }
        public string email { get; set; }
        public int primaryContactNumber { get; set; }
        public int secondaryContactNumber { get; set; }
        public string insuranceProvider { get; set; }
        public string insurancePolicyNumber { get; set; }
        public string bloodGroup { get; set; }
        public string allergies { get; set; }
        public string currentMedications { get; set; }
        public bool IsTermsAccepted { get; set; }
    }
}
