using Azure.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TenantSeek.Server.Models;
using TenantSeek.Server.Models.DTO;
using TenantSeek.Server.Models.Services;

namespace TenantSeek.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private DbContextModel dbContext;
        private PasswordService passwordService;
        public UsersController(DbContextModel dbContext, PasswordService passwordService)
        {
            this.dbContext = dbContext;
            this.passwordService = passwordService;
        }

        [HttpGet, Route("TestConn")]
        public IActionResult TestConn()
        {
            return Ok();
        }

        [HttpGet, Route("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var users = dbContext.Users
                        .Select((l) => new userListDTO
                            {
                                UserId = l.UserId,
                                Username =l.Username
                            })
                        .ToList();
            return Ok(users);
        }

        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var hashed = passwordService.HashPassword(request.Password);

            if (passwordService.VerifyPassword(hashed, request.Password))
            {
                var User = dbContext.Users
                    .Where((u) => (u.Username == request.Username))
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
            else
            {
                return BadRequest();
            }
        }

        
    }
}
