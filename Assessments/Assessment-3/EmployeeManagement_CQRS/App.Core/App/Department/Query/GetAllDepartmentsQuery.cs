using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Department.Query
{
    //Define the request
    public class GetAllDepartmentsQuery : IRequest<List<EmployeeDepartmentDto>>
    { }

    //Define the request handler
    public class GetAllDepartmentsQueryHandler : IRequestHandler<GetAllDepartmentsQuery, List<EmployeeDepartmentDto>>
    {
        private readonly IAppDbContext _appDbContext;

        //Constructor
        public GetAllDepartmentsQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        //Handle the request
        public async Task<List<EmployeeDepartmentDto>> Handle(GetAllDepartmentsQuery request, CancellationToken cancellationToken)
        {
            var list = await _appDbContext.Set<Domain.Department>()
                 .AsNoTracking()
                 .ToListAsync(cancellationToken);
            return list.Adapt<List<EmployeeDepartmentDto>>();
        }
    }
}
