using System.ComponentModel.DataAnnotations;

namespace TenantSeek.Server.Models
{
    public class Reviews
    {
        [Key]
        public int ReviewId {  get; set; }

        public int UserId { get; set; }
        public string Role {  get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }

        public User User { get; set; }
    }
}
