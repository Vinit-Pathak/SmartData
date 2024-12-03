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
    public class DeleteUserByIdCommand: IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, bool>
    {
        private readonly IAppDbContext _context;

        public DeleteUserByIdCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(DeleteUserByIdCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Set<Domain.User>().FirstOrDefaultAsync(x => x.Id == request.Id);
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
