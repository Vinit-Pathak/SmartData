using App.Core.Apps.Country.Query;
using App.Core.Apps.State.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerEmployeePatientManagement.Controllers
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllStateByCountryId(int id)
        {
            var allStateByCountryId = await _mediator.Send(new GetAllStateByCountryIdQuery { CountryId = id });
            return Ok(allStateByCountryId);
        }

        [HttpGet("/all-state")]
        public async Task<IActionResult> GetAllState()
        {
            var allState = await _mediator.Send(new GetAllState());
            return Ok(allState);
        }






    }
}
