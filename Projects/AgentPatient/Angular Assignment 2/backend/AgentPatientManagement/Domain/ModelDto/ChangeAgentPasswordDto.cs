using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ModelDto
{
    public class ChangeAgentPasswordDto
    {
        public int AId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
