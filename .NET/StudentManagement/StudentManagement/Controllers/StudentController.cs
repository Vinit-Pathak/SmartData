using App.Core;
using App.Core.Models;
using Domain;
using Infrastructure.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentDto model)
        {
            var student = new Student
            {
                Name = model.Name,
                Email = model.Email,
                StudentCourseMappings = new List<StudentCourseMapping>()
                
            };

            _studentService.AddStudent(student, model.CourseId);

            var result = await Task.FromResult(student);

            model.StudentId = result.StudentId;


            return Ok(model);
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var students = _studentService.GetStudents();
            return Ok(students);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(int id)
        {

            var student = _studentService.GetStudent(id);
            var result = await Task.FromResult(student);

            return Ok(student);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody] StudentDto studentDto)
        {
            if (id != studentDto.StudentId)
            {
                return BadRequest("Student ID mismatch");
            }

            _studentService.UpdateStudent(studentDto);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            _studentService.DeleteStudent(id);
            return Ok();
        }
    }
}
