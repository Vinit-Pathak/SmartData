using App.Core.Interface;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Student.Command
{
    public class DeleteStudentCommand : IRequest<string>
    {
        public int Id { get; set; }
    }

    public class DeleteStudentCommandHandler : IRequestHandler<DeleteStudentCommand, string>
    {
        private readonly IAppDbContext _context;

        public DeleteStudentCommandHandler(IAppDbContext context){
            _context = context;
        }

        public async Task<string> Handle(DeleteStudentCommand request, CancellationToken cancellationToken)
        {
            var student = await _context.Set<Domain.Student>().FindAsync(request.Id);
            if(student == null)
            {
                return "Student Not Found!";
            }
            _context.Set<Domain.Student>().Remove(student);
            await _context.SaveChangesAsync(cancellationToken);
            return "Student Deleted Successfully";
        }
    }
}
