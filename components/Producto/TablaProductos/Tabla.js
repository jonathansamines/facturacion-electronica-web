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
  let totalProductos = 0;
  let totalImpuestos = 0;
  let totalUnidades = 0;

  const renderProductos = productos.map(({ producto, unidadesGravables, unidades }) => {
    const {
      tasaCambio,
      subtotalImpuestos,
      subtotalPrecioProducto,
      totalPrecioProducto
    } = calcularDetalleProducto({ moneda, producto, unidades, unidadesGravables, tipoCambio });

    totalImpuestos += subtotalImpuestos;
    totalProductos += subtotalPrecioProducto;
    total += totalPrecioProducto;
    totalUnidades += unidades;

    return productoRenderer({
      producto,
      unidades,
      unidadesGravables,
      moneda,
      tasaCambio,
      totalImpuestos: subtotalImpuestos,
      subtotalPrecioProducto: subtotalPrecioProducto,
      totalPrecioProducto,
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
            totalProductos,
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
