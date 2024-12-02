using App.Core.App.Course.Command;
using App.Core.App.Course.Query;
using App.Core.App.Student.Query;
using App.Core.Models;
using Mapster;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CQRS_Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CourseController(IMediator mediator)
        {
            _mediator = mediator;
        }

        
        [HttpGet("[action]")]
        public async Task<IActionResult> Get()
        {
            var course = await _mediator.Send(new GetAllCourseQuery());
            return Ok(course);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = await _mediator.Send(new GetByIdCourseQuery {Id = id });
            return Ok(course);
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Post(CourseDto model)
        {
            var course = await _mediator.Send(new CreateCourseCommand { Course = model });
            return Ok(course);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, CourseDto model)
        {
            model.CourseId = id;
            var course = await _mediator.Send(new UpdateCourseCommand { Course = model });
            return Ok(course);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var course = await _mediator.Send(new DeleteCourseCommand { Id = id });
            return Ok(course);
        }
    }
}
