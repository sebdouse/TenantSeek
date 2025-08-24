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

            var listingId = dbContext.Listings
                                .FirstOrDefault(r => (r.Address == listingDto.Address));
            if (listingId == null)
            {
                return Ok();
            }
            else
            {
                return Ok(listingId.ListingId);
            }
        }
        [HttpPost, Route("UploadFiles")]
        public async Task<IActionResult> UploadFiles([FromForm] int ListingId, [FromForm] List<IFormFile> files)
        {
            try
            {
                bool partialUpload = false;
                string errorMessage = "";
                if (files == null) { return Ok("Warning: No images found, is that intentional?"); }
                foreach (IFormFile file in files)
                {
                    if (file.Length > (5 * 1024 * 1024))
                    {
                        partialUpload = true;
                        errorMessage = errorMessage + file.Name;
                        continue;
                    }

                    //Upload Code here...
                    var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedImages");
                    Directory.CreateDirectory(uploadsFolder);
                    var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadsFolder, fileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    //Reference to files URL uploaded to DB here...
                    var image = new Images
                    {
                        ListingId = ListingId,
                        ImageURL = "/UploadedImages/" + fileName // This will be accessible at http://<host>/UploadedImages/<fileName>
                      };
                    dbContext.Images.Add(image);
                }
                await dbContext.SaveChangesAsync();
                if (partialUpload)
                {
                    errorMessage = "Files ( " + errorMessage + " ) were not uploaded as they are above the 5mb size limit";
                    return Ok(errorMessage);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
               
            }

        }

        [HttpGet, Route("GetImagesById/{id}")]
        public IActionResult GetImagesById(int id)
        {
            var filePaths = dbContext.Images
                .Where(r => r.ListingId == id)
                .Select(r => r.ImageURL)
                .ToList();

           return Ok(filePaths);
        }

        [HttpDelete, Route("DeleteListing/{id}")]
        public IActionResult DeleteListing(int id)
        {
            var listing = dbContext.Listings.FirstOrDefault(r => r.ListingId == id);
            if (listing != null)
            {
                dbContext.Listings.Remove(listing);
                dbContext.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

    }
}
