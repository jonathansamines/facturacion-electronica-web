import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import FormularioConfirmacionProducto from '../FormularioConfirmacionProducto';
import { obtenerUnidadesGravables } from '../../../lib/servicio-api';

class ModificarImpuestos extends React.Component {
  state = {
    unidadesGravables: []
  }

  componentDidMount() {
    const impuestos = this.props.tipoDocumento.impuestos.map((impuesto) => impuesto.id_impuesto);

    return obtenerUnidadesGravables({ impuestos })
      .then((unidadesGravables) => {
        this.setState({ unidadesGravables: unidadesGravables });
      });
  }

  confirmar = ({ unidades, descuento, ...unidadesGravablesProducto }) => {
    const { producto, onConfirmar } = this.props;

    const unidadesGravables = Object.keys(unidadesGravablesProducto)
      .map((idImpuestoUnidadGravable) => (
        this.state.unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesProducto[idImpuestoUnidadGravable])
      ));

    onConfirmar({
      producto,
      unidades,
      descuento: Number.parseFloat(descuento),
      unidadesGravables,
    });
  }

  cancelar = () => {
    this.props.onCancelar();
  }

  render() {
    const { unidadesGravables } = this.state;
    const {
      producto,
      unidades,
      moneda,
      descuento,
      tipoCambio,
      exportacion,
      unidadesGravables: unidadesGravablesProducto
    } = this.props;

    return (
      <Modal open={true} size='small' onClose={this.cancelar}>
        <Modal.Header>{producto.nombre}</Modal.Header>
        <Formik
          isInitialValid={true}
          enableReinitialize={true}
          initialValues={({
            unidades,
            descuento,
            ...(unidadesGravablesProducto.reduce((resultado, unidadGravable) => (
              {
                ...resultado,
              [unidadGravable.id_impuesto]: `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}`
              }
            ), {}))
          })}

          validationSchema={Yup.object().shape({
            unidades: Yup.number().min(1, 'El número de unidades no puede ser menor a 0').required('El número de unidades es requerido'),
            descuento: Yup.number().min(0, 'El descuento no puede ser menor a 0').required('El descuento es obligatorio'),

            ...(unidadesGravablesProducto.reduce((resultado, unidadGravable) => (
              {
                ...resultado,
                [unidadGravable.id_impuesto]: Yup.number().required()
              }
            ), {}))
          })}

          onSubmit={this.confirmar}>
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
                <Button onClick={this.cancelar}>
                  Cancelar
                </Button>
                <Button
                  color='blue'
                  type='submit'
                  disabled={!props.isValid}
                  form='formulario-confirmacion-producto'>
                  Actualizar
                </Button>
              </Modal.Actions>
            </>
          )}
        </Formik>
      </Modal>
    );
  }
}

ModificarImpuestos.propTypes = {
  tipoCambio: PropTypes.object.isRequired,
  descuento: PropTypes.number.isRequired,
  exportacion: PropTypes.bool.isRequired,
  moneda: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  tipoDocumento: PropTypes.object,
  unidades: PropTypes.number.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  onConfirmar: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default ModificarImpuestos;
