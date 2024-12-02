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
    public class UpdateCustomerCommand : IRequest<string>
    {
        public Domain.models.Customer Customer { get; set; }
    }

    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, string>
    {
        private readonly IAppDbContext _context;

        public UpdateCustomerCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<string> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        {
            var custId = request.Customer.customerId;
            var customer = await _context.Set<Domain.models.Customer>().FindAsync(custId);
            if (customer == null)
            {
                throw new KeyNotFoundException("Customer not found");
            }

            // Update customer properties
            customer.firstName = request.Customer.firstName;
            customer.middleName = request.Customer.middleName;
            customer.lastName = request.Customer.lastName;
            customer.dob = request.Customer.dob;
            customer.addressLine1 = request.Customer.addressLine1;
            customer.addressLine2 = request.Customer.addressLine2;
            customer.city = request.Customer.city;
            customer.state = request.Customer.state;
            customer.zipCode = request.Customer.zipCode;
            customer.country = request.Customer.country;
            customer.email = request.Customer.email;
            customer.primaryContactNo = request.Customer.primaryContactNo;
            customer.secondaryContactNo = request.Customer.secondaryContactNo;
            customer.gender = request.Customer.gender;
            customer.department = request.Customer.department;
            customer.maritalStatus = request.Customer.maritalStatus;
            customer.bankName = request.Customer.bankName;
            customer.bankBranch = request.Customer.bankBranch;
            customer.qualification = request.Customer.qualification;
            customer.IsTermsAccepted = request.Customer.IsTermsAccepted;

            await _context.SaveChangesAsync(cancellationToken);
            return "customer updated";
        }
    }
}
