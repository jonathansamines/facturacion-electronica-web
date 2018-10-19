import React from 'react';
import { Formik } from 'formik';
import { Checkbox, Button, Modal, Form, Select } from 'semantic-ui-react';

class NuevaFactura extends React.Component {
  state = {
    abierto: true
  }

  cancelar = () => {
    this.setState({ abierto: false });
  }

  aceptar = (values, actions) => {
    this.setState({ abierto: false });

    return this.props.onConfirmacion(values);
  }

  render() {
    const {
      onSubmit,
      monedas,
      sucursales,
      tiposDocumentos
    } = this.props;

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
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        open={this.state.abierto}>
        <Modal.Header>Crear Factura</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={({
              id_tipo_documento: null,
              id_moneda: null,
              id_sucursal: null,
              exportacion: false
            })}
            onSubmit={this.aceptar}>
            {({ handleSubmit, setFieldValue, values }) => (
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
                    onChange={(event, data) => setFieldValue('exportacion', data.value)}
                    label='Exportacion' />
                </Form.Field>
              </Form>
            )}
          </Formik>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={this.cancelar}>
            Cancelar
          </Button>
          <Button
            color='blue'
            type='submit'
            form='configuracion-factura'>
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NuevaFactura;
