using System.Collections.Generic;
using Assessment_2.Models;

namespace Assessment_2.Repositories
{
    //Interface for the employee repository.
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetById(int id);
        void Add(Employee employee);
        void Update(Employee employee);
        void Delete(int id);
    }
}
