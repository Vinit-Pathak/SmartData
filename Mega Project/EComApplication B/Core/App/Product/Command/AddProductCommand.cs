using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using Core.Interface;
using Core.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.App.Product.Command
{
    public class AddProductCommand: IRequest<bool>
    {
        public ProductDto Product { get; set; }
        public Stream FileStream { get; set; }
        public string FileName { get; set; }
    }

    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, bool>
    {
        private readonly IAppDbContext _context;
        private readonly string _connectionString;
        private readonly string _containerName = "ecomapplication";
        private readonly string _folderName = "profile-images";

        public AddProductCommandHandler(IAppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _connectionString = configuration.GetConnectionString("AzureBlobStorage");
        }
        public async Task<bool> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            var product = request.Product;
            if (product.SellingPrice < product.PurchasePrice)
            {
                return false;
            }

            var lastProduct = await _context.Set<Domain.Product>()
                .OrderByDescending(p => p.CreatedAt)
                .FirstOrDefaultAsync(cancellationToken);

            int nextId = (lastProduct == null) ? 1 : int.Parse(lastProduct.ProductCode.Split('_')[1]) + 1;
            string productCode = $"PC_{nextId.ToString("D3")}";

            var blobServiceClient = new BlobServiceClient(_connectionString);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(_containerName);
            var blobClient = blobContainerClient.GetBlobClient($"{_folderName}/{Guid.NewGuid()}");

            var blobHttpHeaders = new BlobHttpHeaders
            {
                ContentType = GetContentType(request.FileName) // Get MIME type dynamically
            };

            await blobClient.UploadAsync(request.FileStream, new BlobUploadOptions
            {
                HttpHeaders = blobHttpHeaders
            });

            var imageUrl = blobClient.Uri.ToString();

            var newProduct = new Domain.Product
            {
                ProductName = product.ProductName,
                ProductCode = productCode,
                Category = product.Category,
                Brand = product.Brand,
                SellingPrice = product.SellingPrice,
                PurchasePrice = product.PurchasePrice,
                ProductImage = imageUrl,
                PurchaseDate = product.PurchaseDate,
                Stock = product.Stock,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                IsDeleted = false
            };
            await _context.Set<Domain.Product>().AddAsync(newProduct);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

         private string GetContentType(string fileName)
        {
            return fileName.EndsWith(".jpg") || fileName.EndsWith(".jpeg") ? "image/jpeg" :
                   fileName.EndsWith(".png") ? "image/png" :
                   "application/octet-stream"; // Default fallback
        }
    }
}
