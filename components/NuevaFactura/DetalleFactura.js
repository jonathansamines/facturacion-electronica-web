import React from 'react';
import debounce from 'lodash/debounce';
import { Segment, Table, Form, Select } from 'semantic-ui-react';
import { Formik } from 'formik';
import servicio from './../../lib/servicio-api';

class DetalleFactura extends React.Component {
  state = {
    productos: [],
    productosEnCatalogo: [],
  }

  buscarProducto = debounce((event, data) => {
    const busqueda = data.searchQuery;

    if (busqueda !== undefined && busqueda.length > 0) {
      return servicio
        .get(`/productos?busqueda=${busqueda}`)
        .then((respuesta) => {
          this.setState({ productosEnCatalogo: respuesta.data })
        });
    }
  }, 200)

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

  render() {
    const { productosEnCatalogo } = this.state;
    const opcionesProductos = productosEnCatalogo.map((producto) => ({
      key: producto.id_producto,
      value: producto.id_producto,
      text: producto.descripcion
    }));

    return (
      <>
        <Segment vertical>
          <Formik
            initialValues={({
              id_producto: null
            })}
            onSubmit={this.agregarProducto}>
            {({ setFieldValue, handleSubmit }) => (
              <Form autoComplete='off' onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Producto</label>
                  <Select
                    search
                    name='id_producto'
                    placeholder='Buscar producto'
                    noResultsMessage='Producto no encontrado en el catalogo'
                    options={opcionesProductos}
                    onSearchChange={this.buscarProducto}
                    onChange={(event, data) => setFieldValue('id_producto', data.value)} />
                </Form.Field>
              </Form>
            )}
          </Formik>
        </Segment>
        <Table striped basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Código</Table.HeaderCell>
              <Table.HeaderCell>Descripción</Table.HeaderCell>
              <Table.HeaderCell>Cantidad</Table.HeaderCell>
              <Table.HeaderCell>Costo Unitario (Q)</Table.HeaderCell>
              <Table.HeaderCell>Impuestos (Q)</Table.HeaderCell>
              <Table.HeaderCell>Costo Total (Q)</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              this.state.productos.map((producto) => {

                return (
                  <Table.Row key={producto.id_producto}>
                    <Table.Cell>{producto.id_producto}</Table.Cell>
                    <Table.Cell>{producto.descripcion}</Table.Cell>
                    <Table.Cell>0</Table.Cell>
                    <Table.Cell>{producto.precio_unitario}</Table.Cell>
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

export default DetalleFactura
