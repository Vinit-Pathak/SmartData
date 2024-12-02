using Core.App.User.Command;
using Core.Models;
using Dapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace EComApplication.Controllers
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
        public async Task<IActionResult> RegisterUser([FromBody] RegisterDto model)
        {
            var result = await _mediator.Send(new RegisterUserCommand { register = model });
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

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var result = await _mediator.Send(new LoginUserCommand { LoginDto = model });

            // Check the success status
            var isSuccessProperty = result.GetType().GetProperty("IsSuccess")?.GetValue(result) as bool?;

            if (isSuccessProperty == false)
            {
                var message = result.GetType().GetProperty("Message")?.GetValue(result)?.ToString();
                return Unauthorized(new
                {
                    statusCode = 401,
                    message = message ?? "Invalid Credentials"
                });
            }

            return Ok(new
            {
                statusCode = 200,       
                message = "Login Successfully",
                data = result,
            });
        }


        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDto model)
        {
            var result = await _mediator.Send(new ChangePasswordCommand { ChangePasswordDto = model });
            if (!result)
            {
                return Unauthorized(new
                {
                    statusCode = 401,
                    message = "Invalid Credentials"
                });
            }



            return Ok(new
            {
                statusCode = 200,
                message = "Otp Send Successfully"
            });

        }

        [HttpGet("sendOtp/{username}/{password}")]
        public async Task<IActionResult> SendOtp(string username, string password)
        {
            var result = await _mediator.Send(new SendOtpCommand { UserName = username, Password = password });
            if (!result)
            {
                return Unauthorized(new
                {
                    statusCode = 401,   
                    message = "Invalid Credentials"
                });
            }



            return Ok(new
            {
                statusCode = 200,
                message = "Otp Send Successfully"
            });


        }


        [HttpGet("forgetPassword")]
        public async Task<IActionResult> ForgetPassword(string email)
        {
            var result = await _mediator.Send(new ForgetPasswordCommand { Email = email });
            if (result is string)
            {
                return Unauthorized(new
                {
                    statusCode = 401,
                    message = "Invalid Credentials"
                });
            }
            return Ok(result);
        }


        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Users WHERE IsActive = 1";
                var users = await connection.QueryAsync<UserDto>(query);
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

        [HttpGet("getUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Users WHERE Id = @Id AND IsActive = 1";
                var user = await connection.QuerySingleOrDefaultAsync<Domain.User>(query, new { Id = id });
                if (user == null)
                {
                    return NotFound(new
                    {
                        statusCode = 404,
                        message = "User not found"
                    });
                }
                return Ok(user);
            }
        }

        [HttpGet("getUserByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var query = "SELECT * FROM Users WHERE Email = @Email AND IsActive = 1";
                var user = await connection.QuerySingleOrDefaultAsync<Domain.User>(query, new { Email = email });
                if (user == null)
                {
                    return NotFound(new
                    {
                        statusCode = 404,
                        message = "User not found"
                    });
                }
                return Ok(user);
            }
        }

        [HttpPut("updateUser/{id}")]
        public async Task<IActionResult> UpdateUserById(int id, UserDto model)
        {
            var user = await _mediator.Send(new UpdateUserByIdCommand { Id = id, User = model });
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

        [HttpDelete("deleteUser/{id}")]
        public async Task<IActionResult> DeleteUserById(int id)
        {
            var result = await _mediator.Send(new DeleteUserByIdCommand { Id = id });
            if (!result)
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
                message = "User deleted successfully"
            });
        }

    }
}