using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1
{
    public interface IStudentService
    {
        List<Student> GetStudents();
    }
}
