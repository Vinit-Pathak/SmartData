using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class Employee
    {
        public int employeeId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public DateTime dob { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string city { get; set; }
        public int state { get; set; }
        public int zipCode { get; set; }
        public int country { get; set; }
        public string email { get; set; }
        public int primaryContactNumber { get; set; }
        public int secondaryContactNumber { get; set; }
        public string gender { get; set; }
        public string department { get; set; }
        public string jobTitle { get; set; }
        public int salary { get; set; }
        public DateTime startDate { get; set; }
        public string employementType { get; set; }
        public bool IsTermsAccepted { get; set; }
        public bool IsActive { get; set; }

    }
}
