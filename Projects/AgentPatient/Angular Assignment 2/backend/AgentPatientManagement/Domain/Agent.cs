using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Agent
    {
        [Key]
        public int AId { get; set; }
        public string AgentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? DateCreated { get; set; }

        public ICollection<Patient> Patients { get; set; }
    }
}
