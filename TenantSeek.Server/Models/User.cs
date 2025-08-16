using System.ComponentModel.DataAnnotations;

namespace TenantSeek.Server.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        //Foreign Key Links
        public ICollection<Reviews> Reviews { get; set; }
        public ICollection<Listings> Listings { get; set; }
    }
}
