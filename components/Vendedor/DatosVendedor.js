import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const DatosVendedor = ({ vendedor }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Código: </List.Header>
      {vendedor.nit}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Vendedor: </List.Header>
      {vendedor.nombre} {vendedor.apellido}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Sucursal: </List.Header>
      {vendedor.sucursal.descripcion}
    </List.Item>
    <List.Item>
      <a>Editar vendedor</a>
    </List.Item>
  </List>
);

DatosVendedor.propTypes = {
  vendedor: PropTypes.object.isRequired,
};

export default DatosVendedor;
