using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.models
{
    public class Customer
    {
        public int customerId { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public DateTime dob { get; set; }
        public string addressLine1 { get; set; }
        public string addressLine2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public int zipCode { get; set; }
        public string country { get; set; }
        public string email { get; set; }
        public int primaryContactNo { get; set; }
        public int secondaryContactNo { get; set; }
        public string gender { get; set; }
        public string department { get; set; }
        public string maritalStatus { get; set; }
        public string bankName { get; set; }
        public string bankBranch { get; set; }
        public string qualification { get; set; }
        public bool IsTermsAccepted { get; set; }



    }
}
