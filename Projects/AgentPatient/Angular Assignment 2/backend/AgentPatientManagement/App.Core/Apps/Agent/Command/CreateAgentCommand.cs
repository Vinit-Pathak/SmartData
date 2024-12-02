using App.Core.Interface;
using Domain.ModelDto;
using Mapster;
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
    public class CreateAgentCommand : IRequest<bool>
    {
        public AgentDto Agent { get; set; }
    }


    public class CreateAgentCommandHandler : IRequestHandler<CreateAgentCommand, bool>
    {
        private readonly IAppDbContext _appDbContext;

        public CreateAgentCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> Handle(CreateAgentCommand request, CancellationToken cancellationToken)
        {
            var agent = request.Agent;

            var agentData = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(us => us.Email == agent.Email);

            if (agentData != null)
            {
                return false;
            }

            var lastAgent = await _appDbContext.Set<Domain.Agent>().OrderByDescending(a => a.AgentId).FirstOrDefaultAsync();
            string newAgentId;

            if (lastAgent == null)
            {
                newAgentId = "AG0001";
            }
            else
            {
                int numericPart = int.Parse(lastAgent.AgentId.Substring(2));
                newAgentId = $"AG{(numericPart + 1).ToString("D4")}";
            }

            agent.Password = BCrypt.Net.BCrypt.HashPassword(agent.Password, 13);

            agent.DateCreated = DateTime.Now;

            agent.AgentId = newAgentId;

            var newAgent = agent.Adapt<Domain.Agent>();

            await _appDbContext.Set<Domain.Agent>().AddAsync(newAgent);

            await _appDbContext.SaveChangesAsync();

            return true;
        }

    }



}
