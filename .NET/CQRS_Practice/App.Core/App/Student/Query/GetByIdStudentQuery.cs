using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Student.Query
{
    public class GetByIdStudentQuery : IRequest<StudentDto>
    {
        public int Id { get; set; }
    }

    public class GetByIdStudentQueryHandler : IRequestHandler<GetByIdStudentQuery, StudentDto>
    {
        private readonly IAppDbContext _context;

        public GetByIdStudentQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<StudentDto> Handle(GetByIdStudentQuery request, CancellationToken cancellationToken)
        {
            var student = await _context.Set<Domain.Student>().FindAsync(request.Id);
            if (student == null)
            {
                throw new KeyNotFoundException("Student not found");
            }
            return new StudentDto
            {
                StudentId = student.StudentId,
                Name = student.Name,
                Email = student.Email,
                CourseId = student.CourseId
            };
        }
    }
}
