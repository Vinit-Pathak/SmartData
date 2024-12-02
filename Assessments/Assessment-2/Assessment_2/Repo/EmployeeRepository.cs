using System.Collections.Generic;
using System.Linq;
using Assessment_2.Models;
using System.ComponentModel.DataAnnotations;

namespace Assessment_2.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        //used to store a collection of employee objects.
        private readonly List<Employee> _employees = new List<Employee>();

        //returns all employees in the collection.
        public IEnumerable<Employee> GetAllEmployees()
        {
            return _employees;
        }

        //returns an employee by id.
        public Employee GetById(int id)
        {
            return _employees.FirstOrDefault(e => e.Id == id);
        }


        //add an employee to the collection.
        public void Add(Employee employee)
        {
            ValidateEmployee(employee);
            if (employee.Id == 0)
            {
                throw new ValidationException("Employee Id cannot be 0.");
            }
            if (_employees.Any(e => e.Id == employee.Id))
            {
                throw new ValidationException($"An employee with Id {employee.Id} already exists.");
            }
            _employees.Add(employee);
        }

        //updates an employee in the collection.
        public void Update(Employee employee)
        {
            ValidateEmployee(employee);
            var existingEmployee = GetById(employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Position = employee.Position;
                existingEmployee.Salary = employee.Salary;
                existingEmployee.Department = employee.Department;
            }
            else
            {
                throw new ValidationException($"Employee with Id {employee.Id} does not exist.");
            }
        }

        //deletes an employee from the collection.
        public void Delete(int id)
        {
            var employee = GetById(id);
            if (employee != null)
            {
                _employees.Remove(employee);
            }
            else
            {
                throw new ValidationException($"Employee with Id {id} does not exist.");
            }
        }

        //validates an employee object.
        private void ValidateEmployee(Employee employee)
        {
            var validationContext = new ValidationContext(employee);
            Validator.ValidateObject(employee, validationContext, validateAllProperties: true);
        }
    }
}
