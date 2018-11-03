import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';
import { Table } from 'semantic-ui-react';
import { calcularDetalleProductoPorUnidadGravable } from './../calculos';

const TablaImpuestos = ({
  producto,
  moneda,
  descuento,
  unidades,
  precio,
  unidadesGravables
}) => (
  <Table compact celled definition>
    <Table.Body>
      {
        unidadesGravables.map((unidadGravable) => (
          <Table.Row key={`${unidadGravable.id_impuesto}${unidadGravable.id_unidad_gravable}`}>
            <Table.Cell>{unidadGravable.nombre_corto}:</Table.Cell>
            <Table.Cell>
              <FormattedNumber
                style='currency'
                value={(
                  calcularDetalleProductoPorUnidadGravable({ unidadGravable, precio, descuento, unidades})[1]
                )} currency={unidadGravable.tipo_valor === 'FIJO' ? producto.id_moneda : moneda.id_moneda} />
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
  unidades: PropTypes.number.isRequired,
  descuento: PropTypes.number.isRequired,
  precio: PropTypes.number.isRequired,
  montoGravable: PropTypes.number.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
};

export default TablaImpuestos;
