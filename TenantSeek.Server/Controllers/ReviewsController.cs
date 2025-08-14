using Microsoft.AspNetCore.Mvc;
using TenantSeek.Server.Models;

namespace TenantSeek.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReviewsController : ControllerBase
    {
        private DbContextModel dbContext;
        public ReviewsController(DbContextModel dbContext)
        {
            this.dbContext = dbContext;
        }
        
    }
}
