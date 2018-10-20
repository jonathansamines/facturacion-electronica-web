import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorUnidadMedida = (props) => {
  const {
    name,
    unidadesMedida,
    unidadMedidaSeleccionada,
    onSeleccion,
  } = props;

  const opcionesUnidadesMedida = unidadesMedida.map((unidadMedida) => ({
    key: unidadMedida.id_unidad_medida,
    value: unidadMedida.id_unidad_medida,
    text: unidadMedida.descripcion
  }));

  return (
    <Select
      search
      name={name}
      placeholder='Seleccione una unidad de medida'
      noResultsMessage='Unidad de medida no encontrada'
      options={opcionesUnidadesMedida}
      value={unidadMedidaSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorUnidadMedida.propTypes = {
  name: PropTypes.string.isRequired,
  unidadesMedida: PropTypes.array.isRequired,
  unidadMedidaSeleccionada: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorUnidadMedida;
