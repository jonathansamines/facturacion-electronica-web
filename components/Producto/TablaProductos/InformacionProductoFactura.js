import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { List, Divider } from 'semantic-ui-react';

const InformacionProductoFactura = ({ subtotalImpuestos, subtotalPrecioProducto, totalPrecioProducto, producto, moneda }) => (
  <>
    <List relaxed horizontal size='medium'>
      <List.Item>
        <List.Header as='strong'>Precio Unitario: </List.Header>
        <FormattedNumber style='currency' value={producto.precio} currency={moneda.id_moneda} />
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Impuesto (%): </List.Header>
        <FormattedNumber style='currency' value={subtotalImpuestos} currency={moneda.id_moneda} />
      </List.Item>
    </List>
    <Divider />
    <List relaxed horizontal size='medium'>
      <List.Item>
        <List.Header as='strong'>Subtotal: </List.Header>
        <FormattedNumber style='currency' value={subtotalPrecioProducto} currency={moneda.id_moneda} />
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Precio Final: </List.Header>
        <FormattedNumber style='currency' value={totalPrecioProducto} currency={moneda.id_moneda} />
      </List.Item>
    </List>
  </>
);

InformacionProductoFactura.propTypes = {
  subtotalImpuestos: PropTypes.number.isRequired,
  subtotalPrecioProducto: PropTypes.number.isRequired,
  totalPrecioProducto: PropTypes.number.isRequired,
  producto: PropTypes.object.isRequired,
  moneda: PropTypes.object.isRequired,
};

export default InformacionProductoFactura;
