using Core.App.Auth;
using Core.App.User.Command;
using Domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Authenticate")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var result = await _mediator.Send(new LoginUserCommand { LoginDto = model });
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
                message = "Login Successfully",
                data = result,
            });
        }

        [HttpGet("sendOtp/{email}")]
        public async Task<IActionResult> SendOtp(string email)
        {
            var result = await _mediator.Send(new SendOtpCommand { Email = email });
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
                message = "Otp Sent Successfully",
                data = result
            });
        }
    }
}
