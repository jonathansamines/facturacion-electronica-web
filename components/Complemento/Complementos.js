import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormularioExportacion from './FormularioExportacion';
import FormularioRetencionesFacturaEspecial from './FormularioRetencionesFacturaEspecial';
import FormularioFacturaCambiaria from './FormularioFacturaCambiaria';
import FormularioReferenciaNotas from './FormularioReferenciaNotas';

class Complementos extends React.Component {
  render() {
    const { complementos, exportacion } = this.props;

    return (
      <>
        {
          complementos.map((complemento) => {
            // exportacion
            if (complemento.id_complemento === 1 && exportacion) {

              return (
                <Formik
                  key={complemento.id_complemento}
                  validationSchema={
                    Yup.object().shape({
                      condicion_entrega: Yup.string().required(),
                      nombre_consignatario: Yup.string().required(),
                      direccion_consignatario: Yup.string().required(),
                      codigo_consignatario: Yup.string().required(),
                      nombre_comprador: Yup.string().required(),
                      direccion_comprador: Yup.string().required(),
                      codigo_comprador: Yup.string().required(),
                      otra_referencia: Yup.string().required(),
                      nombre_exportador: Yup.string().required(),
                      codigo_exportador: Yup.string().required(),
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
                  }}>
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
                      retencion_isr: Yup.number().required(),
                      retencion_iva: Yup.number().required(),
                      total_menos_retenciones: Yup.number().required()
                    })
                  }
                  initialValues={{
                    retencion_isr: 0,
                    retencion_iva: 0,
                    total_menos_retenciones: 0
                  }}>
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
                      monto_abono: Yup.number().required(),
                      fecha_vencimiento: Yup.string().required(),
                    })
                  }
                  initialValues={{
                    monto_abono: 0,
                    fecha_vencimiento: null,
                  }}>
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
                      regimen: Yup.string().required(),
                      numero_autorizacion: Yup.string().required(),
                      fecha_emision: Yup.string().required(),
                      motivo_ajuste: Yup.string().required(),
                      numero_documento: Yup.string().required(),
                      numero_serie: Yup.string().required(),
                    })
                  }
                  initialValues={{
                    regimen: null,
                    numero_autorizacion: null,
                    fecha_emision: null,
                    motivo_ajuste: '',
                    numero_documento: null,
                    numero_serie: null,
                  }}>
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
  exportacion: PropTypes.bool.isRequired,
  complementos: PropTypes.array.isRequired,
};

export default Complementos;
