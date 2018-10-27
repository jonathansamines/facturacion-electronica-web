import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Propiedad from '../Propiedad';
import EditarCliente from './EditarCliente';

class DatosCliente extends React.Component {
  state = {
    editando: false
  }

  editarCliente = (event) => {
    event.preventDefault();

    this.setState({ editando: true });
  }

  cancelarEdicion = () => {
    this.setState({ editando: false });
  }

  confirmarEdicion = (cliente) => {
    this.setState({ editando: false }, () => this.props.onClienteEditado(cliente));
  }

  render() {
    const { cliente } = this.props;
    const { editando } = this.state;

    return (
      <>
        {
          editando &&
          <EditarCliente
            cliente={cliente}
            onClienteEditado={this.confirmarEdicion}
            onCancelar={this.cancelarEdicion} />
        }
        <List relaxed size='medium'>
          <List.Item>
            <List.Header as='strong'>NIT: </List.Header>
            <Propiedad valor={cliente} propiedad='nit' />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Cliente: </List.Header>
            <Propiedad valor={cliente} propiedad='nombre' />&nbsp;
            <Propiedad valor={cliente} propiedad='apellido' fallback='' />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Dirección: </List.Header>
            <Propiedad valor={cliente} propiedad='direccion' />
          </List.Item>
          {
            cliente &&
            <List.Item>
              <a onClick={this.editarCliente}>Editar Cliente</a>
            </List.Item>
          }
        </List>
      </>
    );
  }
}

DatosCliente.propTypes = {
  cliente: PropTypes.object,
  onClienteEditado: PropTypes.func.isRequired,
};

export default DatosCliente;
