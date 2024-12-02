using App.Core.Apps.Country.Query;
using App.Core.Apps.Patient.Query;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerEmployeePatientManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {

        private readonly IMediator _mediator;

        public CountryController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCountry()
        {
            var allCountry = await _mediator.Send(new GetAllCountryQuery());
            return Ok(allCountry);
        }



    }
}
