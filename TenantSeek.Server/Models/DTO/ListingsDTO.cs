namespace TenantSeek.Server.Models.DTO
{
    public class ListingsDTO
    {
        public int ListingId { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int NumBathrooms { get; set; }
        public int NumBedrooms { get; set; }
        public string Username { get; set; }
    }
}
