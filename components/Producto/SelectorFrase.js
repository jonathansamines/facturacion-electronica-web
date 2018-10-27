import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorFrase = (props) => {
  const {
    name,
    frases,
    fraseSeleccionada,
    onSeleccion,
  } = props;

  const opcionesFrases = frases.map((frase) => ({
    key: frase.id_frase,
    value: frase.id_frase,
    text: frase.descripcion
  }));

  return (
    <Select
      search
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione una frase'
      noResultsMessage='Frase no encontrada'
      options={opcionesFrases}
      value={fraseSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorFrase.propTypes = {
  name: PropTypes.string.isRequired,
  frases: PropTypes.array.isRequired,
  fraseSeleccionada: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorFrase;
