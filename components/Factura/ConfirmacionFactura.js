import React from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
import { Wizard, Steps, Step } from 'react-albus';
import { Message, Button, Modal } from 'semantic-ui-react';
import { TiposFrase } from './../Frases';
import { Complementos } from './../Complemento';
import ResumenFactura from './ResumenFactura';
import { calcularDetalleProducto } from './..//Producto/calculos';
import { generarFactura } from './../../lib/servicio-api';

class ConfirmacionFactura extends React.Component {
  state = {
    frases: [],
    complemento: null,
    creando: false,
    errores: []
  }

  configurarFrases = (next) => {
    return (frases) => {
      this.setState({ frases, errores: [] }, () => next());
    };
  };

  configurarComplemento = (next) => {
    return (complemento) => {
      this.setState({ complemento, errores: [] }, () => next());
    };
  };

  obtenerPasos = ({ next }) => {
    const pasos = [];

    const { frases, complemento, errores } = this.state;

    const { factura, tipoDocumento, exportacion, tipoCambio }  = this.props;
    const complementos = tipoDocumento.complementos.filter((complemento) => {
      if (complemento.id_complemento === 1 && !exportacion) return false;

      return true;
    });

    if (tipoDocumento.tipos_frase.length > 0) {
      pasos.push(
        <Step key='seleccion-frase' id='formulario-seleccion-frase' siguiente='Confirmar frase'>
          <h3>Selección de Frase</h3>
          <TiposFrase
            frasesSeleccionadas={frases}
            tiposFrase={tipoDocumento.tipos_frase}
            onSeleccion={this.configurarFrases(next)} />
        </Step>
      )
    }

    if (complementos.length > 0) {
      pasos.push(
        <Step key='complemento' id='formulario-complemento' siguiente='Confirmar complemento'>
          <Complementos
            complementoSeleccionado={complemento}
            complementos={complementos}
            onConfirmar={this.configurarComplemento(next)} />
        </Step>
      );
    }

    let totalImpuestos = 0;
    let totalMontoGravable = 0;
    let totalDescuento = 0;

    factura.productos.forEach(({ producto, unidadesGravables, descuento, unidades }) => {
      const {
        impuestos,
        montoGravable,
      } = calcularDetalleProducto({ moneda: factura.moneda, producto, unidades, unidadesGravables, descuento, tipoCambio });

      const sumatoriaImpuestos = sumBy(impuestos, 'montoImpuesto');

      totalImpuestos += sumatoriaImpuestos;
      totalMontoGravable += montoGravable;
      totalDescuento += descuento;
    });

    pasos.push(
      <Step key='previsualizacion' id='formulario-confirmacion' siguiente='Generar Factura'>
        Estamos a punto de terminar, por favor revise la información:

        <ResumenFactura
          moneda={factura.moneda}
          totalMontoGravable={totalMontoGravable}
          totalImpuestos={totalImpuestos}
          totalDescuento={totalDescuento}
          onConfirmacion={this.generarFactura(next)} />

        {
          errores.length > 0 &&
          <Message header='Hubo un error al crear el documento' list={errores} error />
        }
      </Step>
    );

    pasos.push(
      <Step key='resultado' id='resultado'>
        Documento creando correctamente
      </Step>
    );

    return pasos;
  };

  generarFactura = (next) => {

    return (event) => {
      event.preventDefault();

      const { exportacion, factura, tipoDocumento } = this.props;
      const { frases: frasesSeleccionadas, complemento: complementoSeleccionado } = this.state;

      const frases = frasesSeleccionadas.map((frase) => {

        return {
          id_tipo_frase: frase.id_tipo_frase,
          codigo_escenario: frase.codigo_escenario
        };
      });

      const productos = factura.productos.map(({ producto, unidades, descuento, unidadesGravables }) => {

        return {
          unidades,
          descuento,
          id_producto: producto.id_producto,
          impuestos: unidadesGravables.map((u) => ({ id_impuesto: u.id_impuesto, id_unidad_gravable: u.id_unidad_gravable }))
        };
      });

      const complementos = (
        complementoSeleccionado !== null ?
          [{
            id_complemento: complementoSeleccionado.idComplemento,
            datos: complementoSeleccionado.datos
          }] : []
      );

      const recurso = {
        id_moneda: factura.moneda.id_moneda,
        id_cliente: factura.cliente.id_cliente,
        id_tipo_documento: tipoDocumento.id_tipo_documento,
        id_vendedor: factura.vendedor.id_vendedor,
        id_sucursal: factura.sucursal.id_sucursal,
        exportacion,
        fecha_emision: factura.fechaEmision,
        frases,
        productos,
        complementos
      };

      this.setState({ creando: true, errores: [] }, () => {

        return generarFactura({ factura: recurso })
          .then(() => (
            this.setState({ creando: false, errores: [] }, () => next())
          ))
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 422) {
                return this.setState({
                  creando: false,
                  errores: error.response.data.errors.map((e) => e.message)
                });
              }

              if (error.response.status === 400) {
                return this.setState({
                  creando: false,
                  errores: [error.response.data.message]
                });
              }
            }

            return this.setState({
              creando: false,
              errores: ['Hubo un error al crear el documento. Por favor revise su información e intentelo de nuevo más tarde']
            });
          });
      });
    };
  }

  resetear = () => this.setState({ creando: false, errores: [] })

  render() {
    const { onConfirmacion, onCancelar }  = this.props;
    const { creando } = this.state;

    return (
      <Modal
        open={true}
        size='small'
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        onClose={onCancelar}>
        <Wizard render={(wizard) => {
          const { previous, step, steps } = wizard;

          return (
            <>
              <Modal.Header>Confirmar Factura</Modal.Header>
              <Modal.Content>
                <Steps>
                  {this.obtenerPasos(wizard)}
                </Steps>
              </Modal.Content>
              <Modal.Actions>
                {/* Boton Cancelar */}
                {
                  steps.indexOf(step) === 0 &&
                  <Button onClick={onCancelar}>
                      Cancelar
                  </Button>
                }

                {/* Boton regresar */}
                {
                  steps.indexOf(step) > 0 && (
                    <Button onClick={previous}>
                      Regresar
                    </Button>
                  )
                }

                {/* Boton siguiente */}
                {
                  steps.indexOf(step) < steps.length - 1 && (
                    <Button color='blue' form={step.id} type='submit'>
                      {step.siguiente}
                    </Button>
                  )
                }

                {/* Boton terminar */}
                {
                  steps.indexOf(step) === steps.length - 1 && (
                    <Button color='blue' loading={creando} onClick={onConfirmacion}>
                      Aceptar
                    </Button>
                  )
                }
              </Modal.Actions>
            </>
          );
        }} />
      </Modal>
    );
  }
}

ConfirmacionFactura.propTypes = {
  factura: PropTypes.object,
  exportacion: PropTypes.bool.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  tipoCambio: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onConfirmacion: PropTypes.func.isRequired,
};

export default ConfirmacionFactura;
