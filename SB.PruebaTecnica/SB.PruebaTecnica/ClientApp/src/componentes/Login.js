import { Form, FormGroup, Input, Label, Container, Col, Row, Card, CardHeader, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Route, Redirect, useHistory } from 'react-router-dom';
import Logo from '../assets/logo-sb-footer.svg';


import { useState } from 'react'


const modeloUsuario = {
    id: 0,
    nombreUsuario: "",
    contrasena: ""
}

const Login = () => {

    const [usuario, setUsuario] = useState(modeloUsuario);

    const navigate = useHistory();

    const actualizarInfo = (e) => {
        console.log(e.target.name + " : " + e.target.value);
        setUsuario(
            {
                ...usuario,
                [e.target.name]: e.target.value
            }
        )
    }


    const sesion = async (username, password) => {
        console.log(username, password)
        const user = {
            nombreUsuario: username,
            contrasena: password
        };
        const response = await fetch('api/entidadgubernamental/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
    };

    const iniciarSesion = ( usuario ) => {
        console.log(usuario)
        sesion(usuario.nombreUsuario, usuario.contrasena)
        navigate.push("/home")
    }


    return (
        <Container>
            <Row>
                <Col>
                    <Row className="mt-5">
                        <Col sm="6">
                            <Card>
                                <CardHeader>
                                    <h5>Inicio de Sesión</h5>
                                </CardHeader>
                                <CardBody>
                                    <Form>
                                        <FormGroup>
                                            <Label>Nombre de Usuario</Label>
                                            <Input name="nombreUsuario" className="w-85" onChange={(e) => actualizarInfo(e)} value={usuario.nombreUsuario} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label>Contraseña</Label>
                                            <Input type='password' name="contrasena" className="w-85" onChange={(e) => actualizarInfo(e)} value={usuario.contrasena} />
                                        </FormGroup>
                                    </Form>
                                    <div>
                                        <Button color="success" className="w-25" size="sm" onClick={() => iniciarSesion(usuario)}>Iniciar Sesion</Button>
                                </div>
                                </CardBody>
                            </Card>
                            <img src={Logo} width="500px" height="500px" />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
        )
}


export default Login