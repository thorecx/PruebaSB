import { Container, Col, Row, Card, CardHeader, CardBody, Button } from "reactstrap"

import Sidebar from "./layout/Sidebar"
import './assets/App.css'
import CrearRegistro from './componentes/AgregarEntidad'
import Home from './componentes/Home'
import Login from './componentes/Login'
import PrivateRoute from './utils/PrivateRoute'
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const token = localStorage.getItem('token');
    var isAuthenticated = false;
    if (token != null) {
        isAuthenticated = true;
    }
    return (
        <div className="cloud">
             <Router >
                <Switch>
                    <PrivateRoute
                        path="/home"
                        component={Home}
                        isAuthenticated={isAuthenticated}
                    />
                    <Route path="/home" component={Home} />
                    <PrivateRoute
                        path="/crearRegistro"
                        component={CrearRegistro}
                        isAuthenticated={isAuthenticated}
                    />
                    <Route path="/crearRegistro" component={CrearRegistro} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Login} />
                </Switch>
             </Router >
            </div>
            
        )
}

export default App;