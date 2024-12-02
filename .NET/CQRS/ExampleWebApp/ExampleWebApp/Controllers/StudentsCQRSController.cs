using App.Core.Apps.Student.Command;
using App.Core.Apps.Student.Query;
using App.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ExampleWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsCQRSController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StudentsCQRSController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentDto model)
        {
            var studentId = await _mediator.Send(new CreateStudentCommand { Student = model });
            return Ok(studentId);
        }

        [HttpPut]
        public async Task<IActionResult> Update(StudentDto model)
        {
            var student = await _mediator.Send(new UpdateStudentCommand { Student = model });
            return Ok(student);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult>Delete(int id)
        {
            var msg = await _mediator.Send(new DeleteStudentByIdCommand { Id = id });
            return Ok(msg);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var studentId = await _mediator.Send(new GetStudentsQuery());
            return Ok(studentId);
        }
    }
}
