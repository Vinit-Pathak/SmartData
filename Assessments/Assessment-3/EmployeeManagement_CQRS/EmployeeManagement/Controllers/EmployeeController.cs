using App.Core.App.Employee.Command;
using App.Core.App.Employee.Query;
using App.Core.App.Student.Command;
using App.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IMediator _mediator;
        // Inject the IMediator
        public EmployeeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _mediator.Send(new GetEmployeesQuery());
            return Ok(employees);
        }


        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var employee = await _mediator.Send(new GetEmployeeByIdQuery { Id = id });
            return Ok(employee);
        }

        // POST: api/Employee
        [HttpPost]
        public async Task<IActionResult> Post(EmployeeDto model)
        {
            var employeeId = await _mediator.Send(new CreateEmployeeCommand { Employee = model });
            return Ok(employeeId);
        }

        // PUT: api/Employee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EmployeeDto model)
        {
            model.Eid = id;
            var employee = await _mediator.Send(new UpdateEmployeeByIdCommand { Employee = model });
            return Ok(employee);
        }


        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var employeeId = await _mediator.Send(new DeleteEmployeeByIdCommand { Id = id });
            return Ok(employeeId);
        }
    }
}
