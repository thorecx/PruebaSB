import { Container, Col, Row, Card, CardHeader, CardBody, Button } from "reactstrap"

import TablaEntidadesGubernamentales from "../componentes/TablaEntidadesGubernamentales"
import Sidebar from "../layout/Sidebar"
import '../assets/App.css'
import CrearRegistro from '../componentes/AgregarEntidad'
import ModalEntidad from '../componentes/ModalEntidad'
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = () => {

    const [entidadGubernamental, setEntidadGubernamental] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditarEntidad] = useState(null)

    //Mostrar las entidades gubernamentales
    const mostrarentidad = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch("api/entidadgubernamental/List", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setEntidadGubernamental(data)
        } else {
            console.log("ocurrio un error al listar")
        }
    }

    useEffect(() => {
        mostrarentidad()
    }, [])

    const editarEntidad = async (entidad) => {
        const token = localStorage.getItem('token');
        const response = await fetch("api/entidadgubernamental/Edit", {
            method: 'PUT',
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
            alert("Entidad editada satisfactoriamente")
        }
    }

    const eliminarEntidad = async (id) => {

        var respuesta = window.confirm("¿Esta seguro que desea eliminar la entidad gubernamental?");

        if (!respuesta) {
            return;
        }
        const token = localStorage.getItem('token');

        const response = await fetch("api/entidadgubernamental/Delete/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`

            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        } else {
            alert("Entidad eliminada satisfactoriamente")
        }
    }

    return (

        <div>
            <Row>
                <div className="col-2 menu">
                    <Sidebar />
                </div>
                <Col>
                    <Row className="title">
                        <h2>Entidades Gubernamentales</h2>
                    </Row>
                    <Row className="tableContainer">
                        <div className="tableCard">
                            <Row>
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5>Lista de Entidades Gubernamentales</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <TablaEntidadesGubernamentales data={entidadGubernamental}
                                                setEditarEntidad={setEditarEntidad}
                                                mostrarModal={mostrarModal}
                                                setMostrarModal={setMostrarModal}
                                                eliminarEntidad={eliminarEntidad }
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                </Col>
            </Row>
            <ModalEntidad
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}

                editar={editar}
                setEditarEntidad={setEditarEntidad}
                editarEntidad={editarEntidad}
                mostrarentidad={mostrarentidad }
            />
        </div>
        
        )
}

export default Home;