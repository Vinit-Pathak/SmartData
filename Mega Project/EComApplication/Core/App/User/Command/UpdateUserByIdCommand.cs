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
    public class UpdateUserByIdCommand: IRequest<bool>
    {
        public UserDto User{ get; set; }
        public int Id { get; set; }
    }

    public class UpdateUserByIdCommandHandler : IRequestHandler<UpdateUserByIdCommand, bool>
    {
        private readonly IAppDbContext _context;

        public UpdateUserByIdCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(UpdateUserByIdCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;
            var user = await _context.Set<Domain.User>().FirstOrDefaultAsync(x=> x.Id == id && x.IsActive == true);
            if (user == null)
            {
                return false;
            }

            user.FirstName = request.User.FirstName;
            user.LastName = request.User.LastName;
            user.Email = request.User.Email;
            user.Mobile = request.User.Mobile;
            user.DateOfBirth = request.User.DateOfBirth;
            user.UserType = request.User.UserType;
            user.ProfileImage = request.User.ProfileImage;
            user.Address = request.User.Address;
            user.ZipCode = request.User.ZipCode;
            user.State = request.User.State;
            user.Country = request.User.Country;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
