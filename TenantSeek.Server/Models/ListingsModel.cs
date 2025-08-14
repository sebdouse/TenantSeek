namespace TenantSeek.Server.Models
{
    public class ListingsModel
    {
        public int ListingID { get; set; }
        public int UserID { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public int NumBathrooms { get; set; }
        public int NumBedrooms { get; set; }
    }
}
