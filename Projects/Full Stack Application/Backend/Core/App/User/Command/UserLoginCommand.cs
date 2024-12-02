using Core.Interface;
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
    public class UserLoginCommand: IRequest<bool>
    {
        public Domain.DTO.UserLoginDto LoginDto { get; set; }
    }

    public class UserLoginCommandHandler : IRequestHandler<UserLoginCommand, bool>
    {
        private readonly IAppDbContext _context;

        public UserLoginCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(UserLoginCommand request, CancellationToken cancellationToken)
        {
            var loginDto = request.LoginDto;

            var user = await _context.Set<Domain.models.User>()
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email && u.Password == loginDto.Password, cancellationToken);

            return user != null;
        }
    }
}
