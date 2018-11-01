import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorTipoDocumento = (props) => {
  const {
    name,
    tiposDocumento,
    tipoDocumentoSeleccionado,
    onSeleccion,
  } = props;

  const opcionesTiposDocumento = tiposDocumento.map((tipoDocumento) => ({
    key: tipoDocumento.id_tipo_documento,
    value: tipoDocumento.id_tipo_documento,
    text: tipoDocumento.descripcion,
  }));

  return (
    <Select
      search
      clearable
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione un tipo de documento (DTE)'
      noResultsMessage='Departamento no encontrado'
      options={opcionesTiposDocumento}
      value={tipoDocumentoSeleccionado}
      onChange={onSeleccion} />
  );
};

SelectorTipoDocumento.propTypes = {
  name: PropTypes.string.isRequired,
  tiposDocumento: PropTypes.array.isRequired,
  tipoDocumentoSeleccionado: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorTipoDocumento;
