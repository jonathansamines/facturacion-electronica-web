import React from 'react';
import PropTypes from 'prop-types';
import { List, Checkbox } from 'semantic-ui-react';

const DatosFactura = ({ opciones }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Tipo de Documento: </List.Header>
      {opciones.tipoDocumento.descripcion}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Moneda: </List.Header>
      {opciones.moneda.descripcion} ({opciones.moneda.id_moneda})
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Sucursal: </List.Header>
      {opciones.sucursal.descripcion}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Exportacion: </List.Header>
      {opciones.exportacion ? 'Si' : 'No'}
    </List.Item>
  </List>
);

DatosFactura.propTypes = {
  opciones: PropTypes.object.isRequired,
};

export default DatosFactura;
