import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select, Icon } from 'semantic-ui-react';
import { buscarVendedor } from '../../lib/servicio-api';

class SelectorVendedor extends React.Component {
  state = {
    buscando: false
  }

  buscarVendedor = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      this.setState({ buscando: true }, () => {

        return buscarVendedor({ busqueda })
        .then((vendedores) => {
          setTimeout(() => this.setState({ buscando: false }), 400);

          return onBusqueda({ busqueda, vendedores });
        })
        .catch((error) => {
          setTimeout(() => this.setState({ buscando: false }), 400);

          return onBusqueda({ busqueda, error });
        });
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
        icon={'search'}
        additionLabel={
          <>
            <Icon name='add user' />
            <span>Crear nuevo vendedor:&nbsp;</span>
          </>
        }
        name={name}
        selectOnBlur={false}
        selectOnNavigation={false}
        loading={this.state.buscando}
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
  vendedorSeleccionado: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAgregar: PropTypes.func.isRequired,
  onBusqueda: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorVendedor;
