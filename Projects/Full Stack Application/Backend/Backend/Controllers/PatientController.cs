using Core.App.Patient.Command;
using Core.App.Patient.Query;
using Domain.models;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PatientController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _mediator.Send(new GetAllPatientsQuery());
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatient(int id)
        {
            var patient = await _mediator.Send(new GetPatientByIdQuery { Id = id });
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient(Patient patient)
        {
            var patientId = await _mediator.Send(new CreatePatientCommand { Patient = patient });
            return Ok(patientId);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePatient(int id, Patient patient)
        {
            patient.patientId = id;
            var result = await _mediator.Send(new UpdatePatientCommand { Patient = patient });
            return Ok(result);
        }
        [HttpDelete]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _mediator.Send(new DeletePatientCommand { Id = id });
            return Ok(patient);
        }
    }
}
