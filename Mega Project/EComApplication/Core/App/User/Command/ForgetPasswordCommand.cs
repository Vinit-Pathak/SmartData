using Core.Interface;
using Core.Models;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class ForgetPasswordCommand: IRequest<object>
    {
        public string Email { get; set; }
    }

    public class ForgetPasswordCommandHandler : IRequestHandler<ForgetPasswordCommand, object>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;

        public ForgetPasswordCommandHandler(IAppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }
        public async Task<object> Handle(ForgetPasswordCommand request, CancellationToken cancellationToken)
        {
            var email = request.Email.Trim().ToLower();
            var user = await _context.Set<Domain.User>().FirstOrDefaultAsync(x => x.Email.ToLower() == email, cancellationToken);

            if (user == null)
            {
                return new { Message = "Invalid email address" };
            }

            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string password = new string(Enumerable.Repeat(chars, 8).Select(s => s[new Random().Next(s.Length)]).ToArray());


            user.Password = BCrypt.Net.BCrypt.HashPassword(password);
            _context.Set<Domain.User>().Update(user);

            await _context.SaveChangesAsync(cancellationToken);
            await _emailService.SendEmailAsync(user.Email, "Password Reset", $"Your new password is {password}");
            return new
            {
                message = "New Password sent to your email"
            };
        }
    }
}
