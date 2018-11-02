import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorCondicionesEntrega = (props) => {
  const {
    name,
    condicionesEntrega,
    condicionEntregaSeleccionada,
    onSeleccion,
  } = props;

  const opcionesCondicionEntrega = condicionesEntrega.map((condicionEntrega) => ({
    key: condicionEntrega.id_condicion_entrega,
    value: condicionEntrega.id_condicion_entrega,
    text: condicionEntrega.designacion,
  }));

  return (
    <Select
      search
      clearable
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione una condición de entrega'
      noResultsMessage='Condicion de entrega no encontrada'
      options={opcionesCondicionEntrega}
      value={condicionEntregaSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorCondicionesEntrega.propTypes = {
  name: PropTypes.string.isRequired,
  condicionesEntrega: PropTypes.array.isRequired,
  condicionEntregaSeleccionada: PropTypes.number,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorCondicionesEntrega;
