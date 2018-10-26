import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorUnidadesGravables = (props) => {
  const {
    name,
    unidadesGravables,
    unidadGravableSeleccionada,
    onSeleccion,
  } = props;

  const opcionesUnidadesGravables = unidadesGravables.map((unidadGravable) => ({
    key: `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}`,
    value: `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}`,
    text: unidadGravable.nombre_corto
  }));

  return (
    <Select
      search
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione una unidad gravable'
      noResultsMessage='Unidad gravable no encontrada'
      options={opcionesUnidadesGravables}
      value={unidadGravableSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorUnidadesGravables.propTypes = {
  name: PropTypes.string.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  unidadGravableSeleccionada: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorUnidadesGravables;
