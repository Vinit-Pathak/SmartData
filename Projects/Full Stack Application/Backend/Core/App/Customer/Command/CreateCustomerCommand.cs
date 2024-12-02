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
    public class CreateCustomerCommand : IRequest<int>
    {
        public Domain.models.Customer Customer { get; set; }
    }

    public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateCustomerCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            var model = request.Customer;
            if (model == null)
            {
                throw new Exception("Customer model is null");
            }
            _context.Set<Domain.models.Customer>().Add(model);
            await _context.SaveChangesAsync(cancellationToken);
            return model.customerId;
        }
    }
}
    
        
