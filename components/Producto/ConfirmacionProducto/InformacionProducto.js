import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';

const InformacionProducto = ({ producto }) => (
  <List relaxed horizontal size='medium'>
    <List.Item>
      <List.Header as='strong'>Marca: </List.Header>
      {producto.marca}
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Precio: </List.Header>
      <FormattedNumber style='currency' value={producto.precio} currency={producto.id_moneda} />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Unidad de Medida: </List.Header>
      {producto.unidad_medida.descripcion}
    </List.Item>
  </List>
);

InformacionProducto.propTypes = {
  producto: PropTypes.object.isRequired,
};

export default InformacionProducto;
