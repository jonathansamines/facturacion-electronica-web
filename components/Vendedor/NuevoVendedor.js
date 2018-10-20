import React from 'react';
import { Button, Modal, Form, Select, Message, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import { crearVendedor } from '../../lib/servicio-api';

class NuevoVendedor extends React.Component {
  crearVendedor = (values, actions) => {
    return crearVendedor({ vendedor: values })
      .then((nuevoVendedor) => {
        actions.resetForm();
        actions.setSubmitting(false);

        actions.setStatus({
          mensaje: 'Vendedor creado correctamente',
          error: false,
        });

        setTimeout(
          () => this.props.onVendedorCreado(nuevoVendedor),
          400
        );
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al crear el vendedor. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, nombreVendedor, sucursales } = this.props;

    const opcionesSucursales = sucursales.map((sucursal) => ({
      key: sucursal.id_sucursal,
      value: sucursal.id_sucursal,
      text: sucursal.descripcion,
    }));

    return (
      <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Nuevo vendedor</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={({
              cui: '',
              nit: '',
              nombre: nombreVendedor,
              apellido: '',
              id_sucursal: null,
            })}
            onSubmit={this.crearVendedor}>
            {({ values, status, handleChange, setFieldValue, handleSubmit }) => {
              return (
                <Form id='creacion-vendedor' onSubmit={handleSubmit}>
                  <Form.Field required>
                    <Input
                      name='cui'
                      placeholder='Código único de identificacion'
                      value={values.cui}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='nit'
                      placeholder='Número de identificación tributaria'
                      value={values.nit}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='nombre'
                      placeholder='Nombre del vendedor'
                      value={values.nombre}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='apellido'
                      placeholder='Apellido del vendedor'
                      value={values.apellido}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Select
                      search
                      name='id_sucursal'
                      placeholder='Seleccione una sucursal de la empresa'
                      noResultsMessage='Sucursal no encontrada'
                      options={opcionesSucursales}
                      value={values.id_sucursal}
                      onChange={(event, data) => setFieldValue('id_sucursal', data.value)} />
                  </Form.Field>
                  {
                    status &&
                    status.mensaje &&
                    <Message negative={status.error}>{status.mensaje}</Message>
                  }
                </Form>
              );
             }}
          </Formik>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onCancelar}>
            Cancelar
          </Button>
          <Button
            color='google plus'
            type='submit'
            form='creacion-vendedor'>
            Guardar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NuevoVendedor;
