import { useEffect, useState } from 'react'
import { Form, FormGroup, Input, Label, Container, Col, Row, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const modeloEntidad = {
    id: 0,
    codigo: "",
    nombre: "",
    direccion: "",
    telefono: "",
    encargado: "",
    estado: true
}

const ModalEntidad = ({ mostrarModal, setMostrarModal, editarEntidad, editar, setEditarEntidad, mostrarentidad }) => {

    const [entidad, setEntidad] = useState(modeloEntidad);

    const actualizarInfo = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setEntidad(
            {
                ...entidad,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarInfo = () => {
        if (entidad.id != 0) {
            editarEntidad(entidad)
        }
        mostrarentidad()
    }

    useEffect(() => {
        if (editar != null) {
            setEntidad(editar)
        } else {
            setEntidad(modeloEntidad)
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditarEntidad(null)
    }

    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                Editar Contacto
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Codigo</Label>
                        <Input name="codigo" onChange={(e) => actualizarInfo(e)} value={entidad.codigo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarInfo(e)} value={entidad.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Direccion</Label>
                        <Input name="direccion" onChange={(e) => actualizarInfo(e)} value={entidad.direccion} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarInfo(e)} value={entidad.telefono} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Encargado</Label>
                        <Input name="encargado" onChange={(e) => actualizarInfo(e)} value={entidad.encargado} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" size="sm" onClick={enviarInfo}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
        )
}

export default ModalEntidad;