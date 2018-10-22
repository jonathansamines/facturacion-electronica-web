import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon, Checkbox, Button, Modal, Form } from 'semantic-ui-react';
import SelectorMoneda from '../SelectorMoneda';
import SelectorSucursal from '../SelectorSucursal';
import SelectorTipoDocumento from './SelectorTipoDocumento';

const esquemaValidacion = Yup.object().shape({
  id_moneda: Yup.string().required(),
  id_sucursal: Yup.number().required(),
  id_tipo_documento: Yup.string().required(),
  exportacion: Yup.bool(),
});

class ConfiguracionFactura extends React.Component {
  state = {
    abierto: true
  }

  cancelar = () => {
    this.setState({ abierto: false });
  }

  confirmar = (values) => {
    const { monedas, sucursales, tiposDocumentos } = this.props;

    const moneda = monedas.find((m) => m.id_moneda === values.id_moneda);
    const sucursal = sucursales.find((s) => s.id_sucursal === values.id_sucursal);
    const tipoDocumento = tiposDocumentos.find((t) => t.id_tipo_documento === values.id_tipo_documento);

    return this.setState(
      { abierto: false },
      () => this.props.onConfirmacion({
        moneda,
        sucursal,
        tipoDocumento,
        exportacion: values.exportacion
      })
    );
  }

  render() {
    const { monedas, sucursales, tiposDocumentos } = this.props;

    return (
      <Modal
        size='tiny'
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        open={this.state.abierto}>
        <Modal.Header>Crear Factura</Modal.Header>

        <Formik
          validationSchema={esquemaValidacion}
          initialValues={({
            id_moneda: null,
            id_sucursal: null,
            id_tipo_documento: null,
            exportacion: false
          })}
          onSubmit={this.confirmar}>
          {({ handleSubmit, setFieldValue, isValid, values }) => {
            const tiposDocumentoValidos = tiposDocumentos.filter((tipoDocumento) => tipoDocumento.exportacion === values.exportacion);

            return (
              <>
                <Modal.Content>
                  <Form id='configuracion-factura' onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Field required>
                      <label>Moneda</label>
                      <SelectorMoneda
                        name='id_moneda'
                        monedas={monedas}
                        monedaSeleccionada={values.id_moneda}
                        onSeleccion={(event, data) => setFieldValue('id_moneda', data.value)} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Sucursal</label>
                      <SelectorSucursal
                        name='id_sucursal'
                        sucursales={sucursales}
                        sucursalSeleccionada={values.id_sucursal}
                        onSeleccion={(event, data) => setFieldValue('id_sucursal', data.value)} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Tipo de Documento</label>
                      <SelectorTipoDocumento
                        name='id_tipo_documento'
                        tiposDocumento={tiposDocumentoValidos}
                        tipoDocumentoSeleccionado={values.id_tipo_documento}
                        onSeleccion={(event, data) => setFieldValue('id_tipo_documento', data.value)} />
                    </Form.Field>
                    <Form.Field>
                      <Icon name='truck' flipped='horizontally' />
                      <Checkbox
                        name='exportacion'
                        checked={values.exportacion}
                        onChange={(event, data) => setFieldValue('exportacion', data.checked) || setFieldValue('id_tipo_documento', null)}
                        label='Exportación' />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={this.props.onCancelar}>
                    Cancelar
                  </Button>
                  <Button
                    color='google plus'
                    type='submit'
                    form='configuracion-factura'
                    disabled={!isValid}>
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

ConfiguracionFactura.propTypes = {
  monedas: PropTypes.array.isRequired,
  sucursales: PropTypes.array.isRequired,
  tiposDocumentos: PropTypes.array.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onConfirmacion: PropTypes.func.isRequired,
};

export default ConfiguracionFactura;
