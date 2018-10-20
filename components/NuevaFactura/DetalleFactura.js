import React from 'react';
import PropTypes from 'prop-types';
import { Table, Form } from 'semantic-ui-react';
import { Formik } from 'formik';
import SelectorProducto from '../SelectorProducto';

class DetalleFactura extends React.Component {
  state = {
    productos: [],
    productosEnCatalogo: [],
  }

  agregarProducto = (values, actions) => {
    const producto = this.state.productosEnCatalogo.find((p) => p.id_producto === values.id_producto);

    this.setState(({ productos }) => {

      actions.resetForm();

      return {
        productos: [
          ...productos,
          producto
        ]
      };
    });
  }

  actualizarCatalogoProductos = ({ productos }) => {
    if (productos) {
      this.setState({ productosEnCatalogo: productos });
    }
  }

  render() {
    const { moneda } = this.props;
    const { productos, productosEnCatalogo } = this.state;

    return (
      <>
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
