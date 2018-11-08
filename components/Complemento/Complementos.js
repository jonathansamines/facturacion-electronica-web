import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startOfToday } from 'date-fns';
import FormularioExportacion from './FormularioExportacion';
import FormularioRetencionesFacturaEspecial from './FormularioRetencionesFacturaEspecial';
import FormularioFacturaCambiaria from './FormularioFacturaCambiaria';
import FormularioReferenciaNotas from './FormularioReferenciaNotas';

class Complementos extends React.Component {
  render() {
    const { onConfirmar, complementos } = this.props;

    return (
      <>
        {
          complementos.map((complemento) => {
            // exportacion
            if (complemento.id_complemento === 1) {

              return (
                <Formik
                  key={complemento.id_complemento}
                  validationSchema={
                    Yup.object().shape({
                      condicion_entrega: Yup.string().nullable(),
                      nombre_consignatario: Yup.string(),
                      direccion_consignatario: Yup.string(),
                      codigo_consignatario: Yup.string(),
                      nombre_comprador: Yup.string(),
                      direccion_comprador: Yup.string(),
                      codigo_comprador: Yup.string(),
                      otra_referencia: Yup.string(),
                      nombre_exportador: Yup.string(),
                      codigo_exportador: Yup.string(),
                    })
                  }
                  initialValues={{
                    condicion_entrega: null,
                    nombre_consignatario: '',
                    direccion_consignatario: '',
                    codigo_consignatario: '',
                    nombre_comprador: '',
                    direccion_comprador: '',
                    codigo_comprador: '',
                    otra_referencia: '',
                    nombre_exportador: '',
                    codigo_exportador: '',
                  }}
                  onSubmit={onConfirmar}>
                  {(props) => (
                    <FormularioExportacion
                      key={complemento.id_complemento}
                      complemento={complemento}
                      {...props} />
                  )}
                </Formik>
              );
            }

            if (complemento.id_complemento === 2) {
              return (
                <Formik
                  key={complemento.id_complemento}
                  validationSchema={
                    Yup.object().shape({
                      retencion_isr: Yup.number(),
                      retencion_iva: Yup.number(),
                      total_menos_retenciones: Yup.number()
                    })
                  }
                  initialValues={{
                    retencion_isr: 0,
                    retencion_iva: 0,
                    total_menos_retenciones: 0
                  }}
                  onSubmit={onConfirmar}>
                  {(props) => (
                    <FormularioRetencionesFacturaEspecial
                      key={complemento.id_complemento}
                      complemento={complemento}
                      {...props} />
                  )}
                </Formik>
              );
            }

            if (complemento.id_complemento === 3) {
              return (
                <Formik
                  key={complemento.id_complemento}
                  validationSchema={
                    Yup.object().shape({
                      monto_abono: Yup.number(),
                      fecha_vencimiento: Yup.string(),
                    })
                  }
                  initialValues={{
                    monto_abono: 0,
                    fecha_vencimiento: startOfToday(),
                  }}
                  onSubmit={onConfirmar}>
                  {(props) => (
                    <FormularioFacturaCambiaria
                      key={complemento.id_complemento}
                      complemento={complemento}
                      {...props} />
                  )}
                </Formik>
              );
            }

            if (complemento.id_complemento === 4) {
              return (
                <Formik
                  key={complemento.id_complemento}
                  validationSchema={
                    Yup.object().shape({
                      regimen: Yup.string().nullable(),
                      numero_autorizacion: Yup.string(),
                      fecha_emision: Yup.string(),
                      motivo_ajuste: Yup.string(),
                      numero_documento: Yup.string(),
                      numero_serie: Yup.string(),
                    })
                  }
                  initialValues={{
                    regimen: null,
                    numero_autorizacion: '',
                    fecha_emision: startOfToday(),
                    motivo_ajuste: '',
                    numero_documento: '',
                    numero_serie: '',
                  }}
                  onSubmit={onConfirmar}>
                  {(props) => (
                    <FormularioReferenciaNotas
                      key={complemento.id_complemento}
                      complemento={complemento}
                      {...props} />
                  )}
                </Formik>
              );
            }
          })
        }
      </>
    );
  }
}

Complementos.propTypes = {
  complementos: PropTypes.array.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default Complementos;
