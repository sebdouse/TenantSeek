using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TenantSeek.Server.Models;
using TenantSeek.Server.Models.DTO;

namespace TenantSeek.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewsController : ControllerBase
    {
        private DbContextModel dbContext;
        private readonly ILogger<ReviewsController> logger;
        public ReviewsController(DbContextModel dbContext, ILogger<ReviewsController> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        [HttpGet, Route("GetAllReviews")]
        public IActionResult GetAllReviews()
        {
            //Get Review information and also extract the UserId and replace it with the Username corresponding to the ID
            var reviews = dbContext.Reviews.ToList();
            
            return Ok(reviews);
        }

        [HttpGet, Route("GetReviewsByType/{role}")]
        public IActionResult GetReviewsByType(string role)
        {
            //Get Review information and also extract the UserId and replace it with the Username corresponding to the ID
            var reviews = dbContext.Reviews.Where(r => r.Role == role).ToList();

            return Ok(reviews);
        }

        [HttpGet, Route("GetReviewsByName/{name}")]
        public IActionResult GetReviewsByName(string name) //Make it so the name only has to be partially right to appear on the search
        {
            var reviews = dbContext.Reviews.Where(r => r.Name == name).ToList();
            return Ok(reviews);
        }

        [HttpGet, Route("GetReviewsByID/{id}")]
        public IActionResult GetReviewsByID(int id)
        {
            var reviews = dbContext.Reviews.Where(r => r.UserId == id).OrderByDescending(r => r.Rating).ToList();
            return Ok(reviews);
        }

        [HttpPost, Route("AddReview")]
        public IActionResult AddReview([FromBody] CreateReviewDTO _review)
        {
            var user = dbContext.Users.FirstOrDefault((r) => (r.Username == _review.About));
            var userId = user != null ? user.UserId : 0; //I did not know you could also do this in C#

                var review = new Reviews
                {
                    UserId = userId,
                    Role = _review.Type,
                    Name = _review.About,
                    Rating = _review.Rating,
                    Description = _review.description
                };
            dbContext.Reviews.Add(review);
            dbContext.SaveChanges();
            return Ok();

        }


    }
}
