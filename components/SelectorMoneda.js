import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorMoneda = (props) => {
  const {
    name,
    monedas,
    monedaSeleccionada,
    onSeleccion,
  } = props;

  const opcionesMoneda = monedas.map((moneda) => ({
    key: moneda.id_moneda,
    value: moneda.id_moneda,
    text: moneda.descripcion
  }))

  return (
    <Select
      search
      name={name}
      selectOnBlur={false}
      placeholder='Seleccione una moneda'
      noResultsMessage='Moneda no encontrada'
      options={opcionesMoneda}
      value={monedaSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorMoneda.propTypes = {
  name: PropTypes.string.isRequired,
  monedas: PropTypes.array.isRequired,
  monedaSeleccionada: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorMoneda;
