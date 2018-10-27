import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select } from 'semantic-ui-react';
import { buscarProducto } from '../../lib/servicio-api';

class SelectorProducto extends React.Component {
  buscarProducto = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda, tipoDocumento } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarProducto({ busqueda, tipoDocumento: tipoDocumento.id_tipo_documento })
        .then((productos) => {
          return onBusqueda({ busqueda, productos });
        })
        .catch((error) => {
          return onBusqueda({ busqueda, error });
        });
    }
  }, 400)

  render() {
    const {
      name,
      productoSeleccionado,
      productos,
      onAgregar,
      onSeleccion,
    } = this.props;

    const opcionesProductos = productos.map((producto) => ({
      key: producto.id_producto,
      value: producto.id_producto,
      text: producto.nombre
    }));

    return (
      <Select
        search
        allowAdditions
        name={name}
        selectOnBlur={false}
        selectOnNavigation={false}
        additionLabel='Crear nuevo producto: '
        selectOnNavigation={false}
        value={productoSeleccionado}
        placeholder='Buscar producto'
        noResultsMessage='Producto no encontrado en el catalogo'
        options={opcionesProductos}
        onAddItem={onAgregar}
        onSearchChange={this.buscarProducto}
        onChange={onSeleccion} />
    );
  }
}

SelectorProducto.propTypes = {
  name: PropTypes.string.isRequired,
  productos: PropTypes.array.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  productoSeleccionado: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBusqueda: PropTypes.func.isRequired,
  onAgregar: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorProducto;
