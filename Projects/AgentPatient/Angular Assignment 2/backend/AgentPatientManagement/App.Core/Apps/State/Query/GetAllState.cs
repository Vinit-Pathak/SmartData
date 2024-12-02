using App.Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.State.Query
{
    public class GetAllState : IRequest<List<Domain.State>>
    {
    }


    public class GetAllStateQueryHandler : IRequestHandler<GetAllState, List<Domain.State>>
    {
        private readonly IAppDbContext _appDbContext;

        public GetAllStateQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<Domain.State>> Handle(GetAllState request, CancellationToken cancellationToken)
        {
            var allState = await _appDbContext.Set<Domain.State>().ToListAsync();

            return allState;
        }
    }






}
