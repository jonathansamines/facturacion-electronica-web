import React from 'react';
import PropTypes from 'prop-types';
import { Wizard, Steps, Step } from 'react-albus';
import { Button, Modal } from 'semantic-ui-react';
import { TiposFrase } from './../Frases';
import { Complementos } from './../Complemento';

class ConfirmacionFactura extends React.Component {
  state = {
    tiposFrase: null,
    complemento: null,
  }

  configurarTiposFrase = (next) => {
    return (tiposFrase) => {
      this.setState({ tiposFrase }, () => next());
    };
  };

  configurarComplemento = (next) => {
    return (complemento) => {
      this.setState({ complemento }, () => next());
    };
  };

  obtenerPasos = ({ next }) => {
    const pasos = [];

    const { tipoDocumento, exportacion }  = this.props;
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
            onSeleccion={this.configurarTiposFrase(next)} />
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

    pasos.push(
      <Step key='previsualizacion' id='previsualizacion'>
        Estamos a punto de terminar, por favor revise la información:
      </Step>
    );

    return pasos;
  };

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
                      Facturar
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
  exportacion: PropTypes.bool.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onConfirmar: PropTypes.func.isRequired,
};

export default ConfirmacionFactura;
