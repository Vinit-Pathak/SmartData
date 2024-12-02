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
    public class CreateCourseCommand:IRequest<string>
    {
        public CourseDto Course { get; set; }   
    }

    public class CreateCourseCommandHandler : IRequestHandler<CreateCourseCommand, string>
    {
        private readonly IAppDbContext _context;

        public CreateCourseCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<string> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
        {
            bool courseExists = _context.Set<Domain.Course>()
                .Any(c => c.CourseName == request.Course.CourseName);
            if (courseExists) {
                return "Error: Course with the same name already exists.";
            }

            var course = new Domain.Course
            {
                CourseName = request.Course.CourseName
            };

            await _context.Set<Domain.Course>().AddAsync(course);
            await _context.SaveChangesAsync(cancellationToken);

            return "Course Created Successfully";
        }
    }

}
