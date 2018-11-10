import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Table } from 'semantic-ui-react';

const TablaImpuestos = ({
  moneda,
  impuestos,
}) => (
  <Table compact celled definition>
    <Table.Body>
      {
        impuestos
          .filter((impuesto) => impuesto.unidadGravable !== null)
          .map(({ unidadGravable, montoImpuesto }) => (
          <Table.Row key={`${unidadGravable.id_impuesto}${unidadGravable.id_unidad_gravable}`}>
            <Table.Cell>{unidadGravable.nombre_corto}:</Table.Cell>
            <Table.Cell>
              <FormattedNumber
                style='currency'
                value={montoImpuesto}
                currency={moneda.id_moneda} />
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

TablaImpuestos.propTypes = {
  moneda: PropTypes.object.isRequired,
  impuestos: PropTypes.array.isRequired,
};

export default TablaImpuestos;
