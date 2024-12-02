using App.Core.Interface;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Agent.Command
{
    public class ChangeAgentPasswordCommand : IRequest<bool>
    {
        public ChangeAgentPasswordDto AgentPasswordDto { get; set; }
    }


    public class ChangeAgentPasswordCommandHandler : IRequestHandler<ChangeAgentPasswordCommand, bool>
    {
        private readonly IAppDbContext _appDbContext;

        public ChangeAgentPasswordCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> Handle(ChangeAgentPasswordCommand request, CancellationToken cancellationToken)
        {
            var agentPasswordDto = request.AgentPasswordDto;

            var agent = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(agent => agent.AId == agentPasswordDto.AId);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentPasswordDto.OldPassword, agent.Password))
            {
                return false;
            }

            agent.Password = BCrypt.Net.BCrypt.HashPassword(agentPasswordDto.NewPassword, 13);

            await _appDbContext.SaveChangesAsync();

            return true;
        }

    }
}
