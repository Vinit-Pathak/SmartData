using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Otp");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Otp",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Otp");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Otp",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
