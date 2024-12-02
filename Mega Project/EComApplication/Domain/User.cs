using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Mobile { get; set; }
        public DateTime DateOfBirth { get; set; }
        public UserType UserType { get; set; }
        public string ProfileImage { get; set; }
        public string Address { get; set; }
        public int ZipCode { get; set; }
        public int State { get; set; }
        public int Country { get; set; }
        public bool IsActive { get; set; }
    }

}
