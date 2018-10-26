export function calcularDetalleProducto({ tipoCambio, moneda, producto, unidadesGravables, unidades }) {
  const tasaCambio = tipoCambio.tasa_cambio.find((t) => t.destino === moneda.id_moneda);

  const precioProducto = (
    producto.id_moneda === moneda.id_moneda ?
      producto.precio :
      producto.precio * tasaCambio.valor
  );

  const subtotalPrecioProducto = (precioProducto * unidades);
  const subtotalImpuestos = unidadesGravables.reduce((acum, unidadGravable) => {

    return acum + (
      unidadGravable.tipo_valor === 'FIJO' ?
        unidades * unidadGravable.valor :
        unidadGravable.valor * subtotalPrecioProducto / 100
    );
  }, 0);

  return {
    tasaCambio,
    subtotalImpuestos,
    subtotalPrecioProducto,
    totalPrecioProducto: subtotalPrecioProducto + subtotalImpuestos,
  };
}
