using Core.Interface;
using Domain;
using Domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.Auth
{
    public class LoginUserCommand : IRequest<object>
    {
        public LoginDto LoginDto { get; set; }
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, object>
    {
        private readonly IAppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public LoginUserCommandHandler(IAppDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }
        public async Task<object> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var model = request.LoginDto;
            var user = await _context.Set<Domain.User>().FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password) || user.Role != model.Role)
            {
                return "Email or Password Invalid or Role Invalid";
            }

            var otp = await _context.Set<Otp>().FirstOrDefaultAsync(x => x.Email == model.Email && x.Code == model.Otp);

            if (otp == null || otp.Expiration < DateTime.Now)
            {
                return "Invalid OTP";
            }

            var claims = new List<Claim>
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim("Email", user.Email),
                    //new Claim(ClaimTypes.Role, user.Role)
                };

            //var  selectrole = await _context.Set<Domain.User>().Where(a=>a.Role==user.Role).Select(x => x.Role).ToListAsync();
            var selectRole = await _context.Set<Domain.User>().Where(a => a.Role == model.Role).Select(a => a.Role).ToListAsync();
            foreach (var role in selectRole)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return new
            {
                Token = jwt,
                Expiration = token.ValidTo,
                role = selectRole,
                Name = user.FirstName + " " + user.LastName
            };
        }
    }
}
