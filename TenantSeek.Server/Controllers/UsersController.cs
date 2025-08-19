using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TenantSeek.Server.Models;
using TenantSeek.Server.Models.DTO;

namespace TenantSeek.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private DbContextModel dbContext;
        public UsersController(DbContextModel dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet, Route("TestConn")]
        public IActionResult TestConn()
        {
            return Ok();
        }

        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var User = dbContext.Users
                .Where((u) => (u.Username == request.Username && u.Password == request.Password))
                .Select(l => new UserInfoDTO
                {
                    userID = l.UserId,
                    name = l.Username
                })
                .FirstOrDefault();
            if (User == null)
            {
                return BadRequest();
            }
            //IMPLEMENT COOKIE AUTH HERE

            return Ok( User );
        }

        
    }
}
