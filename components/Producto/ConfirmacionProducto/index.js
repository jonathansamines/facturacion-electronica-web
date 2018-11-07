import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Segment, Button, Modal } from 'semantic-ui-react';
import InformacionProducto from './InformacionProducto';
import { obtenerUnidadesGravables } from '../../../lib/servicio-api';
import { obtenerEsquemaUnidadesGravables, obtenerValoresPorDefectoUnidadesGravables }  from './../generador-esquema';
import FormularioUnidadesGravables from '../FormularioUnidadesGravables';

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
    const { exportacion, producto, onCancelar } = this.props;
    const { unidadesGravables } = this.state;

    const impuestosDisponiblesProducto = producto.tipo_producto.impuestos.filter(
      (impuesto) => !!unidadesGravables.find((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)
    );

    return (
      <Modal open={true} size='tiny' onClose={onCancelar}>
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
                <p>{producto.descripcion}</p>

                <Segment vertical>
                  <InformacionProducto producto={producto} />
                </Segment>

                <Segment vertical>
                  <FormularioUnidadesGravables
                    {...props}
                    producto={producto}
                    exportacion={exportacion}
                    impuestosDisponiblesProducto={impuestosDisponiblesProducto}
                    unidadesGravables={unidadesGravables} />
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={onCancelar}>
                  Cancelar
                </Button>
                <Button
                  color='blue'
                  type='submit'
                  disabled={!props.isValid}
                  form='formulario-unidades-gravables'>
                  Agregar
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
  exportacion: PropTypes.bool.isRequired,
  producto: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  tipoDocumento: PropTypes.object,
  onConfirmar: PropTypes.func.isRequired,
};

export default ConfirmacionProducto;
