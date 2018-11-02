import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Segment } from 'semantic-ui-react';
import NuevoProducto from './NuevoProducto';
import TablaProductos from './TablaProductos';
import SelectorProducto from './SelectorProducto';
import ConfirmacionProducto from './ConfirmacionProducto';
import { TiposFrase } from './../Frases';
import { Complementos } from './../Complemento';
import { obtenerTipoDocumentoPorId } from './../../lib/servicio-api';

class DetalleProductos extends React.Component {
  state = {
    productos: [],
    tipoDocumento: null,
    nuevoProducto: null,
    productoPendiente: null,
    productosEnCatalogo: [],
  }

  componentDidMount() {
    const parametros = {
      idTipoDocumento: this.props.tipoDocumento.id_tipo_documento
    };

    return obtenerTipoDocumentoPorId(parametros)
      .then((tipoDocumento) => {
        this.setState({ tipoDocumento });
      });
  }

  agregarProducto = (values, actions) => {
    const productoPendiente = this.state.productosEnCatalogo.find((p) => p.id_producto === values.id_producto);

    this.setState({ productoPendiente });
    actions.resetForm();
  }

  cancelarProductoPendiente = () => {
    this.setState({ productoPendiente: null });
  }

  confirmarProductoPendiente = ({ producto, unidades, unidadesGravables }) => {
    this.setState(({ productos }) => {
      const productoExistente = productos.find((p) => p.producto.id_producto === producto.id_producto);
      const nuevosProductos = productoExistente === undefined ? [...productos, { producto, unidades, unidadesGravables }] : productos;

      return {
        productoPendiente: null,
        productos: nuevosProductos
      };
    });
  }

  actualizarProductos = (productos) => {
    this.setState({ productos });
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
    this.setState({ nuevoProducto : { nombre: value } });
  }

  cancelarCreacionProducto = () => {
    this.setState({ nuevoProducto : null });
  }

  render() {
    const { onTipoFraseSeleccionado, tipoCambio, moneda, exportacion } = this.props;
    const {
      productos,
      tipoDocumento,
      nuevoProducto,
      productoPendiente,
      productosEnCatalogo,
    } = this.state;

    return (
      <>
        {
          productoPendiente &&
          <ConfirmacionProducto
            producto={productoPendiente}
            tipoDocumento={tipoDocumento}
            onConfirmar={this.confirmarProductoPendiente}
            onCancelar={this.cancelarProductoPendiente} />
        }

        {
          nuevoProducto &&
          <NuevoProducto
            nombreProducto={nuevoProducto.nombre}
            onProductoCreado={this.agregarProductoACatalogo}
            onCancelar={this.cancelarCreacionProducto} />
        }

        <Formik
          initialValues={({
            id_producto: null,
          })}
          onSubmit={this.agregarProducto}>
          {({ values, setFieldValue, handleSubmit }) => (
            <Form autoComplete='off' onSubmit={handleSubmit}>
              <Form.Field width='6'>
                <SelectorProducto
                  name='id_producto'
                  productos={productosEnCatalogo.filter(c => !productos.find((p) => p.producto.id_producto === c.id_producto))}
                  productoSeleccionado={values.id_producto}
                  onBusqueda={this.actualizarCatalogoProductos}
                  onAgregar={(...args) => {
                    this.crearProducto(...args);
                    setFieldValue('id_producto', null);
                  }}
                  onSeleccion={(event, data) => setFieldValue('id_producto', data.value)} />
              </Form.Field>
            </Form>
          )}
        </Formik>

        <TablaProductos
          moneda={moneda}
          tipoCambio={tipoCambio}
          productos={productos}
          tipoDocumento={tipoDocumento}
          onProductosModificados={this.actualizarProductos}/>

        {
          tipoDocumento &&
          <Segment vertical padded='very'>
            <TiposFrase tiposFrase={tipoDocumento.tipos_frase} onSeleccion={onTipoFraseSeleccionado} />
          </Segment>
        }

        {
          tipoDocumento &&
          <Segment vertical padded='very'>
            <Complementos
              exportacion={exportacion}
              complementos={tipoDocumento.complementos} />
          </Segment>
        }
      </>
    );
  }
}

DetalleProductos.propTypes = {
  exportacion: PropTypes.bool.isRequired,
  moneda: PropTypes.object.isRequired,
  tipoCambio: PropTypes.object.isRequired,
  tipoDocumento: PropTypes.object,
  onTipoFraseSeleccionado: PropTypes.func,
};

export default DetalleProductos
