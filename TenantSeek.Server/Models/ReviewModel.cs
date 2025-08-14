namespace TenantSeek.Server.Models
{
    public class ReviewModel
    {
        public int ReviewID {  get; set; }

        public int UserID { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
    }
}
