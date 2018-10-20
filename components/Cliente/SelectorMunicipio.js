import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorMunicipio = (props) => {
  const {
    name,
    municipios,
    municipioSeleccionado,
    onSeleccion,
  } = props;

  const opcionesMunicipios = municipios.map((municipio) => ({
    key: municipio.id_municipio,
    value: municipio.id_municipio,
    text: municipio.descripcion
  }))

  return (
    <Select
      search
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione un municipio'
      noResultsMessage='Municipio no encontrado'
      options={opcionesMunicipios}
      value={municipioSeleccionado}
      onChange={onSeleccion} />
  );
};

SelectorMunicipio.propTypes = {
  name: PropTypes.string.isRequired,
  municipios: PropTypes.array.isRequired,
  municipioSeleccionado: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorMunicipio;
