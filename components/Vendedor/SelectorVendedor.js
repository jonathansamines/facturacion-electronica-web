import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select } from 'semantic-ui-react';
import { buscarVendedor } from '../../lib/servicio-api';

class SelectorVendedor extends React.Component {
  buscarVendedor = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarVendedor({ busqueda })
        .then((vendedores) => {
          return onBusqueda({ busqueda, vendedores });
        })
        .catch((error) => {
          return onBusqueda({ busqueda, error });
        });
    }
  }, 200)

  render() {
    const {
      name,
      vendedores,
      vendedorSeleccionado,
      onAgregar,
      onSeleccion,
    } = this.props;

    const opcionesVendedores = vendedores.map((vendedor) => ({
      key: vendedor.id_vendedor,
      value: vendedor.id_vendedor,
      text: `${vendedor.nombre} ${vendedor.apellido} (${vendedor.nit})`
    }));

    return (
      <Select
        search
        allowAdditions
        additionLabel='Crear nuevo vendedor: '
        name={name}
        selectOnBlur={false}
        placeholder='Nombre, CF o NIT (un nit valido)'
        noResultsMessage='Vendedor no encontrado'
        options={opcionesVendedores}
        value={vendedorSeleccionado}
        onAddItem={onAgregar}
        onSearchChange={this.buscarVendedor}
        onChange={onSeleccion} />
    );
  }
}

SelectorVendedor.propTypes = {
  name: PropTypes.string.isRequired,
  vendedores: PropTypes.array.isRequired,
  vendedorSeleccionado: PropTypes.number,
  onAgregar: PropTypes.func.isRequired,
  onBusqueda: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorVendedor;
