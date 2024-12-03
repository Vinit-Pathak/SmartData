using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class LoginDto
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public UserType UserType { get; set; }
        public string? Otp { get; set; }
    }
}
