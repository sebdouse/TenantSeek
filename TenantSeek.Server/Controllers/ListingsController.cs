using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenantSeek.Server.Models;

namespace TenantSeek.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingsController : ControllerBase
    {
        private DbContextModel dbContext;
        public ListingsController(DbContextModel dbContext)
        {
            this.dbContext = dbContext;
        }

    }
}
