using Core.Interface;
using Core.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class LoginUserCommand:IRequest<object>
    {
        public required LoginDto LoginDto { get; set; }
    }

    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, object>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public LoginUserCommandHandler(IAppDbContext context, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
        }
        public async Task<object> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            var model = request.LoginDto;

            var user = await _context.Set<Domain.User>()
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == model.UserName.ToLower(), cancellationToken);

            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password) || user.UserType != model.UserType)
            {
                return new { isSuccess = false, message = "Invalid Username, Password, or Role" };
            }

            var otp = await _context.Set<Otp>()
                .FirstOrDefaultAsync(x => x.UserName == model.UserName && x.Code == model.Otp);

            if (otp == null || otp.Expiration < DateTime.Now || otp.Code != model.Otp)
            {
                return new { isSuccess = false, message = "Invalid OTP" };
            }

            _context.Set<Otp>().Remove(otp);
            await _context.SaveChangesAsync(cancellationToken);

            var claims = new[]
            {
                new Claim("Id", user.Id.ToString()),
                new Claim("UserName", user.UserName),
                new Claim("Email", user.Email),
                new Claim(ClaimTypes.Role, user.UserType.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            return new
            {
                isSuccess = true,
                token = new JwtSecurityTokenHandler().WriteToken(token),
                role = user.UserType,
                id = user.Id,
                expiration = token.ValidTo
            };
        }

    }
}
