using Microsoft.EntityFrameworkCore;
using TenantSeek.Server.Models;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<DbContextModel>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//SOLVE CORS ALLOW ORIGIN ERROR BEFORE PRODUCTION IS OVER
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("https://localhost:58659/", "http://localhost:5173/", "https://localhost:7013") // <-- your React/Vue/etc. URL
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
            //policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

        });
});

var app = builder.Build();

app.UseCors("AllowFrontend"); // <-- Must be before UseAuthorization()

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
