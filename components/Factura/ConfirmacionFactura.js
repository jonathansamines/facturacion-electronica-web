import React from 'react';
import PropTypes from 'prop-types';
import sumBy from 'lodash/sumBy';
import { Wizard, Steps, Step } from 'react-albus';
import { Button, Modal } from 'semantic-ui-react';
import { TiposFrase } from './../Frases';
import { Complementos } from './../Complemento';
import ResumenFactura from './ResumenFactura';
import { calcularDetalleProducto } from './..//Producto/calculos';
import { generarFactura } from './../../lib/servicio-api';

class ConfirmacionFactura extends React.Component {
  state = {
    frases: null,
    complemento: null,
  }

  configurarFrases = (next) => {
    return (frases) => {
      this.setState({ frases }, () => next());
    };
  };

  configurarComplemento = (next) => {
    return (complemento) => {
      this.setState({ complemento }, () => next());
    };
  };

  obtenerPasos = ({ next }) => {
    const pasos = [];

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
            tiposFrase={tipoDocumento.tipos_frase}
            onSeleccion={this.configurarFrases(next)} />
        </Step>
      )
    }

    if (complementos.length > 0) {
      pasos.push(
        <Step key='complemento' id='formulario-complemento' siguiente='Confirmar complemento'>
          <Complementos
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
      </Step>
    );

    pasos.push(
      <Step key='resultado' id='resultado'>
        Finalizado con errores o exito rotundo
      </Step>
    );

    return pasos;
  };

  generarFactura = (next) => {

    return (event) => {
      event.preventDefault();

      const { exportacion, factura, tipoDocumento } = this.props;
      const { frases: frasesSeleccionadas, complementos: complementosSeleccionados } = this.state;

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

      const recurso = {
        id_moneda: factura.moneda.id_moneda,
        id_cliente: factura.cliente.id_cliente,
        id_tipo_documento: tipoDocumento.id_tipo_documento,
        exportacion,
        fecha_emision: factura.fechaEmision,
        frases,
        productos,
      };

      this.setState({ generando: true }, () => {

        return generarFactura({ factura: recurso })
          .then(() => this.setState({ generando: false }, () => next()))
          .catch(() => (
            this.setState({ generando: false, error: 'Todo se fue al carajo' }, () => next())
          ));
      });
    };
  }

  render() {
    const { onConfirmar, onCancelar }  = this.props;

    return (
      <Modal open={true} size='small' onClose={onCancelar}>
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
                    <Button color='blue' onClick={onConfirmar}>
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
  onConfirmar: PropTypes.func.isRequired,
};

export default ConfirmacionFactura;
