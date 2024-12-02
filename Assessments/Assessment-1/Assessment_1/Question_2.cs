using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assessment_1
{
    internal class Question_2
    {
        // Define a class to store the department details
        public class Department
        {
            public int DepartmentId { get; set; }
            public string DepartmentName { get; set; }
        }

        // Define a class to store the employee details
        public class Employee
        {
            public int EmployeeId { get; set; }
            public string EmployeeName { get; set; }
            public int DepartmentId { get; set; }
        }

    }
}
