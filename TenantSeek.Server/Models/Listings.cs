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
        public string Address { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int NumBathrooms { get; set; }
        public int NumBedrooms { get; set; }

        //navigation property as foreign key
        public User User { get; set; }
    }
}
