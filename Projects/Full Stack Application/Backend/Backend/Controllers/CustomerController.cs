using Core.App.Customer.Command;
using Core.App.Customer.Query;
using Domain.models;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _mediator.Send(new GetAllCustomersQuery());
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await _mediator.Send(new GetCustomerByIdQuery { Id = id });
            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {
            var customerId = await _mediator.Send(new CreateCustomerCommand { Customer = customer });
            return Ok(customerId);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            customer.customerId = id;
            var result = await _mediator.Send(new UpdateCustomerCommand { Customer = customer });
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var customer = await _mediator.Send(new DeleteCustomerCommand { Id = id });
            return Ok(customer);
        }
    }
}
