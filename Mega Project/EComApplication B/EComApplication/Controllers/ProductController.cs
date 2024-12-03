using Core.App.Product.Command;
using Core.App.User.Command;
using Core.Models;
using Dapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace EComApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public ProductController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpGet("getAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Products WHERE IsDeleted = 0";
                var users = await connection.QueryAsync<ProductDto>(query);
                if (users == null)
                {
                    return NotFound(new
                    {
                        statusCode = 404,
                        message = "No users found"
                    });
                }
                return Ok(users.ToList());
            }
        }

        
        [HttpGet("getProductById/{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Products WHERE Id = @Id AND IsDeleted = 0";
                var user = await connection.QuerySingleOrDefaultAsync<ProductDto>(query, new { Id = id });
                if (user == null)
                {
                    return NotFound(new
                    {
                        statusCode = 404,
                        message = "Product not found"
                    });
                }
                return Ok(user);
            }
        }

        [HttpPost("addProduct")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProduct( ProductDto model)
        {
            using (var stream = model.File.OpenReadStream())
            {
                var command = new AddProductCommand
                {
                    FileStream = stream,
                    FileName = model.File.FileName,
                    Product = model
                };

                // Use MediatR to handle the command
                var result = await _mediator.Send(command);

                if (!result)
                {
                    return Conflict(new
                    {
                        statusCode = 409,
                        message = "Selling Price must be greater than Purchase Price "
                    });
                }

                return Ok(new
                {
                    statusCode = 200,
                    message = "Product Added Successfully"
                });
            }
        }

        [HttpPut("updateProduct/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto model)
        {
            var result = await _mediator.Send(new UpdateProductByIdCommand { Id = id, Product = model });
            if (!result)
            {
                return NotFound(new
                {
                    statusCode = 404,
                    message = "Product not found"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                message = "Product updated successfully"
            });
        }

        [HttpDelete("deleteProduct/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var result = await _mediator.Send(new DeleteProductByIdCommand { Id = id });
            if (!result)
            {
                return NotFound(new
                {
                    statusCode = 404,
                    message = "Product not found"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                message = "Product deleted successfully"
            });
        }
    }
}
