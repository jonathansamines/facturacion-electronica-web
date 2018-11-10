function calcularDetalleProductoPorUnidadGravable({ unidadGravable, precio, descuento, unidades, moneda, tasaCambio }) {
  // 1.12 es un factor independiente del impuesto (ya que todos incluyen el iva)
  // Cuando el valor de la unidad gravable es 0, es porque el producto no incluye el valor del impuesto en su precio
  const montoGravable = unidadGravable.valor === 0 ? (precio - descuento) : (precio - descuento) / 1.12;

  const montoImpuesto = (
    unidadGravable.tipo_valor === 'FIJO' ?

      // Para montos fijos, tenemos que convertir el valor
      unidades * (moneda.id_moneda === unidadGravable.id_moneda ? unidadGravable.valor : unidadGravable.valor * tasaCambio.valor) :

      // Para porcentajes, está bien utilizar el valor original
      montoGravable * unidadGravable.valor / 100
  );

  return {
    montoGravable,
    montoImpuesto,
  };
}

export function calcularDetalleProducto({ tipoCambio, moneda, descuento, producto, unidadesGravables, unidades }) {
  const tasaCambio = tipoCambio.tasa_cambio.find((tasa) => tasa.destino === moneda.id_moneda);

  const precioUnitario = (
    producto.id_moneda === moneda.id_moneda ?
      producto.precio :
      producto.precio * tasaCambio.valor
  );

  const precio = (precioUnitario * unidades);

  const iniciales = [
    unidadesGravables.length === 0 ? precio - descuento : 0, // cuando no hay unidades gravables, calcular el valor inicial
    []
  ];

  let [montoGravable, impuestos] = unidadesGravables.reduce(([, impuestos], unidadGravable) => {

    const { montoGravable, montoImpuesto } = calcularDetalleProductoPorUnidadGravable({ unidadGravable, precio, descuento, unidades, moneda, tasaCambio });

    return [
      montoGravable,
      [
        ...impuestos,
       {
        montoImpuesto,
        unidadGravable,
       }
      ]
    ];
  }, iniciales);

  return {
    impuestos,
    tasaCambio,
    precioUnitario,
    montoGravable,
  };
}
