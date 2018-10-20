import React from 'react';
import PropTypes from 'prop-types';
import Propiedad from '../Propiedad';
import { List } from 'semantic-ui-react';

const DatosVendedor = ({ vendedor }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Código: </List.Header>
      <Propiedad valor={vendedor} propiedad='nit' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Vendedor: </List.Header>
      <Propiedad valor={vendedor} propiedad='nombre' />
      <Propiedad valor={vendedor} propiedad='apellido' fallback='' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Sucursal: </List.Header>
      <Propiedad valor={vendedor} propiedad='descripcion' />
    </List.Item>
    {
      vendedor &&
      <List.Item>
        <a>Editar vendedor</a>
      </List.Item>
    }
  </List>
);

DatosVendedor.propTypes = {
  vendedor: PropTypes.object.isRequired,
};

export default DatosVendedor;
