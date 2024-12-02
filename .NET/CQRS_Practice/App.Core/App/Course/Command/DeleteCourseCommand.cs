using App.Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Course.Command
{
    public class DeleteCourseCommand:IRequest<string>
    {
        public int Id { get; set; }
    }

    public class DeleteCourseCommandHandler : IRequestHandler<DeleteCourseCommand, string>
    {
        private readonly IAppDbContext _context;

        public DeleteCourseCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<string> Handle(DeleteCourseCommand request, CancellationToken cancellationToken)
        {
            var course = await _context.Set<Domain.Course>().FindAsync(request.Id);
            if(course == null)
            {
                throw new KeyNotFoundException("Course Not Found!");
            }
            _context.Set<Domain.Course>().Remove(course);
            await _context.SaveChangesAsync(cancellationToken);
            return "Course Deleted Successfully";
        }
    }
}
