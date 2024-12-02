using Core.App.Customer.Command;
using Core.App.Customer.Query;
using Core.App.Employee.Command;
using Core.App.Employee.Query;
using Domain.models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        
        private readonly IMediator _mediator;

        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _mediator.Send(new GetAllEmployeeQuery());
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _mediator.Send(new GetEmployeeByIdQuery { Id = id });
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEmployee(Employee employee)
        {
            var employeeId = await _mediator.Send(new CreateEmployeeCommand { Employee = employee });
            return Ok(employeeId);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(int id, Employee employee)
        {
            employee.employeeId = id;
            var msg = await _mediator.Send(new UpdateEmployeeCommand { Employee = employee });
            return Ok(new {message = msg});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _mediator.Send(new DeleteEmployeeCommand { Id = id });
            return Ok(employee);
        }
    }
}

