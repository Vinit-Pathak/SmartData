﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ModelDto
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Otp { get; set; }
    }
}
