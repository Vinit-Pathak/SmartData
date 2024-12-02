using core.Interface;
using domain;
using domain.ModelDto;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace core.App.User.Query
{
    public class VerifyOtpQuery : IRequest<Object>
    {
        public VerifyOtpDto VerifyOtpDto { get; set; }
    }

    public class VerifyOtpQueryHandler : IRequestHandler<VerifyOtpQuery, Object>
    {
        private readonly IAppDbContext _context;
        private readonly IConfiguration _configuration;

        public VerifyOtpQueryHandler(IAppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<object> Handle(VerifyOtpQuery request, CancellationToken cancellationToken)
        {
            var verifyOtp = request.VerifyOtpDto;
            var otp = await _context.Set<Otp>().FirstOrDefaultAsync(x => x.Email == verifyOtp.Email && x.Code == verifyOtp.Otp);

            if (otp == null || otp.Expiration < DateTime.Now)
            {
                return "Invalid OTP";
            }

            var userExist = await _context.Set<domain.User>().FirstOrDefaultAsync(x => x.Email == verifyOtp.Email);
            var claim = new[]
             {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim("Id", userExist.UserId.ToString()),
                new Claim("Email", userExist.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claim,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signIn);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return new
            {
                Token = jwt,
                Expiration = token.ValidTo
            };
        }
    }
}
