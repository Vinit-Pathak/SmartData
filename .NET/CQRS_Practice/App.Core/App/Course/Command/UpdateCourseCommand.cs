using App.Core.Interface;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Course.Command
{
    public class UpdateCourseCommand:IRequest<CourseDto>
    {
        public CourseDto Course { get; set; }
    }

    public class UpdateCourseCommandHandler : IRequestHandler<UpdateCourseCommand, CourseDto>
    {
        private readonly IAppDbContext _context;

        public UpdateCourseCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<CourseDto> Handle(UpdateCourseCommand request, CancellationToken cancellationToken)
        {
            var courseId = request.Course.CourseId;
            var course = await _context.Set<Domain.Course>().FindAsync(courseId);
            if (course == null)
            {
                throw new KeyNotFoundException("Course Not Found!");
            }
            course.CourseName = request.Course.CourseName;
            await _context.SaveChangesAsync(cancellationToken);

            return request.Course;
        }
    }
}
