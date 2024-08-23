using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SB.PruebaTecnica.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SB.PruebaTecnica.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntidadGubernamentalController : ControllerBase
    {

        private readonly PruebaSBContext _dbcontext;
        private readonly ILogger<EntidadGubernamentalController> _logger;

        public EntidadGubernamentalController(PruebaSBContext dbcontext, ILogger<EntidadGubernamentalController> logger)
        {
            _dbcontext = dbcontext;
            _logger = logger;

        }

        [Authorize]
        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> GetEntidades()
        {
            _logger.LogError("An error occurred");
            List<EntidadGubernamental> entidadesGubernamentales = await _dbcontext.EntidadGubernamentals.OrderByDescending(c => c.Id).ToListAsync();

            return StatusCode(StatusCodes.Status200OK, entidadesGubernamentales);
        }

        [Authorize]
        [HttpGet]
        [Route("List/{id:int}")]
        public async Task<IActionResult> GetEntidad(int id)
        {
            _logger.LogError("An error occurred");
            EntidadGubernamental entidadGubernamental = _dbcontext.EntidadGubernamentals.Find(id);

            return StatusCode(StatusCodes.Status200OK, entidadGubernamental);
        }

        [Authorize]
        [HttpPost]
        [Route("Save")]
        public async Task<IActionResult> SaveEntidades([FromBody] EntidadGubernamental request)
        {
            _logger.LogError("An error occurred");
            await _dbcontext.EntidadGubernamentals.AddAsync(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> EditEntidades([FromBody] EntidadGubernamental request)
        {
            _logger.LogError("An error occurred");
            _dbcontext.EntidadGubernamentals.Update(request);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [Authorize]
        [HttpDelete]
        [Route("Delete/{id:int}")]
        public async Task<IActionResult> DeleteEntidad(int id)
        {
            _logger.LogError("An error occurred");
            EntidadGubernamental entidadGubernamental = _dbcontext.EntidadGubernamentals.Find(id);

            _dbcontext.EntidadGubernamentals.Remove(entidadGubernamental);
            await _dbcontext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] Usuario usuario)
        {
            _logger.LogError("An error occurred");

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("PruebaSBPruebaSBPruebaSB");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, usuario.NombreUsuario)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { Token = tokenString });
        }
    }
}
