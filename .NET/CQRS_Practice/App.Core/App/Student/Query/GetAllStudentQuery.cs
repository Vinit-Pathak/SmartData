using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Student.Query
{
    public class GetAllStudentQuery : IRequest<List<StudentDto>>
    { }

    public class GetAllStudentQueryHandler : IRequestHandler<GetAllStudentQuery, List<StudentDto>>
    {
        private readonly IAppDbContext _context;

        public GetAllStudentQueryHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentDto>> Handle(GetAllStudentQuery request, CancellationToken cancellationToken)
        {
            var list = await _context.Set<Domain.Student>()
                .AsNoTracking()
                .ToListAsync();
            return list.Adapt<List<StudentDto>>();
        }
    }
}
