using Core.Interface;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Core.App.Customer.Command
{
    public class DeleteCustomerCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class DeleteCustomerCommandHandler : IRequestHandler<DeleteCustomerCommand, int>
    {
        private readonly IAppDbContext _context;

        public DeleteCustomerCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(DeleteCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = await _context.Set<Domain.models.Customer>().FindAsync(request.Id);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found");
            }
            _context.Set<Domain.models.Customer>().Remove(customer);
            await _context.SaveChangesAsync(cancellationToken);
            return customer.customerId;
        }
    }
}
