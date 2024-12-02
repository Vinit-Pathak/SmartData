using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class DeleteUserCommand:IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
    {
        private readonly IAppDbContext _context;

        public DeleteUserCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Set<Domain.User>().FirstOrDefaultAsync(u => u.Id == request.Id);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.IsActive = false;
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
