using core.App.User.Query;
using domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("getUserByEmail/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var result = await _mediator.Send(new core.App.User.Query.GetUserByEmailQuery { Email = email });
            if (result == null)
            {
                return NotFound(new
                {
                    statusCode = 404,
                    message = "User Not Found"
                });
            }
            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(domain.ModelDto.RegisterDto user)
        {
            var result = await _mediator.Send(new core.App.User.Command.CreateUserCommand { RegisterUser = user });
            if (!result)
            {
                return Conflict(new
                {
                    statusCode = 409,
                    message = "Email already exist"
                });
            }
            return Ok(new
            {
                statusCode = 200,
                message = "User Created Successfully"
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginDto user)
        {
            var result = await _mediator.Send(new UserLoginQuery { LoginUser = user });
            if (result is string)
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
                data = result
            });
        }

        [HttpGet("sendotp/{email}")]
        public async Task<IActionResult> SendOtp(string email)
        {
            var result = await _mediator.Send(new SendOtpQuery { Email = email });
            if (result is string)
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
                message = "Otp Send Successfully",
                data = result
            });
        }
    }
}
