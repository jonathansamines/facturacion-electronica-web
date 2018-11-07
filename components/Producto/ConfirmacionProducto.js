import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { obtenerUnidadesGravables } from '../../lib/servicio-api';
import { obtenerEsquemaUnidadesGravables, obtenerValoresPorDefectoUnidadesGravables }  from './generador-esquema';
import FormularioConfirmacionProducto from './FormularioConfirmacionProducto';

class ConfirmacionProducto extends React.Component {
  state = {
    unidadesGravables: []
  }

  componentDidMount() {
    const impuestos = this.props.tipoDocumento.impuestos.map((impuesto) => impuesto.id_impuesto);

    return obtenerUnidadesGravables({ impuestos })
      .then((unidadesGravables) => {
        this.setState({ unidadesGravables });
      });
  }

  confirmarProducto = ({ unidades, descuento, ...unidadesGravablesImpuestos }, actions) => {
    const { onConfirmar, producto } = this.props;

    actions.resetForm();

    const unidadesGravables = Object.keys(unidadesGravablesImpuestos)
      .map((idImpuestoUnidadGravable) => {
        const unidadGravable = this.state.unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesImpuestos[idImpuestoUnidadGravable]);

        return unidadGravable;
      });

    return onConfirmar({ producto, descuento: Number.parseFloat(descuento), unidades, unidadesGravables });
  }

  render() {
    const { moneda, tipoCambio, exportacion, producto, onCancelar } = this.props;
    const { unidadesGravables } = this.state;

    const impuestosDisponiblesProducto = producto.tipo_producto.impuestos.filter(
      (impuesto) => !!unidadesGravables.find((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)
    );

    return (
      <Modal open={true} size='small' onClose={onCancelar}>
        <Modal.Header>{producto.nombre}</Modal.Header>
        <Formik
          isInitialValid={impuestosDisponiblesProducto.length === 0}
          validationSchema={
            Yup.object().shape({
              unidades: Yup.number().min(1, 'El número de unidades no puede ser menor a 0').required('El número de unidades es requerido'),
              descuento: Yup.number().min(0, 'El descuento no puede ser menor a 0').required('El descuento es obligatorio'),
              ...obtenerEsquemaUnidadesGravables(impuestosDisponiblesProducto)
            })
          }
          initialValues={({
            unidades: 1,
            descuento: 0,
            ...obtenerValoresPorDefectoUnidadesGravables(impuestosDisponiblesProducto)
          })}
          onSubmit={this.confirmarProducto}>
          {(props) => (
            <>
              <Modal.Content>
                <FormularioConfirmacionProducto
                  formProps={props}
                  moneda={moneda}
                  tipoCambio={tipoCambio}
                  producto={producto}
                  exportacion={exportacion}
                  unidadesGravables={unidadesGravables} />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={onCancelar}>
                  Cancelar
                </Button>
                <Button
                  color='blue'
                  type='submit'
                  disabled={!props.isValid}
                  form='formulario-confirmacion-producto'>
                  Confirmar
                </Button>
              </Modal.Actions>
            </>
          )}
        </Formik>
      </Modal>
    );
  }
}

ConfirmacionProducto.propTypes = {
  moneda: PropTypes.object.isRequired,
  tipoCambio: PropTypes.object.isRequired,
  exportacion: PropTypes.bool.isRequired,
  producto: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  tipoDocumento: PropTypes.object,
  onConfirmar: PropTypes.func.isRequired,
};

export default ConfirmacionProducto;
