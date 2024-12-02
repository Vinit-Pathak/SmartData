using App.Core.App.Student.Query;
using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Course.Query
{
    public class GetByIdCourseQuery : IRequest<CourseDto>
    {
        public int Id { get; set; }
    }

    public class GetByIdCourseQueryHandler : IRequestHandler<GetByIdCourseQuery, CourseDto>
    {
        private readonly IAppDbContext _context;

        public GetByIdCourseQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<CourseDto> Handle(GetByIdCourseQuery request, CancellationToken cancellationToken)
        {
            var course = await _context.Set<Domain.Course>().FindAsync(request.Id);
            if (course == null)
            {
                throw new KeyNotFoundException("Student not found");
            }
            return new CourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
            };
        }
    }
}
