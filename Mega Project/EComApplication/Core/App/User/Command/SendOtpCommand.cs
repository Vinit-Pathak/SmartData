using Core.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class SendOtpCommand : IRequest<bool>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class SendOtpCommandHandler : IRequestHandler<SendOtpCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;

        public SendOtpCommandHandler(IAppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<bool> Handle(SendOtpCommand request, CancellationToken cancellationToken)
        {
            var userName = request.UserName;
            var password = request.Password;

            // Check if the user exists
            var user = await _context.Set<Domain.User>()
                .FirstOrDefaultAsync(x => x.UserName == userName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return false;
            }

            var otp = new Random().Next(100000, 999999).ToString();
            // Remove any existing OTPs for this UserName
            var existingOtps = await _context.Set<Otp>()
                .Where(o => o.UserName.ToLower() == user.UserName.ToLower())
                .ToListAsync(cancellationToken);

            if (existingOtps.Any())
            {
                _context.Set<Otp>().RemoveRange(existingOtps);
            }

            var otpEntry = new Otp
            {
                UserName = user.UserName,
                Code = otp,
                Expiration = DateTime.Now.AddMinutes(5)
            };

            await _context.Set<Otp>().AddAsync(otpEntry, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            await _emailService.SendEmailAsync(user.Email, "Your OTP Code", $"Your OTP is {otp}");

            return true;
        }
    }
}
