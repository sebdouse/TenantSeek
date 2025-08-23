using System.ComponentModel.DataAnnotations;

namespace TenantSeek.Server.Models
{
    public class Images
    {
        [Key]
        public int ImageId { get; set; }
        public int ListingId { get; set; }
        public string ImageURL { get; set; }

        //Foreign Key Reference
        //public Listings Listings { get; set; }
    }
}
