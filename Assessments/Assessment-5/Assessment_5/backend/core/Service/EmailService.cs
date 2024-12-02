using core.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace core.Service
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<bool> SendEmailAsync(string toE, string name, string subject, string message)
        {
            var apiKey = _configuration["SENDGRID_API_KEY:Key"];
            //Console.WriteLine(apiKey);

            var client = new SendGridClient(apiKey);
            // var from = new emailaddress("mayurramdham02@gmail.com", "Mayur Ramdham");
            var from = new EmailAddress("chetanmundlesd@gmail.com", "Mayur Ramdham");
            var to = new EmailAddress(toE, name);
            var plaintext = message;
            var htmlcontent = "";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plaintext, htmlcontent);
            var response = await client.SendEmailAsync(msg);


            return true;
        }
    }
}
