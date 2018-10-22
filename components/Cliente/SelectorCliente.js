import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select } from 'semantic-ui-react';
import { buscarCliente } from '../../lib/servicio-api';

class SelectorCliente extends React.Component {
  buscarCliente = debounce((event, data) => {
    const busqueda = data.searchQuery;
    const { onBusqueda } = this.props;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarCliente({ busqueda })
        .then((clientes) => {
          return onBusqueda({ busqueda, clientes });
        })
        .catch((error) => {
          return onBusqueda({ busqueda, error });
        });
    }
  }, 200)

  render() {
    const {
      name,
      clientes,
      clienteSeleccionado,
      onAgregar,
      onSeleccion,
    } = this.props;

    const opcionesClientes = clientes.map((cliente) => ({
      key: cliente.id_cliente,
      value: cliente.id_cliente,
      text: `${cliente.nombre} ${cliente.apellido} (${cliente.nit})`
    }));

    return (
      <Select
        search
        allowAdditions
        name={name}
        selectOnBlur={false}
        selectOnNavigation={false}
        additionLabel='Crear nuevo cliente: '
        placeholder='Nombre, CF o NIT (un nit valido)'
        noResultsMessage='Cliente no encontrado'
        options={opcionesClientes}
        value={clienteSeleccionado}
        onAddItem={onAgregar}
        onSearchChange={this.buscarCliente}
        onChange={onSeleccion} />
    );
  }
}

SelectorCliente.propTypes = {
  name: PropTypes.string.isRequired,
  clientes: PropTypes.array.isRequired,
  clienteSeleccionado: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAgregar: PropTypes.func.isRequired,
  onBusqueda: PropTypes.func.isRequired,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorCliente;
