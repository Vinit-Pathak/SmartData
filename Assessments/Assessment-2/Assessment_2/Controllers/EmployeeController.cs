using Microsoft.AspNetCore.Mvc;
using Assessment_2.Models;
using Assessment_2.Repositories;
using System.ComponentModel.DataAnnotations;

namespace Assessment_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        private readonly IEmployeeRepository _employeeRepository;

        //constructor to initialize the employee repository.
        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        //get all employees.
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_employeeRepository.GetAllEmployees());
        }


        //get an employee by id.
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var employee = _employeeRepository.GetById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }


        //add an employee.
        [HttpPost]
        public IActionResult Add(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _employeeRepository.Add(employee);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return CreatedAtAction(nameof(GetById), new { id = employee.Id }, employee);
        }


        //update an employee.
        [HttpPut("{id}")]
        public IActionResult Update(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _employeeRepository.Update(employee);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }


        //delete an employee.
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _employeeRepository.Delete(id);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return NoContent();
        }
    }
}
