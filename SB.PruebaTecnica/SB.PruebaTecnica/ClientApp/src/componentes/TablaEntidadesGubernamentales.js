import {Table, Button } from "reactstrap"

const TablaEntidadesGubernamentales = ({ data, setEditarEntidad, mostrarModal, setMostrarModal, eliminarEntidad }) => {

    const enviarInfo = (entidad) => {
        setEditarEntidad(entidad)
        setMostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Encargado</th>
                    <th>Estado</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="8">No hay registros</td>
                        </tr>
                    ) : (
                            data.map((item) => (

                                <tr key={item.id}>
                                    <td>{item.codigo}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.direccion}</td>
                                    <td>{item.telefono}</td>
                                    <td>{item.encargado}</td>
                                    <td>{(item.estado == true) ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2" onClick={() => enviarInfo(item)}>Editar</Button>
                                        <Button color="danger" size="sm" onClick={() => eliminarEntidad(item.id)}>Eliminar</Button>
                                    </td>
                                </tr>
                                ))
                            )
                }
            </tbody>
        </Table>
        )
}

export default TablaEntidadesGubernamentales;