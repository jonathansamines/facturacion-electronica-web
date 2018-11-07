import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Table } from 'semantic-ui-react';

const TablaImpuestos = ({
  producto,
  moneda,
  impuestos,
}) => (
  <Table compact celled definition>
    <Table.Body>
      {
        impuestos.filter(i => i.unidadGravable !== null).map(({ unidadGravable, montoImpuesto }) => (
          <Table.Row key={`${unidadGravable.id_impuesto}${unidadGravable.id_unidad_gravable}`}>
            <Table.Cell>{unidadGravable.nombre_corto}:</Table.Cell>
            <Table.Cell>
              <FormattedNumber
                style='currency'
                value={montoImpuesto}
                currency={unidadGravable.tipo_valor === 'FIJO' ? producto.id_moneda : moneda.id_moneda} />
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

TablaImpuestos.propTypes = {
  moneda: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  impuestos: PropTypes.array.isRequired,
};

export default TablaImpuestos;
