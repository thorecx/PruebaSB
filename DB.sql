CREATE DATABASE PruebaSB
;

USE PruebaSB
;

CREATE TABLE EntidadGubernamental(
ID int not null identity(1,1) primary key,
Codigo varchar(6),
Nombre varchar(100),
Direccion varchar(100),
Telefono varchar(15),
Encargado varchar(50),
Estado BIT DEFAULT 1
);

CREATE TABLE Usuario(
ID int not null identity(1,1) primary key,
NombreUsuario varchar(25),
Contrasena varchar(50)
)

INSERT INTO EntidadGubernamental(Codigo, Nombre, Direccion, Telefono, Encargado) VALUES ('MIC001', 'Ministerio de Industria y Comercio', 'Av. 27 de Febrero #123', '809-000-0000', 'Victor Bisonó')

INSERT INTO Usuario(NombreUsuario, Contrasena) VALUES ('hhernandez', '123456')