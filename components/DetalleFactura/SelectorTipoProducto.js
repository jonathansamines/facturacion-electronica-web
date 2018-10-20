import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';

const SelectorTipoProducto = (props) => {
  const {
    name,
    tiposProducto,
    tipoProductoSeleccionado,
    onSeleccion,
  } = props;

  const opcionesTiposProducto = tiposProducto.map((tipoProducto) => ({
    key: tipoProducto.id_tipo_producto,
    value: tipoProducto.id_tipo_producto,
    text: tipoProducto.descripcion
  }));

  return (
    <Select
      search
      name={name}
      selectOnBlur={false}
      selectOnNavigation={false}
      placeholder='Seleccione un tipo de producto'
      noResultsMessage='Tipo de producto no encontrado'
      options={opcionesTiposProducto}
      value={tipoProductoSeleccionado}
      onChange={onSeleccion} />
  );
};

SelectorTipoProducto.propTypes = {
  name: PropTypes.string.isRequired,
  tiposProducto: PropTypes.array.isRequired,
  tipoProductoSeleccionado: PropTypes.string,
  onSeleccion: PropTypes.func.isRequired,
};

export default SelectorTipoProducto;
