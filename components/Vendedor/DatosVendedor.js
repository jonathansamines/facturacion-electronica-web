import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import Propiedad from '../Propiedad';
import EditarVendedor from './EditarVendedor';

class DatosVendedor extends React.Component {
  state = {
    editando: false
  }

  editarVendedor = (event) => {
    event.preventDefault();

    this.setState({ editando: true });
  }

  confirmarEdicion = (vendedor) => {
    this.setState(
      { editando: false },
      () => this.props.onVendedorEditado(vendedor)
    );
  }

  cancelarEdicion = () => this.setState({ editando: false });

  render() {
    const { vendedor, sucursales } = this.props;
    const { editando } = this.state;

    return (
      <>
        {
          editando &&
          <EditarVendedor
            vendedor={vendedor}
            sucursales={sucursales}
            onVendedorEditado={this.confirmarEdicion}
            onCancelar={this.cancelarEdicion} />
        }
        <List relaxed size='medium'>
          <List.Item>
            <List.Header as='strong'>Código: </List.Header>
            <Propiedad valor={vendedor} propiedad='nit' />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Vendedor: </List.Header>
            <Propiedad valor={vendedor} propiedad='nombre' />&nbsp;
            <Propiedad valor={vendedor} propiedad='apellido' fallback='' />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Sucursal: </List.Header>
            <Propiedad valor={vendedor} propiedad='sucursal.descripcion' />
          </List.Item>
          {
            vendedor &&
            <List.Item>
              <a href='/' onClick={this.editarVendedor}>Editar vendedor</a>
            </List.Item>
          }
        </List>
      </>
    );
  }
}

DatosVendedor.propTypes = {
  vendedor: PropTypes.object,
  sucursales: PropTypes.array,
  onVendedorEditado: PropTypes.func.isRequired,
};

export default DatosVendedor;
