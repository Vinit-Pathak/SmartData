using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Student.Command
{
    public class CreateStudentCommand: IRequest<string>
    {
        public StudentDto student {  get; set; }
    }

    public class CreateStudentCommandHandler : IRequestHandler<CreateStudentCommand, string>
    {
        private readonly IAppDbContext _appDbContext;

        public CreateStudentCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<string> Handle(CreateStudentCommand request, CancellationToken cancellationToken)
        {
            var model = request.student;
            var result = model.Adapt<Domain.Student>();
            await _appDbContext.Set<Domain.Student>().AddAsync(result);
            await _appDbContext.SaveChangesAsync(cancellationToken);
            return "Student Created Successfully";
        }
    }
}
