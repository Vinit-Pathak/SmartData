using Core.Interface;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Core.App.User.Command
{
    public class RegisterUserCommand : IRequest<bool>
    {
        public RegisterDto register { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly IEmailService _emailService;

        public RegisterUserCommandHandler(IAppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }
        public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.register;
            var userExist = await _context.Set<Domain.User>().Where(x => x.Email == user.Email).FirstOrDefaultAsync();

            if (userExist != null)
            {
                return false;
            }

            //Username
            string newDOB = user.DateOfBirth.ToString("ddMMyy");
            string username = $"EC_{user.LastName.ToUpper()}{user.FirstName[0].ToString().ToUpper()}{newDOB}";


            // Generate Random Password
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            string password = new string(Enumerable.Repeat(chars, 8).Select(s => s[new Random().Next(s.Length)]).ToArray());

            if (userExist.UserName == username)
            {
                username = $"{username}_1";
            }

            var newUser = new Domain.User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                UserName = username,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Mobile = user.Mobile,
                DateOfBirth = user.DateOfBirth,
                ProfileImage = user.ProfileImage,
                UserType = user.UserType,
                Address = user.Address,
                ZipCode = user.ZipCode,
                State = user.State,
                Country = user.Country,
                IsActive = true
            };

            await _context.Set<Domain.User>().AddAsync(newUser);
            await _context.SaveChangesAsync(cancellationToken);

            await _emailService.SendEmailAsync(user.Email, "Welcome to EComApplication",
                 $"Your username is {username} and your password is {password}");

            return true;
        }

        

        
    }
}
