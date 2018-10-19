import React from 'react';
import { Segment, List } from 'semantic-ui-react';

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
      {vendedor.direccion}
    </List.Item>
    <List.Item>
      <a>Editar vendedor</a>
    </List.Item>
  </List>
);

export default DatosVendedor;
