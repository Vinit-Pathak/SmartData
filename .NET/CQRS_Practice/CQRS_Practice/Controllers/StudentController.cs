using App.Core.App.Student.Command;
using App.Core.App.Student.Query;
using App.Core.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Net.Sockets;

namespace CQRS_Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<StudentController> _logger;

        public StudentController(IMediator mediator, ILogger<StudentController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Method");

            var students = await _mediator.Send(new GetAllStudentQuery());
            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var student = await _mediator.Send(new GetByIdStudentQuery { Id = id });
            return Ok(student);
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Post(StudentDto model)
        {
            var student = await _mediator.Send(new CreateStudentCommand { student = model });
            return Ok(student);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, StudentDto model)
        {
            model.StudentId = id;
            var student = await _mediator.Send(new UpdateStudentCommand { Student = model });
            return Ok(student);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var student = await _mediator.Send(new DeleteStudentCommand { Id = id });
            return Ok(student);
        }

    }
}
