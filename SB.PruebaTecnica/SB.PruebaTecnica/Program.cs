using SB.PruebaTecnica.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar servicios
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)  // Establecer el esquema predeterminado
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("PruebaSBPruebaSBPruebaSB"))
        };
    });
// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<PruebaSBContext>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
}

app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.UseSwagger(c =>
{
    c.SerializeAsV2= true;
});
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ejemplo de API");
    c.RoutePrefix = string.Empty;
});

app.MapFallbackToFile("index.html"); ;

app.Run();
