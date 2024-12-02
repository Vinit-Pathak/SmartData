using Core.App.User.Command;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly IMediator _mediator;    

        public UserLoginController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Domain.DTO.UserLoginDto loginDto)
        {
            var isAuthenticated = await _mediator.Send(new UserLoginCommand { LoginDto = loginDto });
            if (isAuthenticated)
            {
                return Ok("Login successful");
            }
            return Unauthorized("Invalid email or password");
        }


    }
}
