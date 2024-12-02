using core.Interface;
using domain.ModelDto;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.App.User.Command
{
    public class CreateUserCommand : IRequest<bool>
    {
        public RegisterDto RegisterUser { get; set; }
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, bool>
    {
        private readonly IAppDbContext _context;

        public CreateUserCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = request.RegisterUser;

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User is null");
            }


            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.DateCreated = DateTime.Now;
            var newUser = user.Adapt<domain.User>();
            await _context.Set<domain.User>().AddAsync(newUser);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
