using Core.Interface;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.Product.Command
{
    public class UpdateProductByIdCommand: IRequest<bool>
    {
        public ProductDto Product { get; set; }
        public int Id { get; set; }
    }

    public class UpdateProductByIdCommandHandler : IRequestHandler<UpdateProductByIdCommand, bool>
    {
        private readonly IAppDbContext _context;

        public UpdateProductByIdCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(UpdateProductByIdCommand request, CancellationToken cancellationToken)
        {
            var id = request.Id;
            var product = await _context.Set<Domain.Product>().FirstOrDefaultAsync(x => x.Id == id && x.Deleted == false);
            if (product == null)
            {
                return false;
            }

            product.ProductName = request.Product.ProductName;
            product.Category = request.Product.Category;
            product.Brand = request.Product.Brand;
            product.SellingPrice = request.Product.SellingPrice;
            product.PurchasePrice = request.Product.PurchasePrice;
            product.PurchaseDate = request.Product.PurchaseDate;
            product.Stock = request.Product.Stock;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
