using App.Core;
using App.Core.Models;
using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CourseService : ICourseService
    {
        private readonly AppDbContext _dbContext;

        public CourseService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddCourse(Course course)
        {
            _dbContext.courses.Add(course);
            _dbContext.SaveChanges();
        }

        public List<Course> GetCourses()
        {
            return _dbContext.courses.ToList();
        }

        public Course GetCourse(int id)
        {
            var data = _dbContext.courses.FirstOrDefault(x => x.CourseId == id);
            return data ?? throw new InvalidOperationException("Course not found");
        }

        public List<StudentDto> GetStudentsForCourse(int courseId)
        {
            return _dbContext.studentCourseMappings
                           .Where(scm => scm.CourseId == courseId)
                           .Select(scm => new StudentDto
                           {
                               StudentId = scm.Student.StudentId,
                               Name = scm.Student.Name,
                               Email = scm.Student.Email,
                               CourseId = scm.CourseId
                           })
                           .ToList();
        }


        public void UpdateCourse(Course course)
        {
            _dbContext.courses.Update(course);
            _dbContext.SaveChanges();
        }

        public void DeleteCourse(int id)
        {
            var course = _dbContext.courses.Find(id);
            if(course == null)
            {
                throw new InvalidOperationException("Course not found");
            }
            _dbContext.courses.Remove(course);
            _dbContext.SaveChanges();
        }
    }
}
