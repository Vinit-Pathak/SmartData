using App.Core.Interface;
using Domain.ModelDto;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Agent.Query
{
    public class GetAgentByEmailQuery : IRequest<AgentDetailsDto>
    {
        public string Email { get; set; }
    }


    public class GetAgentByEmailQueryHandler : IRequestHandler<GetAgentByEmailQuery, AgentDetailsDto>
    {

        private readonly IAppDbContext _appDbContext;

        public GetAgentByEmailQueryHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<AgentDetailsDto> Handle(GetAgentByEmailQuery request, CancellationToken cancellationToken)
        {
            var email = request.Email;

            var agent = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(agent => agent.Email == email);

            var agentData = agent.Adapt<AgentDetailsDto>();

            return agentData;
        }

    }
}
