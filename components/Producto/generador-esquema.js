import * as Yup from 'yup';

export function obtenerEsquemaUnidadesGravables(impuestos) {

  return impuestos.reduce((all, impuesto) => ({
    ...all,
    [impuesto.id_impuesto]: Yup.number().required(`La unidad gravable es requerida para el impuesto ${impuesto.nombre_corto}`),
  }), {});
}

export function obtenerValoresPorDefectoUnidadesGravables(impuestos) {
  return impuestos.reduce((all, impuesto) => ({
    ...all,
    [impuesto.id_impuesto]: null,
  }), {});
}
