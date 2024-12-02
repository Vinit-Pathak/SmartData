using core.Interface;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace core.App.User.Query
{
    public class GetUserByEmailQuery:IRequest<domain.User>
    {
        public string Email { get; set; }
    }

    public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, domain.User>
    {
        private readonly IAppDbContext _context;

        public GetUserByEmailQueryHandler(IAppDbContext context)
        {
             _context = context;
        }
        public async Task<domain.User> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            var email = request.Email;
            var user = await _context.Set<domain.User>().FirstOrDefaultAsync(x => x.Email == email);
            var userDetail = user.Adapt<domain.User>();    

            return userDetail;

        }
    }
}
