using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Customer.Query
{
    public class GetCustomerByIdQuery : IRequest<Domain.models.Customer>
    {
        public int Id { get; set; }
    }
    
public class GetCustomerByIdQueryHandler : IRequestHandler<GetCustomerByIdQuery, Domain.models.Customer>
    {
        private readonly IAppDbContext _context;

        public GetCustomerByIdQueryHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<Domain.models.Customer> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
        {

            var customer = await _context.Set<Domain.models.Customer>().FindAsync(request.Id);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found");
            }
            return customer;
        }
    }
}
