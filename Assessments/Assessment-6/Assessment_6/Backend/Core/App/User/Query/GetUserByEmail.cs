using Core.Interface;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.User.Query
{
    public class GetUserByEmail: IRequest<Domain.User>
    {
        public string Email { get; set; }
    }

    public class GetUserByEmailHandler : IRequestHandler<GetUserByEmail, Domain.User>
    {
        private readonly IAppDbContext _appDbContext;

        public GetUserByEmailHandler(IAppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Domain.User> Handle(GetUserByEmail request, CancellationToken cancellationToken)
        {
            var email = request.Email;
            var user = await _appDbContext.Set<Domain.User>().FirstOrDefaultAsync(x => x.Email == email);   

            return user.Adapt<Domain.User>();
        }
    }
}
