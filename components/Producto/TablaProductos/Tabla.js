import React from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
import { Table } from 'semantic-ui-react';
import { calcularDetalleProducto } from './../calculos';

const Tabla = (props) => {
  const {
    productos,
    tipoCambio,
    moneda,
    productoRenderer,
    noProductosRenderer,
    resumenRenderer,
  } = props;

  if (productos.length === 0) return (
    <Table.Body>
      {noProductosRenderer(productos)}
    </Table.Body>
  );

  let totalMontoGravable = 0;
  let totalImpuestos = 0;
  let totalUnidades = 0;
  let totalDescuento = 0;

  const renderProductos = productos.map(({ producto, unidadesGravables, descuento, unidades }) => {
    const {
      tasaCambio,
      impuestos,
      montoGravable,
      precioUnitario
    } = calcularDetalleProducto({ moneda, producto, unidades, unidadesGravables, descuento, tipoCambio });

    const sumatoriaImpuestos = sumBy(impuestos, 'montoImpuesto');

    totalImpuestos += sumatoriaImpuestos;
    totalMontoGravable += montoGravable;
    totalUnidades += unidades;
    totalDescuento += descuento;

    return productoRenderer({
      producto,
      descuento,
      unidades,
      unidadesGravables,
      moneda,
      tasaCambio,
      impuestos: sumatoriaImpuestos,
      montoGravable,
      precioUnitario,
    });
  });

  return (
    <>
      <Table.Body>{renderProductos}</Table.Body>
      <Table.Footer>
        {
          resumenRenderer({
            totalImpuestos,
            totalDescuento,
            totalMontoGravable,
            totalUnidades
          })
        }
      </Table.Footer>
    </>
  );
};

Tabla.propTypes = {
  productos: PropTypes.array.isRequired,
  tipoCambio: PropTypes.object.isRequired,
  moneda: PropTypes.object.isRequired,
  productoRenderer: PropTypes.func.isRequired,
  noProductosRenderer: PropTypes.func.isRequired,
  resumenRenderer: PropTypes.func.isRequired,
};

export default Tabla;
