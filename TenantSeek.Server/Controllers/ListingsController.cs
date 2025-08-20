using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TenantSeek.Server.Models;
using TenantSeek.Server.Models.DTO;
using FuzzySharp;

namespace TenantSeek.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ListingsController : ControllerBase
    {
        private DbContextModel dbContext;
        public ListingsController(DbContextModel dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetAllListings()
        {
            var listings = dbContext.Listings
                .Include(r => r.User)
                .Select(l => new ListingsDTO
                {
                    ListingId = l.ListingId,
                    Address = l.Address,
                    Type = l.Type,
                    Description = l.Description,
                    Price = l.Price,
                    NumBathrooms = l.NumBathrooms,
                    NumBedrooms = l.NumBedrooms,
                    Username = l.User.Username
                })
                .ToList();

            return Ok(listings);
        }

        [HttpGet, Route("GetListingsBySearch/{query}")]
        public IActionResult GetListingsBySearch(string query)
        {
            var listings = dbContext.Listings
                .Include(r => r.User)
                .Select(l => new ListingsDTO
                {
                    ListingId = l.ListingId,
                    Address = l.Address,
                    Type = l.Type,
                    Description = l.Description,
                    Price = l.Price,
                    NumBathrooms = l.NumBathrooms,
                    NumBedrooms = l.NumBedrooms,
                    Username = l.User.Username
                })
                .AsEnumerable()
                .Where(r =>
                (
                    Fuzz.PartialRatio(query, r.Address) > 55 ||
                    Fuzz.PartialRatio(query, r.Username) > 55 ||
                    r.Address.Contains(query) ||
                    r.Username.Contains(query)
                ));
            
            return Ok(listings);
        }

        [HttpGet, Route("GetListingsByID/{id}")]
        public IActionResult GetListingsByID(int id)
        {
            var reviews = dbContext.Listings
                .Include(r => r.User)
                .Select(l => new ListingsDTO
                {
                    ListingId = l.ListingId,
                    Address = l.Address,
                    Type = l.Type,
                    Description = l.Description,
                    Price = l.Price,
                    NumBathrooms = l.NumBathrooms,
                    NumBedrooms = l.NumBedrooms,
                    Username = l.User.Username,
                    UserID = l.User.UserId
                })
                .AsEnumerable()
                .Where(r => r.UserID == id).ToList();

            return Ok(reviews);
        }

        [HttpPost, Route("CreateListing")]
        public IActionResult CreateListing([FromBody] CreateListingDTO listingDto)
        {
            Console.WriteLine("Listings UserID: // " + listingDto.UserId);
            

            var listing = new Listings
            {
                UserId = listingDto.UserId,
                Address = listingDto.Address,
                Type = listingDto.Type,
                Description = listingDto.Description,
                Price = listingDto.Price,
                NumBathrooms = listingDto.NumBathrooms,
                NumBedrooms = listingDto.NumBedrooms
            };

            dbContext.Listings.Add(listing);
            dbContext.SaveChanges();
            return Ok();
        }

    }
}
