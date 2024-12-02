using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Assessment_1.Question_2;

namespace Assessment_1
{
    internal class EmpDetails
    {
        // Define a class to store the employee details
        public class EmployeeDetails
        {
            public int EmployeeId { get; set; }
            public string EmployeeName { get; set; }
            public string DepartmentName { get; set; }
        }

        // Define a method to get the employee details
        public static List<EmployeeDetails> GetEmployeeDetails(List<Employee> employees, List<Department> departments)
        {
            // Use LINQ to join the employees and departments lists
            var employeeDetails = from e in employees  
                                  join d in departments on e.DepartmentId equals d.DepartmentId 
                                  select new EmployeeDetails
                                  {
                                      EmployeeId = e.EmployeeId, 
                                      EmployeeName = e.EmployeeName,
                                      DepartmentName = d.DepartmentName
                                  };

            return employeeDetails.ToList(); // Convert the result to a list and return it
        }

    }
    
}
