using Core.App.User.Command;
using Core.App.User.Query;
using Dapper;
using Domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IConfiguration _configuration;

        public UserController(IMediator mediator, IConfiguration configuration)
        {
            _mediator = mediator;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {
            var result = await _mediator.Send(new RegisterUserCommand { RegisterDto = model });
            if (!result)
            {
                return Conflict(new
                {
                    statusCode = 409,
                    message = "Email Already Exist"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                Message = "Registered successfully"
            });

        }

        [HttpGet("getUserByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var result = await _mediator.Send(new GetUserByEmail { Email = email });
            if (result == null)
            {
                return NotFound(new
                {
                    statusCode = 404,
                    message = "User not found"
                });
            }
            return Ok(result);

        }

        [HttpGet("GetAllUsers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Users WHERE Role = @Role AND IsActive = 1";
                var users = await connection.QueryAsync<UserDto>(query, new {Role = "User"});
                if(users == null)
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Users WHERE Id = @Id";
                var user = await connection.QuerySingleOrDefaultAsync<Domain.User>(query, new { Id = id });
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(int id, UserDto model)
        {
            var user = await _mediator.Send(new UpdateUserCommand { User = model, Id = id });
            if (!user)
            {
                return NotFound(new
                {
                    statusCode = 404,
                    message = "User not found"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                message = "User updated successfully"
            });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteUserById(int id)
        {
            var user = await _mediator.Send(new DeleteUserCommand { Id = id });
            if (!user)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    message = "User not found"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                message = "User deleted successfully"
            });
        }

    }
}
