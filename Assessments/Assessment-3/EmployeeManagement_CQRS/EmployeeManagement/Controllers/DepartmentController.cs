using App.Core.App.Department.Command;
using App.Core.App.Department.Query;
using App.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace EmployeeManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IMediator _mediator;

        // Inject the IMediator
        public DepartmentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/Department
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var departments = await _mediator.Send(new GetAllDepartmentsQuery());
            return Ok(departments);
        }

        // GET: api/Department/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var department = await _mediator.Send(new GetDepartmentByIdQuery { Id = id });
            return Ok(department);
        }


        // POST: api/Department
        [HttpPost]
        public async Task<IActionResult> Post(EmployeeDepartmentDto model)
        {
            var departmentId = await _mediator.Send(new CreateDepartmentCommand { Department = model });
            return Ok(departmentId);
        }

        // PUT: api/Department/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, DepartmentDto model)
        {
            model.DeptId = id;
            var department = await _mediator.Send(new UpdateDepartmentByIdCommand { Department = model });
            return Ok(department);
        }

        // DELETE: api/Department/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var department = await _mediator.Send(new DeleteDepartmentByIdCommand { Id = id });
            return Ok(department);
        }
    }
}
