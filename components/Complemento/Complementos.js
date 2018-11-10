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
  confirmarComplemento = (idComplemento) => {
    return (values) => {
      const { onConfirmar } = this.props;

      return onConfirmar({ idComplemento, datos: values })
    };
  }

  render() {
    const { complementos, complementoSeleccionado } = this.props;

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
                  initialValues={
                    Object.assign(
                      {},
                      {
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
                      },
                      complementoSeleccionado && complementoSeleccionado.datos
                    )
                  }
                  onSubmit={this.confirmarComplemento(complemento.id_complemento)}>
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
                  initialValues={
                    Object.assign(
                      {},
                      {
                        retencion_isr: 0,
                        retencion_iva: 0,
                        total_menos_retenciones: 0
                      },
                      complementoSeleccionado && complementoSeleccionado.datos
                    )
                  }
                  onSubmit={this.confirmarComplemento(complemento.id_complemento)}>
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
                      numero_abono: Yup.number(),
                      monto_abono: Yup.number(),
                      fecha_vencimiento: Yup.string(),
                    })
                  }
                  initialValues={
                    Object.assign(
                      {},
                      {
                        numero_abono: 0,
                        monto_abono: 0,
                        fecha_vencimiento: startOfToday(),
                      },
                      complementoSeleccionado && complementoSeleccionado.datos
                    )
                  }
                  onSubmit={this.confirmarComplemento(complemento.id_complemento)}>
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
                      version: Yup.number(),
                      regimen: Yup.string().nullable(),
                      numero_autorizacion: Yup.string(),
                      fecha_emision: Yup.string(),
                      motivo_ajuste: Yup.string(),
                      numero_documento: Yup.string(),
                      numero_serie: Yup.string(),
                    })
                  }
                  initialValues={
                    Object.assign(
                      {},
                      {
                        version: 1,
                        regimen: null,
                        numero_autorizacion: '',
                        fecha_emision: startOfToday(),
                        motivo_ajuste: '',
                        numero_documento: '',
                        numero_serie: '',
                      },
                      complementoSeleccionado && complementoSeleccionado.datos
                    )
                  }
                  onSubmit={this.confirmarComplemento(complemento.id_complemento)}>
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
  complementoSeleccionado: PropTypes.object,
  onConfirmar: PropTypes.func.isRequired,
};

export default Complementos;
