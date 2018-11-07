import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';

const InformacionProducto = ({ moneda, producto, precioUnitario }) => (
  <>
    <p>{producto.descripcion}</p>
    <List relaxed horizontal size='medium'>
      <List.Item>
        <List.Header as='strong'>Marca: </List.Header>
        {producto.marca}
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Precio unitario: </List.Header>
        <FormattedNumber style='currency' value={precioUnitario} currency={moneda.id_moneda} />
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Unidad de Medida: </List.Header>
        {producto.unidad_medida.descripcion}
      </List.Item>
    </List>
  </>
);

InformacionProducto.propTypes = {
  moneda: PropTypes.object.isRequired,
  precioUnitario: PropTypes.number.isRequired,
  producto: PropTypes.object.isRequired,
};

export default InformacionProducto;
