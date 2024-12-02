using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.App.Employee.Query
{
    // Define the request
    public class GetEmployeesQuery:IRequest<List<EmployeeDto>>
    { }

    // Define the request handler
    public class GetEmployeesQueryHandler:IRequestHandler<GetEmployeesQuery, List<EmployeeDto>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetEmployeesQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Handle the request 
        public async Task<List<EmployeeDto>> Handle(GetEmployeesQuery request, CancellationToken cancellationToken)
        {
            var list = await _appDbContext.Set < Domain.Employee>()
                 .AsNoTracking()
                 .ToListAsync();
            return list.Adapt<List<EmployeeDto>>();
        }
    }
}
