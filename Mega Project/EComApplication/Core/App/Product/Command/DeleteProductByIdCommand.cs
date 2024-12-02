using Core.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.Product.Command
{
    public class DeleteProductByIdCommand:IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteProductByIdCommandHandler : IRequestHandler<DeleteProductByIdCommand, bool>
    {
        private readonly IAppDbContext _context;

        public DeleteProductByIdCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(DeleteProductByIdCommand request, CancellationToken cancellationToken)
        {
            var product = await _context.Set<Domain.Product>().FirstOrDefaultAsync(x => x.Id == request.Id);
            if (product == null)
            {
                throw new Exception("Product not found");
            }
            product.IsDeleted = false;
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
