using Core.Interface;
using Domain.models;
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
    public class UserSignUpCommand: IRequest<int>
    {
        public Domain.DTO.UserSignUpDto SignUpDto { get; set; }
    }

    public class UserSignUpCommandHandler : IRequestHandler<UserSignUpCommand, int>
    {
        private readonly IAppDbContext _context;

        public UserSignUpCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(UserSignUpCommand request, CancellationToken cancellationToken)
        {
            var model = request.SignUpDto;
            if(model.Password != model.ConfirmPassword)
            {
                throw new Exception("Password and Confirm Password does not match");
            }

            var existingUser = await _context.Set<Domain.models.User>()
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Email == model.Email, cancellationToken);

            if (existingUser != null)
            {
                throw new Exception("Email is already Exisits");
            }


            var user = new Domain.models.User
            {
                FullName = model.FullName,
                Email = model.Email,
                Password = model.Password,
                IsActive = true
            };
            _context.Set<Domain.models.User>().Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            return user.UserId;
        }
    }

}
