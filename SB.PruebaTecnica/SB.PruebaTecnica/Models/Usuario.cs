using System;
using System.Collections.Generic;

namespace SB.PruebaTecnica.Models
{
    public partial class Usuario
    {
        public int Id { get; set; }
        public string? NombreUsuario { get; set; }
        public string? Contrasena { get; set; }
    }
}
