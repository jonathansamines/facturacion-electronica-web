import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Checkbox, Button, Modal, Form, Select } from 'semantic-ui-react';

class NuevaFactura extends React.Component {
  state = {
    abierto: true
  }

  cancelar = () => {
    this.setState({ abierto: false });
  }

  confirmar = (values, actions) => {
    const { monedas, sucursales, tiposDocumentos } = this.props;

    const tipoDocumento = tiposDocumentos.find((t) => t.id_tipo_documento === values.id_tipo_documento);
    const moneda = monedas.find((m) => m.id_moneda === values.id_moneda);
    const sucursal = sucursales.find((s) => s.id_sucursal === values.id_sucursal);

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

    const opcionesTipoDocumento = tiposDocumentos.map((tipoDocumento) => ({
      key: tipoDocumento.id_tipo_documento,
      value: tipoDocumento.id_tipo_documento,
      text: tipoDocumento.descripcion,
    }));

    const opcionesMoneda = monedas.map((moneda) => ({
      key: moneda.id_moneda,
      value: moneda.id_moneda,
      text: moneda.descripcion,
    }));

    const opcionesSucursales = sucursales.map((sucursal) => ({
      key: sucursal.id_sucursal,
      value: sucursal.id_sucursal,
      text: sucursal.descripcion,
    }));

    return (
      <Modal
        size='tiny'
        closeOnEscape={false}
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        open={this.state.abierto}>
        <Modal.Header>Crear Factura</Modal.Header>

        <Formik
          initialValues={({
            id_tipo_documento: null,
            id_moneda: null,
            id_sucursal: null,
            exportacion: false
          })}
          onSubmit={this.confirmar}>
          {({ handleSubmit, setFieldValue, values }) => (
            <>
              <Modal.Content>
                <Form id='configuracion-factura' onSubmit={handleSubmit} autoComplete='off'>
                  <Form.Field required>
                    <Select
                      name='id_tipo_documento'
                      placeholder='Seleccione un tipo de documento (DTE)'
                      value={values.id_tipo_documento}
                      options={opcionesTipoDocumento}
                      onChange={(event, data) => setFieldValue('id_tipo_documento', data.value)} />
                  </Form.Field>
                  <Form.Field required>
                    <Select
                      name='id_moneda'
                      placeholder='Seleccione una moneda'
                      value={values.id_moneda}
                      options={opcionesMoneda}
                      onChange={(event, data) => setFieldValue('id_moneda', data.value)} />
                  </Form.Field>
                  <Form.Field required>
                    <Select
                      search
                      name='id_sucursal'
                      placeholder='Buscar una sucursal'
                      value={values.id_sucursal}
                      options={opcionesSucursales}
                      onChange={(event, data) => setFieldValue('id_sucursal', data.value)} />
                  </Form.Field>

                  <Form.Field>
                    <Checkbox
                      name='exportacion'
                      checked={values.exportacion}
                      onChange={(event, data) => setFieldValue('exportacion', data.checked)}
                      label='Exportacion' />
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
                  disabled={values.id_sucursal === null || values.id_moneda === null || values.id_moneda === null}>
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

NuevaFactura.propTypes = {
  monedas: PropTypes.array.isRequired,
  sucursales: PropTypes.array.isRequired,
  tiposDocumentos: PropTypes.array.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onConfirmacion: PropTypes.func.isRequired,
};

export default NuevaFactura;
