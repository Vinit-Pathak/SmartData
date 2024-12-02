using Core.Interface;
using Domain;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class SendOtpCommand : IRequest<object>
    {
        public string Email { get; set; }
    }

    public class SendOtpCommandHandler : IRequestHandler<SendOtpCommand, object>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;

        public SendOtpCommandHandler(IAppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }
        public async Task<object> Handle(SendOtpCommand request, CancellationToken cancellationToken)
        {
            var email = request.Email;
            var user = _context.Set<Domain.User>().FirstOrDefault(x => x.Email == email);

            if(user == null)
            {
                return "Email or Password is incorrect";
            }
            if (!user.IsActive)
            {
                return "User is inactive";
            }

            var otp = new Random().Next(100000, 999999).ToString();
            await _context.Set<Otp>().AddAsync(new Otp { Email = email, Code = otp, Expiration = DateTime.Now.AddMinutes(5) });
            await _context.SaveChangesAsync();
            await _emailService.SendEmailAsync(email, "Your OTP Code", $"Your OTP code is {otp}");
            return new { Message = "OTP sent to your email" };

        }
    }
}
