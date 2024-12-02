using App.Core.Interfaces;
using App.Core.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Student.Command
{
    public class UpdateStudentCommand: IRequest<StudentDto>
    {
        public StudentDto Student { get; set; }
    }
    public class UpdateStudentCommandHandler : IRequestHandler<UpdateStudentCommand, StudentDto>
    {

        private readonly IAppDbContext _appDbContext;

        public UpdateStudentCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<StudentDto> Handle(UpdateStudentCommand request, CancellationToken cancellationToken)
        {
            var stdId = request.Student.StudentId;

           var std=await _appDbContext.Set<Domain.Student>().FindAsync(stdId);

            std.FirstName=request.Student.FirstName;
            std.LastName=request.Student.LastName;
            std.DateOfBith=request.Student.DateOfBith;
            await _appDbContext.SaveChangesAsync(cancellationToken);    

            return request.Student;
        }
    }
}
