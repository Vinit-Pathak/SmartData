using BCrypt.Net;
using Core.Interface;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class ChangePasswordCommand: IRequest<bool>
    {
        public ChangePasswordDto ChangePasswordDto { get; set; }
    }

    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, bool>
    {
        private readonly IAppDbContext _context;

        public ChangePasswordCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var model = request.ChangePasswordDto;
            var user = await _context.Set<Domain.User>()
                .FirstOrDefaultAsync(x => x.UserName == model.UserName);

            if (user == null)
            {
                return false;
            }


            user.Password = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            //_context.Set<Domain.User>().Update(user);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }

    }
}
