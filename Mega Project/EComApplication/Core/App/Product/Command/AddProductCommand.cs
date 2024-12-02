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
    public class AddProductCommand: IRequest<object>
    {
        public ProductDto Product { get; set; }
    }

    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, object>
    {
        private readonly IAppDbContext _context;

        public AddProductCommandHandler(IAppDbContext context)
        {
            _context = context;
        }
        public async Task<object> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            var product = request.Product;
            if (product.SellingPrice < product.PurchasePrice)
            {
                return new { Message = "Selling Price must be greater than Purchase Price" };
            }

            var lastProduct = await _context.Set<Domain.Product>()
                .OrderByDescending(p => p.CreatedAt)
                .FirstOrDefaultAsync(cancellationToken);

            int nextId = (lastProduct == null) ? 1 : int.Parse(lastProduct.ProductCode.Split('_')[1]) + 1;
            string productCode = $"PC_{nextId.ToString("D3")}";

            var newProduct = new Domain.Product
            {
                ProductName = product.ProductName,
                ProductCode = productCode,
                Category = product.Category,
                Brand = product.Brand,
                SellingPrice = product.SellingPrice,
                PurchasePrice = product.PurchasePrice,
                PurchaseDate = product.PurchaseDate,
                Stock = product.Stock,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Deleted = false
            };
            await _context.Set<Domain.Product>().AddAsync(newProduct, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return new { Message = "Product added successfully" };
        }
    }
}
