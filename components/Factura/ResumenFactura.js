import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';

const ResumenFactura = ({
  moneda,
  onConfirmacion,
  totalMontoGravable,
  totalImpuestos,
  totalDescuento,
}) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Total Monto Gravable: </List.Header>
      <FormattedNumber style='currency' value={totalMontoGravable} currency={moneda.id_moneda} />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Impuestos: </List.Header>
      <FormattedNumber style='currency' value={totalImpuestos} currency={moneda.id_moneda} />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Descuentos: </List.Header>
      <FormattedNumber style='currency' value={totalDescuento} currency={moneda.id_moneda} />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Total: </List.Header>
      <FormattedNumber style='currency' value={totalMontoGravable + totalImpuestos} currency={moneda.id_moneda}>
        {(formatted) => <strong>{formatted}</strong>}
      </FormattedNumber>
    </List.Item>
    <form id='formulario-confirmacion' onSubmit={onConfirmacion}></form>
  </List>
);

ResumenFactura.propTypes = {
  moneda: PropTypes.object.isRequired,
  totalMontoGravable: PropTypes.number.isRequired,
  totalImpuestos: PropTypes.number.isRequired,
  totalDescuento: PropTypes.number.isRequired,
  onConfirmacion: PropTypes.number.isRequired,
};

export default ResumenFactura;
