using Core.Interface;
using Domain;
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

namespace Core.App.User.Command
{
    public class RegisterUserCommand: IRequest<bool>
    {
        public RegisterDto RegisterDto { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, bool>
    {
        private readonly IAppDbContext _context;

        public RegisterUserCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.RegisterDto;
            if(user == null)
            {
                throw new Exception("User is null");
            }

            // Check if email already exists
            var existingUser = await _context.Set<Domain.User>().FirstOrDefaultAsync(u => u.Email == user.Email, cancellationToken);
            if (existingUser != null)
            {
                throw new Exception("Email already exists");
            }
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            var newUser = user.Adapt<Domain.User>();
            await _context.Set<Domain.User>().AddAsync(newUser);
            await _context.SaveChangesAsync();
            return true;
        }
    }
    
}

        