import React, { useState } from 'react';
import Logo from '../assets/logo-sb-footer.svg';
import Icon from '../assets/icon.svg';
import '../assets/Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();
    //const isActive = location.pathname === "/home";
    const isActive = (pathName) => {
        return location.pathname === pathName;
    }

    return (
        <div>
            <img src={Logo} width="200px" height="200px" />
            <Link to="home" className={`item ${isActive("/home") ? "active" : ""}`}><img src={Icon} width="30px" height="30px" />Inicio</Link>
            <div className="item">Consulta</div>
            <Link className={`item ${isActive("/crearRegistro") ? "active" : ""}`} to="crearRegistro">Crear registro</Link>
        </div>
    );
};

export default Sidebar;