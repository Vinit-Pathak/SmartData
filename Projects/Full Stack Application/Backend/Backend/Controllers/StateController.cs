using Core.App.State.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IMediator _mediator;

        public StateController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{countryId}")]
        public async Task<IActionResult> GetStateByCountryId(int countryId)
        {
            var states = await _mediator.Send(new GetStateByCountryIdQuery(countryId));
            return Ok(states);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStatesQuery()
        {
            var states = await _mediator.Send(new GetAllStatesQuery());
            return Ok(states);
        }
    }
}
