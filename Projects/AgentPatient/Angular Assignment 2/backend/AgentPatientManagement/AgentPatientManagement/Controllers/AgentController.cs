using App.Core.Apps.Agent.Command;
using App.Core.Apps.Agent.Query;
using Domain.ModelDto;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace RegisterLoginForget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgentController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AgentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("get-agent-by-email/{email}")]
        public async Task<IActionResult> GetAgentById(string email)
        {
            var agent = await _mediator.Send(new GetAgentByEmailQuery { Email = email });

            if (agent == null)
            {
                return NotFound(new
                {
                    message = "Agent Not Found",
                    statusCode = 404
                });
            }

            return Ok(agent);
        }

        [HttpPost]
        public async Task<IActionResult> RegisterAgent(AgentDto model)
        {
            var isAgentAdded = await _mediator.Send(new CreateAgentCommand { Agent = model });

            if (!isAgentAdded)
            {
                return Conflict(new
                {
                    statusCode = 409,
                    message = "Agent Already Exist"
                });
            }

            return Ok(new
            {
                statusCode = 200,
                message = "Agent Added Successfully"
            });
        }

        [HttpPost("/login-agent")]
        public async Task<IActionResult> LoginAgent(LoginDto model)
        {
            var isAgentValidate = await _mediator.Send(new ValidateAgentQuery { Login = model });

            if (isAgentValidate == "Email or Password Invalid")
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
                data = isAgentValidate,
                
            });
        }

        [HttpPost("/change-password")]
        public async Task<IActionResult> ChangePassword(ChangeAgentPasswordDto model)
        {
            var isPasswordChange = await _mediator.Send(new ChangeAgentPasswordCommand { AgentPasswordDto = model });

            if (!isPasswordChange)
            {
                return BadRequest(new
                {
                    statusCode = 400,
                    message = "Invalid Credentials or Current Password Incorrect"
                });
            }

            return Ok(new
            {
                statusCode = 200,
                message = "Password Change Successfully"
            });
        }
    }
}
