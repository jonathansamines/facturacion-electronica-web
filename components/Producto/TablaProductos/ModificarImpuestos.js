import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Segment, Button, Modal } from 'semantic-ui-react';
import TablaImpuestos from './TablaImpuestos';
import InformacionProductoFactura from './InformacionProductoFactura';
import FormularioUnidadesGravables from '../FormularioUnidadesGravables';
import { obtenerUnidadesGravables } from '../../../lib/servicio-api';
import { calcularDetalleProducto } from './../calculos';

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
      <Modal open={true} size='tiny' onClose={this.cancelar}>
        <Modal.Header>Modificar Impuestos</Modal.Header>
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
          {(props) => {
            const { unidades, descuento, ...unidadesGravablesP } = props.values;

            const unidadesGravablesProd = Object.keys(unidadesGravablesP).map((id_impuesto_unidad_gravable) => (
              unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesP[id_impuesto_unidad_gravable])
            ))
            .filter(u => u !== undefined);

            const { impuestos, montoGravable } = calcularDetalleProducto({
              moneda,
              producto,
              unidades,
              descuento,
              unidadesGravables: unidadesGravablesProd,
              tipoCambio
            });

            const impuestosDisponiblesProducto = producto.tipo_producto.impuestos.filter(
              (impuesto) => !!unidadesGravables.find((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)
            );

            return (
              <>
                <Modal.Content>
                  <p>{producto.nombre}</p>
                  <Segment vertical>
                    <FormularioUnidadesGravables
                      {...props}
                      producto={producto}
                      exportacion={exportacion}
                      impuestosDisponiblesProducto={impuestosDisponiblesProducto}
                      unidadesGravables={unidadesGravables} />
                  </Segment>
                  <Segment vertical>
                    <InformacionProductoFactura
                      moneda={moneda}
                      producto={producto}
                      impuestos={impuestos}
                      montoGravable={montoGravable} />
                  </Segment>
                  {
                    unidadesGravablesProd.length > 0 &&
                    <Segment vertical>
                      <TablaImpuestos
                        moneda={moneda}
                        producto={producto}
                        impuestos={impuestos} />
                    </Segment>
                  }
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.cancelar}>
                    Cancelar
                  </Button>
                  <Button
                    color='blue'
                    type='submit'
                    disabled={!props.isValid}
                    form='formulario-unidades-gravables'>
                    Confirmar
                  </Button>
                </Modal.Actions>
              </>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

ModificarImpuestos.propTypes = {
  descuento: PropTypes.number.isRequired,
  exportacion: PropTypes.bool.isRequired,
  moneda: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  tipoDocumento: PropTypes.object,
  unidades: PropTypes.number.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
};

export default ModificarImpuestos;
