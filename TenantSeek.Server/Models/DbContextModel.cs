namespace TenantSeek.Server.Models
{
    using Microsoft.EntityFrameworkCore;
    public class DbContextModel: DbContext
    {
        public DbContextModel(DbContextOptions<DbContextModel> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Listings> Listings { get; set; }
        public DbSet<Reviews> Reviews { get; set; }
    }
}
