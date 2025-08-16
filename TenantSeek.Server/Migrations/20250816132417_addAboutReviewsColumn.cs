using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TenantSeek.Server.Migrations
{
    /// <inheritdoc />
    public partial class addAboutReviewsColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Reviews",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ReviewID",
                table: "Reviews",
                newName: "ReviewId");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Listings",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "ListingID",
                table: "Listings",
                newName: "ListingId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Reviews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Reviews");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Reviews",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "ReviewId",
                table: "Reviews",
                newName: "ReviewID");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Listings",
                newName: "UserID");

            migrationBuilder.RenameColumn(
                name: "ListingId",
                table: "Listings",
                newName: "ListingID");
        }
    }
}
