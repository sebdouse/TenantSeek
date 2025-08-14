using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TenantSeek.Server.Models;

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

        [HttpGet]
        public IActionResult TestConn()
        {
            return Ok();
        }
    }
}
