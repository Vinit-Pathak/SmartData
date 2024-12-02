using App.Core;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpPost("CreateCourse")]
        public async Task<IActionResult> Post(Course course)
        {
            _courseService.AddCourse(course);
            var result = await Task.FromResult(course);

            return Ok(course);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var courses = _courseService.GetCourses();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var course = _courseService.GetCourse(id);
            if (course == null)
            {
                return NotFound();
            }

            var students = _courseService.GetStudentsForCourse(id);
            var result = new
            {
                Course = course,
                Students = students
            };

            return Ok(result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Course course)
        {
            if (id != course.CourseId)
            {
                return BadRequest();
            }
            
            _courseService.UpdateCourse(course);
            return Ok();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _courseService.DeleteCourse(id);
            return Ok();
        }
    }
}
