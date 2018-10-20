import React from 'react';
import PropTypes from 'prop-types';
import Propiedad from '../Propiedad';
import { List } from 'semantic-ui-react';

const DatosCliente = ({ cliente, onClienteEditado }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>NIT: </List.Header>
      <Propiedad valor={cliente} propiedad='nit' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Cliente: </List.Header>
      <Propiedad valor={cliente} propiedad='nombre' />
      <Propiedad valor={cliente} propiedad='apellido' fallback='' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Dirección: </List.Header>
      <Propiedad valor={cliente} propiedad='direccion' />
    </List.Item>
    {
      cliente &&
      <List.Item>
        <a onClick={() => onClienteEditado(cliente)}>Editar Cliente</a>
      </List.Item>
    }
  </List>
);

DatosCliente.propTypes = {
  cliente: PropTypes.object,
  onClienteEditado: PropTypes.func.isRequired,
};

export default DatosCliente;
