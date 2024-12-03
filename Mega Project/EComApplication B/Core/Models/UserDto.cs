using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class UserDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
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
