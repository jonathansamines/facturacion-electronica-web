import React from 'react';
import PropTypes from 'prop-types';
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

  let total = 0;
  let totalMontoGravable = 0;
  let totalImpuestos = 0;
  let totalUnidades = 0;
  let totalDescuento = 0;

  const renderProductos = productos.map(({ producto, unidadesGravables, descuento, unidades }) => {
    const {
      tasaCambio,
      impuestos,
      montoGravable,
      precio,
    } = calcularDetalleProducto({ moneda, producto, unidades, unidadesGravables, descuento, tipoCambio });

    totalImpuestos += impuestos;
    totalMontoGravable += montoGravable;
    total += precio;
    totalUnidades += unidades;
    totalDescuento += descuento;

    return productoRenderer({
      producto,
      descuento,
      unidades,
      unidadesGravables,
      moneda,
      tasaCambio,
      impuestos,
      montoGravable,
      precio,
    });
  });

  return (
    <>
      <Table.Body>{renderProductos}</Table.Body>
      <Table.Footer>
        {
          resumenRenderer({
            total,
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
