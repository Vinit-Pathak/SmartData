using App.Core.Interface;
using App.Core.Models;
using Mapster;
using MediatR;
using System.Threading;
using System.Threading.Tasks;


namespace App.Core.App.Student.Command
{
    // Define the request
    public class CreateEmployeeCommand : IRequest<string> // Change the return type to string
    {
        public EmployeeDto Employee { get; set; }
    }

    // Define the request handler
    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand, string> // Change the return type to string
    {
        private readonly IAppDbContext _context;

        // Constructor
        public CreateEmployeeCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        // HandleHandle the request 
        public async Task<string> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var model = request.Employee;
            var employee = model.Adapt<Domain.Employee>();

            await _context.Set<Domain.Employee>().AddAsync(employee);

            await _context.SaveChangesAsync(cancellationToken);

            return "Employee created successfully"; // Return the custom message
        }
    }
}
