using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core.Models
{
    // Define the DepartmentDto
    public class DepartmentDto
    {
        // Define the properties
        public int DeptId { get; set; }
        public string DeptName { get; set; }
        public List<EmployeeDto> Employees { get; set; }
    }
}
