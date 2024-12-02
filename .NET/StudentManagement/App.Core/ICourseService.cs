using App.Core.Models;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public interface ICourseService
    {
        void AddCourse(Course course);
        Course GetCourse(int id);
        List<Course> GetCourses();
        List<StudentDto> GetStudentsForCourse(int courseId);
        void DeleteCourse(int id);
        void UpdateCourse(Course course);
    }
}
