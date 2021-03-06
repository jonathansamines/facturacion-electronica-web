import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorSucursal = (props) => {
  const {
    name,
    sucursales,
    sucursalSeleccionada,
    onSeleccion,
  } = props;

  const opcionesSucursales = sucursales.map((sucursal) => ({
    key: sucursal.id_sucursal,
    value: sucursal.id_sucursal,
    text: sucursal.descripcion,
  }));

  return (
    <Select
      search
      clearable
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione una sucursal de la empresa'
      noResultsMessage='Sucursal no encontrada'
      options={opcionesSucursales}
      value={sucursalSeleccionada}
      onChange={onSeleccion} />
  );
};

SelectorSucursal.propTypes = {
  name: PropTypes.string.isRequired,
  sucursales: PropTypes.array.isRequired,
  sucursalSeleccionada: PropTypes.number,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorSucursal;
