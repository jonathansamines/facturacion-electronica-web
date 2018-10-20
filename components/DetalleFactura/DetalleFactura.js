import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Table, Form } from 'semantic-ui-react';
import SelectorProducto from './SelectorProducto';
import ConfirmacionProducto from './ConfirmacionProducto';

class DetalleFactura extends React.Component {
  state = {
    productos: [],
    nuevoProducto: null,
    productoPendiente: null,
    productosEnCatalogo: [],
  }

  agregarProducto = (values, actions) => {
    const productoPendiente = this.state.productosEnCatalogo.find((p) => p.id_producto === values.id_producto);

    this.setState({ productoPendiente });
    actions.resetForm();
  }

  cancelarProductoPendiente = () => {
    this.setState({ productoPendiente: null });
  }

  confirmarProductoPendiente = () => {
    this.setState(({ productoPendiente, productos }) => {
      return {
        productoPendiente: null,
        productos: [
          ...productos,
          productoPendiente
        ]
      };
    });
  }

  actualizarCatalogoProductos = ({ productos }) => {
    if (productos) {
      this.setState({ productosEnCatalogo: productos });
    }
  }

  crearProducto = (event, { value }) => {
    this.setState({ nuevoProducto : { descripcion: value } });
  }

  render() {
    const { moneda } = this.props;
    const { productoPendiente, nuevoProducto, productos, productosEnCatalogo } = this.state;

    return (
      <>
        {
          productoPendiente &&
          <ConfirmacionProducto
            producto={productoPendiente}
            onConfirmar={this.confirmarProductoPendiente}
            onCancelar={this.cancelarProductoPendiente} />
        }

        <Formik
          initialValues={({
            id_producto: null
          })}
          onSubmit={this.agregarProducto}>
          {({ values, setFieldValue, handleSubmit }) => (
            <Form autoComplete='off' onSubmit={handleSubmit}>
              <Form.Field>
                <label>Detalle de la Factura</label>
                <SelectorProducto
                  name='id_producto'
                  productos={productosEnCatalogo}
                  productoSeleccionado={values.id_producto}
                  onBusqueda={this.actualizarCatalogoProductos}
                  onAgregar={this.crearProducto}
                  onSeleccion={(event, data) => setFieldValue('id_producto', data.value)} />
              </Form.Field>
            </Form>
          )}
        </Formik>
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
                      <a>Impuestos  </a>
                      <a>Eliminar</a>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                3000.00
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </>
    );
  }
}

DetalleFactura.propTypes = {
  moneda: PropTypes.object.isRequired,
};

export default DetalleFactura
