import * as Yup from 'yup';

export function obtenerEsquemaUnidadesGravables(impuestos) {

  return impuestos.reduce((all, impuesto) => ({
    ...all,
    [impuesto.id_impuesto]: Yup.number().required(),
  }), {});
}

export function obtenerValoresPorDefectoUnidadesGravables(impuestos) {
  return impuestos.reduce((all, impuesto) => ({
    ...all,
    [impuesto.id_impuesto]: null,
  }), {});
}
