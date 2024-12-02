using App.Core.Models;
using Domain;

namespace App.Core
{
    public interface IStudentService
    {
        void AddStudent(Student student, int courseId);

        Student GetStudent(int id);

        List<StudentDto> GetStudents();

        void DeleteStudent(int id);

        void UpdateStudent(StudentDto student);
    }
}
