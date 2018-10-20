import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form } from 'semantic-ui-react';
import SelectorProducto from './SelectorProducto';
import ConfirmacionProducto from './ConfirmacionProducto';
import NuevoProducto from './NuevoProducto';
import TablaProductos from './TablaProductos';

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

  agregarProductoACatalogo = (producto) => {
    this.setState(({ productosEnCatalogo }) => ({
      nuevoProducto: null,
      productosEnCatalogo: [
        ...productosEnCatalogo,
        producto
      ]
    }));
  }

  crearProducto = (event, { value }) => {
    this.setState({ nuevoProducto : { descripcion: value } });
  }

  cancelarCreacionProducto = (event, { value }) => {
    this.setState({ nuevoProducto : null });
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

        {
          nuevoProducto &&
          <NuevoProducto
            descripcionProducto={nuevoProducto.descripcion}
            onProductoCreado={this.agregarProductoACatalogo}
            onCancelar={this.cancelarCreacionProducto} />
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
        <TablaProductos
          moneda={moneda}
          productos={productos} />
      </>
    );
  }
}

DetalleFactura.propTypes = {
  moneda: PropTypes.object.isRequired,
};

export default DetalleFactura
