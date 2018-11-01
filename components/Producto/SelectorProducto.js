import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select, Icon } from 'semantic-ui-react';
import { buscarProducto } from '../../lib/servicio-api';
import { busquedaFn } from '../../lib/buscador';

class SelectorProducto extends React.Component {
  state = {
    buscando: false
  }

  buscarProducto = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      this.setState({ buscando: true }, () => {

        return buscarProducto({ busqueda })
          .then((productos) => {
            setTimeout(() => this.setState({ buscando: false }), 400);

            return onBusqueda({ busqueda, productos });
          })
          .catch((error) => {
            setTimeout(() => this.setState({ buscando: false }), 400);

            return onBusqueda({ busqueda, error });
          });
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
        clearable
        allowAdditions
        name={name}
        icon={'search'}
        search={busquedaFn}
        selectOnBlur={false}
        selectOnNavigation={false}
        loading={this.state.buscando}
        additionLabel={
          <>
            <Icon name='add circle' />
            <span>Crear nuevo producto:&nbsp;</span>
          </>
        }
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
  productoSeleccionado: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onBusqueda: PropTypes.func.isRequired,
  onAgregar: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorProducto;
