import React from 'react';
import PropTypes from 'prop-types';
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

  confirmar = ({ unidades, ...unidadesGravablesProducto }) => {
    const { producto, onConfirmar } = this.props;

    const unidadesGravables = Object.keys(unidadesGravablesProducto)
      .map((idImpuestoUnidadGravable) => (
        this.state.unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesProducto[idImpuestoUnidadGravable])
      ));

    onConfirmar({
      producto,
      unidades,
      unidadesGravables,
    });
  }

  cancelar = () => {
    this.props.onCancelar();
  }

  render() {
    const { unidadesGravables } = this.state;
    const { producto, unidades, moneda, tipoCambio, unidadesGravables: unidadesGravablesProducto } = this.props;

    return (
      <Modal defaultOpen={true} size='tiny' onClose={this.cancelar}>
        <Modal.Header>Modificar Impuestos</Modal.Header>
        <Formik
          isInitialValid={true}
          enableReinitialize={true}
          initialValues={({
            unidades,
            ...(unidadesGravablesProducto.reduce((resultado, unidadGravable) => (
              {
                ...resultado,
              [unidadGravable.id_impuesto]: `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}`
              }
            ), {}))
          })}
          onSubmit={this.confirmar}>
          {(props) => {
            const { unidades, ...unidadesGravablesP } = props.values;

            const {
              subtotalImpuestos,
              subtotalPrecioProducto,
              totalPrecioProducto
            } = calcularDetalleProducto({ moneda, producto, unidades, unidadesGravables: unidadesGravablesProducto, tipoCambio });

            const unidadesGravablesProd = Object.keys(unidadesGravablesP).map((id_impuesto_unidad_gravable) => (
              unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesP[id_impuesto_unidad_gravable])
            ))
            .filter(u => u !== undefined);

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
                      impuestosDisponiblesProducto={impuestosDisponiblesProducto}
                      unidadesGravables={unidadesGravables} />
                  </Segment>
                  <Segment vertical>
                    <InformacionProductoFactura
                      moneda={moneda}
                      producto={producto}
                      subtotalImpuestos={subtotalImpuestos}
                      subtotalPrecioProducto={subtotalPrecioProducto}
                      totalPrecioProducto={totalPrecioProducto} />
                  </Segment>
                  {
                    unidadesGravablesProd.length > 0 &&
                    <Segment vertical>
                      <TablaImpuestos
                        moneda={moneda}
                        producto={producto}
                        unidades={unidades}
                        unidadesGravables={unidadesGravablesProd}
                        subtotalPrecioProducto={subtotalPrecioProducto} />
                    </Segment>
                  }
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.cancelar}>
                    Cancelar
                  </Button>
                  <Button
                    color='google plus'
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
  moneda: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  unidades: PropTypes.number.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
};

export default ModificarImpuestos;
