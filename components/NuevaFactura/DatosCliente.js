import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

const DatosCliente = ({ cliente, onClienteEditado }) => (
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
      <a onClick={() => onClienteEditado(cliente)}>Editar Cliente</a>
    </List.Item>
  </List>
);

DatosCliente.propTypes = {
  cliente: PropTypes.object.isRequired,
  onClienteEditado: PropTypes.func.isRequired,
};

export default DatosCliente;
