using Core.App.User.Command;
using Core.App.User.Query;
using Domain.DTO;
using Domain.models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserSignUpController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserSignUpController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(UserSignUpDto signUpDto)
        {
            var result = await _mediator.Send(new UserSignUpCommand {SignUpDto = signUpDto});
            return Ok(result);
        }

        [HttpGet("allUser")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _mediator.Send(new GetAllUserQuery());
            return Ok(result);
        }
    }
}
