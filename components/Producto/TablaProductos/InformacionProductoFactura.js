import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { List, Divider } from 'semantic-ui-react';

const InformacionProductoFactura = ({ impuestos, montoGravable, precio, producto, moneda }) => (
  <>
    <List relaxed horizontal size='medium'>
      <List.Item>
        <List.Header as='strong'>Precio Unitario: </List.Header>
        <FormattedNumber style='currency' value={producto.precio} currency={moneda.id_moneda} />
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Monto Gravable: </List.Header>
        <FormattedNumber style='currency' value={montoGravable} currency={moneda.id_moneda} />
      </List.Item>
      <List.Item>
        <List.Header as='strong'>Impuestos: </List.Header>
        <FormattedNumber style='currency' value={impuestos} currency={moneda.id_moneda} />
      </List.Item>
    </List>
    <Divider />
    <List relaxed horizontal size='medium'>
      <List.Item>
        <List.Header as='strong'>Precio: </List.Header>
        <FormattedNumber style='currency' value={precio} currency={moneda.id_moneda} />
      </List.Item>
    </List>
  </>
);

InformacionProductoFactura.propTypes = {
  impuestos: PropTypes.number.isRequired,
  montoGravable: PropTypes.number.isRequired,
  precio: PropTypes.number.isRequired,
  producto: PropTypes.object.isRequired,
  moneda: PropTypes.object.isRequired,
};

export default InformacionProductoFactura;
