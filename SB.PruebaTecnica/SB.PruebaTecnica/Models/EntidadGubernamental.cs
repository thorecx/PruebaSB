using System;
using System.Collections.Generic;

namespace SB.PruebaTecnica.Models
{
    public partial class EntidadGubernamental
    {
        public int Id { get; set; }
        public string? Codigo { get; set; }
        public string? Nombre { get; set; }
        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
        public string? Encargado { get; set; }
        public bool? Estado { get; set; }
    }
}
