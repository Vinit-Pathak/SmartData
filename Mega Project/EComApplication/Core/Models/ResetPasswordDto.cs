using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ResetPasswordDto
    {
        public string UserName { get; set; }
        public string Otp { get; set; }
        public string NewPassword { get; set; }
    }
}
