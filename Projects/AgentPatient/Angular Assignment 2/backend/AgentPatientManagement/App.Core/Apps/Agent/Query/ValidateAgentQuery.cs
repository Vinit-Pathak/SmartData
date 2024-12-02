using App.Core.Interface;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace App.Core.Apps.Agent.Query
{
    public class ValidateAgentQuery : IRequest<Object>
    {
        public LoginDto Login { get; set; }
    }

    public class ValidateAgentQueryHandler : IRequestHandler<ValidateAgentQuery, Object>
    {

        private readonly IAppDbContext _appDbContext;
        private readonly IConfiguration _configuration;

        public ValidateAgentQueryHandler(IAppDbContext appDbContext, IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
        }

        public async Task<Object> Handle(ValidateAgentQuery request, CancellationToken cancellationToken)
        {
            var agentDto = request.Login;

            var agent = await _appDbContext.Set<Domain.Agent>().FirstOrDefaultAsync(agent => agent.Email == agentDto.Email);

            if (agent == null || !BCrypt.Net.BCrypt.Verify(agentDto.Password, agent.Password))
            {
                return "Email or Password Invalid";
            }

            var claim = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim("Id", agent.AId.ToString()),
                new Claim("Email",agent.Email),
                new Claim("FirstName",agent.FirstName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claim,
                expires: DateTime.Now.AddMinutes(1),
                signingCredentials: signIn);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return new { 
                Token = jwt,
                Expiration = token.ValidTo
            };
        }

    }
}
