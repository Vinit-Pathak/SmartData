using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Course.Query
{
    public class GetAllCourseQuery: IRequest<List<CourseDto>>
    {}

    public class GetAllCourseQueryHandler : IRequestHandler<GetAllCourseQuery, List<CourseDto>>
    {
        private readonly IAppDbContext _context;

        public GetAllCourseQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<List<CourseDto>> Handle(GetAllCourseQuery request, CancellationToken cancellationToken)
        {
            var list = await _context.Set<Domain.Course>()
                .AsNoTracking()
                .ToListAsync(cancellationToken);
            return list.Adapt<List<CourseDto>>();
        }
    }
}
