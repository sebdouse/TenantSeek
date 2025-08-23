using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TenantSeek.Server.Models
{
    public class Listings
    {
        [Key]
        public int ListingId { get; set; }
        public int UserId { get; set; }
        public required string Address { get; set; }
        public required string Type { get; set; }
        public string Description { get; set; }
        public required int Price { get; set; }
        public required int NumBathrooms { get; set; }
        public required int NumBedrooms { get; set; }

        //navigation property as foreign key
        public User User { get; set; }

        //Origin Foreign Key link
        //public ICollection<Images> Images { get; set; }
    }
}
