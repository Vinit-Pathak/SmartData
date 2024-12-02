using App.Core;
using App.Core.Models;
using Domain;

namespace Infrastructure.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _dbContext;

        public StudentService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddStudent(Student student, int courseId)
        {
            student.StudentCourseMappings
                .Add(new StudentCourseMapping { CourseId = courseId });


            _dbContext.students.Add(student);
            _dbContext.SaveChanges();
        }


        public List<StudentDto> GetStudents()
        {
            return _dbContext.students.Select(student => new StudentDto
            {
                StudentId = student.StudentId,
                Name = student.Name,
                Email = student.Email,
                CourseId = student.StudentCourseMappings.FirstOrDefault().CourseId
            }).ToList();
        }

        public  Student GetStudent(int id)
        {
            //var data = _dbContext.students.Include(student => student.StudentCourseMappings).ThenInclude(StudentCourseMapping => StudentCourseMapping.Course).FirstOrDefault(x => x.StudentId == id);



            var studData = _dbContext.students.FirstOrDefault(x => x.StudentId == id);

            var coursData = _dbContext.studentCourseMappings.FirstOrDefault(x => x.StudentId == id );
            var course = _dbContext.courses.FirstOrDefault(x => x.CourseId == coursData.CourseId);

            return studData ?? throw new InvalidOperationException("Student not found");
        }


        public void UpdateStudent(StudentDto student)
        {
            var stud = _dbContext.students.Find(student.StudentId);
            if (stud == null)
            {
                throw new InvalidOperationException("Student not found");
            }

            stud.Name = student.Name;
            stud.Email = student.Email;

            var studentCourseMapping = _dbContext.studentCourseMappings.FirstOrDefault(x => x.StudentId == student.StudentId);
            if (studentCourseMapping != null)
            {
                studentCourseMapping.CourseId = student.CourseId;
            }

            _dbContext.students.Update(stud);
            _dbContext.SaveChanges();
        }

        public void DeleteStudent(int id)
        {
            var student = _dbContext.students.Find(id);
            if(student == null)
            {
                throw new InvalidOperationException("Student not found");
            }
            _dbContext.students.Remove(student);
            _dbContext.SaveChanges();
        }
    }
}
