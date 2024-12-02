using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Models
{
    // EmployeeDto
    public class EmployeeDto
    {
        // Properties
        public int Eid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Salary { get; set; }
        public int DeptId { get; set; }
    }
}
