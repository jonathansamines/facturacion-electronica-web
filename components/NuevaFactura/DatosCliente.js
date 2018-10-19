import React from 'react';
import { Segment, List } from 'semantic-ui-react';

const DatosCliente = ({ cliente }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>NIT: </List.Header>
      {cliente.nit}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Cliente: </List.Header>
      {cliente.nombre} {cliente.apellido}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Dirección: </List.Header>
      {cliente.direccion}
    </List.Item>
    <List.Item>
      <a>Editar Cliente</a>
    </List.Item>
  </List>
);

export default DatosCliente;
