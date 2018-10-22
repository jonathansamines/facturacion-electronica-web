import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'semantic-ui-react';
import ModificarImpuestos from './ModificarImpuestos';
import SelectorFrase from './SelectorFrase';
import { obtenerTipoDocumentoPorId } from './../../../lib/servicio-api';

class TablaProductos extends React.Component {
  state = {
    productoAbierto: null,
    tipoDocumento: null
  }

  componentDidMount() {
    return obtenerTipoDocumentoPorId({
      idTipoDocumento: this.props.tipoDocumento.id_tipo_documento
    })
    .then((tipoDocumento) => {
      this.setState({ tipoDocumento });
    });
  }

  modificarImpuestos = (producto) => {
    return (event) => {
      event.preventDefault();

      this.setState({ productoAbierto: producto.id_producto });
    };
  }

  cerrarProductoAbierto = () => {
    this.setState({ productoAbierto: null });
  }

  render() {
    const { tipoDocumento, productoAbierto } = this.state;
    const { moneda, productos } = this.props;

    return (
      <Table striped basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Código</Table.HeaderCell>
            <Table.HeaderCell>Descripción</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Costo Unitario</Table.HeaderCell>
            <Table.HeaderCell>Impuestos</Table.HeaderCell>
            <Table.HeaderCell>Costo Total</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            productos.length === 0 &&
            <Table.Row>
              <Table.Cell colSpan='7'>No se han agregado productos a la factura.</Table.Cell>
            </Table.Row>
          }
          {
            productos.map((producto) => {
              return (
                <Table.Row key={producto.id_producto}>
                  <Table.Cell>{producto.id_producto}</Table.Cell>
                  <Table.Cell>{producto.descripcion}</Table.Cell>
                  <Table.Cell>0</Table.Cell>
                  <Table.Cell>{moneda.id_moneda} {producto.precio_unitario}</Table.Cell>
                  <Table.Cell>0.00</Table.Cell>
                  <Table.Cell>0.00</Table.Cell>
                  <Table.Cell>
                    {
                      producto.id_producto === productoAbierto &&
                      <ModificarImpuestos
                        producto={producto}
                        onCancelar={this.cerrarProductoAbierto}
                        onConfirmar={this.actualizarImpuestosProducto} />
                    }
                    <a className='action-link' href='/' onClick={this.modificarImpuestos(producto)}>Impuestos</a>
                    <a className='action-link' href='/'>Eliminar</a>
                  </Table.Cell>
                </Table.Row>
              );
            })
          }
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              <Form>
                <Form.Group widths='equal'>
                  {tipoDocumento && tipoDocumento.tipos_frase.map((tipoFrase) => (
                    <Form.Field key={tipoFrase.id_tipo_frase}>
                      <label>{tipoFrase.descripcion}</label>
                      <SelectorFrase
                        name='id_frase'
                        tipoFrase={tipoFrase}
                        frases={tipoFrase.frases}
                        fraseSeleccionada={null}
                        onSeleccion={() => null} />
                    </Form.Field>
                  ))}
                </Form.Group>
              </Form>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell colSpan='7'>
              3000.00
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

TablaProductos.propTypes = {
  moneda: PropTypes.object.isRequired,
  productos: PropTypes.array.isRequired,
  tipoDocumento: PropTypes.object.isRequired
};

export default TablaProductos;
