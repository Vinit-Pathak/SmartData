using Core.Interface;
using Domain.ModelDto;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Command
{
    public class UpdateUserCommand: IRequest<bool>
    {
        public UserDto User { get; set; }
        public int Id { get; set; }
    }

    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, bool>
    {
        private readonly IAppDbContext _appDbContext;

        public UpdateUserCommandHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;

            var user = await _appDbContext.Set<Domain.User>().FindAsync(id);

            if (user == null)
            {
                return false;
            }

            user.FirstName = request.User.FirstName;
            user.LastName = request.User.LastName;
            user.Role = request.User.Role;

            await _appDbContext.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
