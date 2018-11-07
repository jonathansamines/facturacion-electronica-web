import React from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
import { FormattedNumber } from 'react-intl';
import { List, Segment } from 'semantic-ui-react';

const InformacionProductoFactura = ({ precioUnitario, unidades, impuestos, montoGravable, moneda }) => {
  const totalImpuestos = sumBy(impuestos, 'montoImpuesto');

  return (
    <>
      <Segment vertical>
        <List relaxed horizontal size='medium'>
          <List.Item>
            <List.Header as='strong'>Precio: </List.Header>
            <FormattedNumber style='currency' value={precioUnitario * unidades} currency={moneda.id_moneda} />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Monto Gravable: </List.Header>
            <FormattedNumber style='currency' value={montoGravable} currency={moneda.id_moneda} />
          </List.Item>
        </List>
      </Segment>
      <Segment vertical>
        <List relaxed horizontal size='medium'>
          <List.Item>
            <List.Header as='strong'>Impuestos: </List.Header>
            <FormattedNumber style='currency' value={totalImpuestos} currency={moneda.id_moneda} />
          </List.Item>
          <List.Item>
            <List.Header as='strong'>Subtotal: </List.Header>
            <FormattedNumber style='currency' value={montoGravable + totalImpuestos} currency={moneda.id_moneda} />
          </List.Item>
        </List>
      </Segment>
    </>
  );
};

InformacionProductoFactura.propTypes = {
  precioUnitario: PropTypes.number.isRequired,
  impuestos: PropTypes.array.isRequired,
  montoGravable: PropTypes.number.isRequired,
  moneda: PropTypes.object.isRequired,
  unidades: PropTypes.number.isRequired
};

export default InformacionProductoFactura;
