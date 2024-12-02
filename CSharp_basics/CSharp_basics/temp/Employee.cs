using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSharp_basics.temp
{
    public class Employee
    {
        // Public member: Accessible from anywhere
        public string Name { get; set; }

        // Private member: Accessible only within the class
        private int Salary { get; set; }

        // Protected member: Accessible within the class and by derived classes
        protected string Department { get; set; }

        // Internal member: Accessible within the same assembly
        internal string Company { get; set; }

        public void ShowDetails()
        {
            Console.WriteLine($"Name: {Name}, Company: {Company}");
        }
    }
}
