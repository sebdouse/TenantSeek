namespace TenantSeek.Server.Models
{
    using Microsoft.EntityFrameworkCore;
    public class DbContextModel: DbContext
    {
        public DbContextModel(DbContextOptions<DbContextModel> options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<ListingsModel> Listings { get; set; }
        public DbSet<ReviewModel> Reviews { get; set; }
    }
}
