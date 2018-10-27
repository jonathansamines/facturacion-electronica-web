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

  confirmarProducto = ({ unidades, ...unidadesGravablesImpuestos }, actions) => {
    const { onConfirmar, producto } = this.props;

    actions.resetForm();

    const unidadesGravables = Object.keys(unidadesGravablesImpuestos)
      .map((idImpuestoUnidadGravable) => (
        this.state.unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesImpuestos[idImpuestoUnidadGravable])
      ));

    return onConfirmar({ producto, unidades, unidadesGravables });
  }

  render() {
    const { producto, onCancelar } = this.props;
    const { unidadesGravables } = this.state;

    const impuestosDisponiblesProducto = producto.tipo_producto.impuestos.filter(
      (impuesto) => !!unidadesGravables.find((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)
    );

    return (
      <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>{producto.nombre}</Modal.Header>
        <Formik
          isInitialValid={impuestosDisponiblesProducto.length === 0}
          validationSchema={
            Yup.object().shape({
              unidades: Yup.number().required(),
              ...obtenerEsquemaUnidadesGravables(impuestosDisponiblesProducto)
            })
          }
          initialValues={({
            unidades: 1,
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
                    impuestosDisponiblesProducto={impuestosDisponiblesProducto}
                    unidadesGravables={unidadesGravables} />
                </Segment>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={onCancelar}>
                  Cancelar
                </Button>
                <Button
                  color='google plus'
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
  producto: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default ConfirmacionProducto;
