using Microsoft.AspNetCore.Http;
using OpenTokSDK;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VideoController : ControllerBase
    {
        private readonly string _apId = "9a354c64-8458-4be0-ae28-b671f428f72b";
        private readonly string _privateKey;
        private readonly OpenTok _openTok;


        public VideoController()
        {
            string privateKeyFilePath = Path.Combine(Directory.GetCurrentDirectory(), "private.key");

            if (System.IO.File.Exists(privateKeyFilePath)) 
            {
                _privateKey = System.IO.File.ReadAllText(privateKeyFilePath).Trim(); 
            }
            else
            {
                throw new FileNotFoundException("Private key file not found at: " + privateKeyFilePath);
            }

            _openTok = new OpenTok(_apId, _privateKey);
        }

        [HttpGet("session")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        public IActionResult CreateSession()
        {
             //Create a OpenTok session
            var session = _openTok.CreateSession();
            return Ok(new { sessionId = session.Id });
        }

        [HttpGet("token")]
        [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
        public IActionResult GenerateToken(string sessionId)
        {
            // Generate a token for the given session ID
            var token = _openTok.GenerateToken(sessionId, role: Role.PUBLISHER,
                                               expireTime: DateTime.UtcNow.AddHours(1)
                                               .Subtract(DateTime.UnixEpoch)
                                               .TotalSeconds);

            return Ok(new { token });
        }
    }
}
