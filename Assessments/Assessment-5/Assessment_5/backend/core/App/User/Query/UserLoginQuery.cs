using core.Interface;
using domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class UserLoginQuery : IRequest<Object>
{
    public domain.ModelDto.LoginDto LoginUser { get; set; }
}

public class UserLoginQueryHandler : IRequestHandler<UserLoginQuery, Object>
{
    private readonly IAppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService; 

    public UserLoginQueryHandler(IAppDbContext context, IConfiguration configuration, IEmailService emailService)
    {
        _context = context;
        _configuration = configuration;
        _emailService = emailService;
    }

    public async Task<Object> Handle(UserLoginQuery request, CancellationToken cancellationToken)
    {
        var user = request.LoginUser;

        var otp = await _context.Set<Otp>().FirstOrDefaultAsync(x => x.Email == user.Email && x.Code == user.Otp);

        if (otp == null || otp.Expiration < DateTime.Now)
        {
            return "Invalid OTP";
        }


        var userExist = await _context.Set<domain.User>().FirstOrDefaultAsync(x => x.Email == user.Email);

        if (userExist == null || !BCrypt.Net.BCrypt.Verify(user.Password, userExist.Password))
        {
            return "Email or Password Invalid";

        }


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
