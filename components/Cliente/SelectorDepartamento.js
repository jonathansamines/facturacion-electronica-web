import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorDepartamento = (props) => {
  const {
    name,
    departamentos,
    departamentoSeleccionado,
    onSeleccion,
  } = props;

  const opcionesDepartamentos = departamentos.map((departamento) => ({
    key: departamento.id_departamento,
    value: departamento.id_departamento,
    text: departamento.descripcion
  }));

  return (
    <Select
      search
      clearable
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione un departamento'
      noResultsMessage='Departamento no encontrado'
      options={opcionesDepartamentos}
      value={departamentoSeleccionado}
      onChange={onSeleccion} />
  );
};

SelectorDepartamento.propTypes = {
  name: PropTypes.string.isRequired,
  departamentos: PropTypes.array.isRequired,
  departamentoSeleccionado: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorDepartamento;
