export function calcularDetalleProductoPorUnidadGravable({ unidadGravable, precio, descuento, unidades }) {
  // const montoGravable = (
  //   unidadGravable.tipo_valor === 'FIJO' ?
  //       precio - descuento - (unidadGravable.valor * unidades) :
  //       (precio - descuento) / unidadGravable.factor
  // );

  const montoGravable = (precio - descuento) / 1.12;// 1.12 es aparentemente independiente del impuesto (ya que todos incluyen el iva)

  const impuestos = (
    unidadGravable.tipo_valor === 'FIJO' ?
      unidades * unidadGravable.valor :
      montoGravable * unidadGravable.valor / 100
  );

  return [
    montoGravable,
    impuestos,
  ]
}

export function calcularDetalleProducto({ tipoCambio, moneda, descuento, producto, unidadesGravables, unidades }) {
  const tasaCambio = tipoCambio.tasa_cambio.find((t) => t.destino === moneda.id_moneda);

  const precioProducto = (
    producto.id_moneda === moneda.id_moneda ?
      producto.precio :
      producto.precio * tasaCambio.valor
  );

  const precio = (precioProducto * unidades);

  const iniciales = [
    unidadesGravables.length === 0 ? precio - descuento : 0, // cuando no hay unidades gravables, calcular el valor inicial
    0
  ];

  let [montoGravable, impuestos] = unidadesGravables.reduce(([sumatoriaMontoGravable, sumatoriaImpuestos], unidadGravable) => {

    const [montoGravable, impuestos] = calcularDetalleProductoPorUnidadGravable({ unidadGravable, precio, descuento, unidades });

    return [
      montoGravable,
      sumatoriaImpuestos + impuestos
    ];
  }, iniciales);

  return {
    tasaCambio,
    montoGravable,
    impuestos,
    precio: montoGravable + impuestos,
  };
}
