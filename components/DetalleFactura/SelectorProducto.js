import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select } from 'semantic-ui-react';
import { buscarProducto } from '../../lib/servicio-api';

class SelectorProducto extends React.Component {
  buscarProducto = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarProducto({ busqueda })
        .then((productos) => {
          return onBusqueda({ busqueda, productos });
        })
        .catch((error) => {
          return onBusqueda({ busqueda, error });
        });
    }
  }, 200)

  render() {
    const {
      name,
      productoSeleccionado,
      productos,
      onSeleccion,
    } = this.props;

    const opcionesProductos = productos.map((producto) => ({
      key: producto.id_producto,
      value: producto.id_producto,
      text: producto.descripcion
    }));

    return (
      <Select
        search
        name={name}
        value={productoSeleccionado}
        placeholder='Buscar producto'
        noResultsMessage='Producto no encontrado en el catalogo'
        options={opcionesProductos}
        onSearchChange={this.buscarProducto}
        onChange={onSeleccion} />
    );
  }
}

SelectorProducto.propTypes = {
  name: PropTypes.string.isRequired,
  productos: PropTypes.array.isRequired,
  productoSeleccionado: PropTypes.number,
  onBusqueda: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorProducto;
