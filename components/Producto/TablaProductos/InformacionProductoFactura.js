import React from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
import { FormattedNumber } from 'react-intl';
import { List, Divider } from 'semantic-ui-react';

const InformacionProductoFactura = ({ impuestos, montoGravable, producto, moneda }) => {
  const totalImpuestos = sumBy(impuestos, 'montoImpuesto');

  return (
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
          <FormattedNumber style='currency' value={totalImpuestos} currency={moneda.id_moneda} />
        </List.Item>
      </List>
      <Divider />
      <List relaxed horizontal size='medium'>
        <List.Item>
          <List.Header as='strong'>Precio: </List.Header>
          <FormattedNumber style='currency' value={montoGravable + totalImpuestos} currency={moneda.id_moneda} />
        </List.Item>
      </List>
    </>
  );
};

InformacionProductoFactura.propTypes = {
  impuestos: PropTypes.array.isRequired,
  montoGravable: PropTypes.number.isRequired,
  producto: PropTypes.object.isRequired,
  moneda: PropTypes.object.isRequired,
};

export default InformacionProductoFactura;
