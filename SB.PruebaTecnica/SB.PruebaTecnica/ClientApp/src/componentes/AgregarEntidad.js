import { useState } from 'react'
import { Form, FormGroup, Input, Label, Container, Col, Row, Card, CardHeader, CardBody, Button } from 'reactstrap'
import Sidebar from "../layout/Sidebar"
import '../assets/AgregarEntidades.css'

const modeloEntidad = {
    id: 0,
    codigo: "",
    nombre: "",
    direccion: "",
    telefono: "",
    encargado: "",
    estado:true
}

const AgregarEntidad = () => {

    const [entidad, setEntidad] = useState(modeloEntidad);

    //Actualizar la info de la entidad a medida que se vayan llenando los campos
    const actualizarInfo = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setEntidad(
            {
                ...entidad,
                [e.target.name]: e.target.value
            }
        )
    }

    //Guardar la entidad
    const guardarEntidad = async (entidad) => {

        const token = localStorage.getItem('token');

        const response = await fetch("api/entidadgubernamental/Save", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(entidad)
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        } else {
            alert("Entidad agregada satisfactoriamente")
        }
    }

    //Enviar los datos del formulario al metodo que los guardará en la base de datos
    const enviarInfo = () => {
        if (entidad.id == 0) {
            guardarEntidad(entidad)
        }
    }

    return (

        <div>
            <Row>
                <div className="col-2 menu">
                    <Sidebar />
                </div>
                <Col className="content">
                    <Row>
                        <h2>Entidades Gubernamentales</h2>
                    </Row>
                    <Row className="tableContainer">
                        <div className="tableCard">
                            <Row className="mt-5">
                                <Col className="crearRegistroContent" sm="12">
                                    <h5>Crear Nueva Entidad Gubernamental</h5>
                                    <hr></hr>
                                    <Form>
                                        <FormGroup>
                                            <Label>Codigo</Label>
                                            <Input name="codigo" className="w-70" onChange={(e) => actualizarInfo(e)} value={entidad.codigo} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Nombre</Label>
                                            <Input name="nombre" className="w-70" onChange={(e) => actualizarInfo(e)} value={entidad.nombre} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Direccion</Label>
                                            <Input name="direccion" className="w-70" onChange={(e) => actualizarInfo(e)} value={entidad.direccion} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Telefono</Label>
                                            <Input name="telefono" className="w-70" onChange={(e) => actualizarInfo(e)} value={entidad.telefono} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Encargado</Label>
                                            <Input name="encargado" className="w-70" onChange={(e) => actualizarInfo(e)} value={entidad.encargado} />
                                        </FormGroup>
                                    </Form>
                                    <div>
                                        <Button color="success" className="w-70" size="sm" onClick={enviarInfo}>Guardar</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Row>
        </div>
        
        )
}

export default AgregarEntidad;