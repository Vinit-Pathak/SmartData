using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Student.Command
{
    public class UpdateStudentCommand:IRequest<StudentDto>
    {
        public StudentDto Student { get; set; }
    }

    public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand, StudentDto>
    {
        private readonly IAppDbContext _context;

        public UpdateStudentCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<StudentDto> Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
        {
            var studId = request.Student.StudentId;
            var student = await _context.Set<Domain.Student>().FindAsync(studId);
            if(student == null)
            {   
                throw new KeyNotFoundException("Student Not Found!");
            }
            student.Name = request.Student.Name;
            student.Email = request.Student.Email;
            student.CourseId = request.Student.CourseId;
            await _context.SaveChangesAsync(cancellationToken);

            return request.Student;
        }
    }
}
