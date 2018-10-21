import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Modal, Form, Message, Input } from 'semantic-ui-react';
import { crearVendedor } from '../../lib/servicio-api';
import SelectorSucursal from '../SelectorSucursal';

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
          1500
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

    return (
      <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Nuevo vendedor</Modal.Header>
        <Formik
          validationSchema={
            Yup.object().shape({
              cui: Yup.string().required(),
              nit: Yup.string().required(),
              nombre: Yup.string().required(),
              apellido: Yup.string(),
              id_sucursal: Yup.number().required()
            })
          }
          initialValues={({
            cui: '',
            nit: '',
            nombre: nombreVendedor,
            apellido: '',
            id_sucursal: null,
          })}
          onSubmit={this.crearVendedor}>
          {({ isValid, isSubmitting, values, errors, status, handleChange, setFieldValue, handleSubmit }) => {
            return (
              <>
                <Modal.Content>
                  <Form
                    id='creacion-vendedor'
                    autoComplete='off'
                    loading={isSubmitting}
                    success={!(status && status.error)}
                    onSubmit={handleSubmit}>
                    <Form.Field required>
                      <label>Código único de identificación</label>
                      <Input
                        name='cui'
                        error={Boolean(errors.cui)}
                        placeholder='Código único de identificación'
                        value={values.cui}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Número de identificación tributaria</label>
                      <Input
                        name='nit'
                        error={Boolean(errors.nit)}
                        placeholder='Número de identificación tributaria'
                        value={values.nit}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Nombre</label>
                      <Input
                        name='nombre'
                        error={Boolean(errors.nombre)}
                        placeholder='Nombre del vendedor'
                        value={values.nombre}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Apellido</label>
                      <Input
                        name='apellido'
                        error={Boolean(errors.apellido)}
                        placeholder='Apellido del vendedor'
                        value={values.apellido}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field required>
                      <label>Sucursal</label>
                      <SelectorSucursal
                        name='id_sucursal'
                        sucursales={sucursales}
                        sucursalSeleccionada={values.id_sucursal}
                        onSeleccion={(event, data) => setFieldValue('id_sucursal', data.value)} />
                    </Form.Field>
                    {
                      status &&
                      status.mensaje &&
                      <Message success={!status.error} error={status.error} content={status.mensaje} />
                    }
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={onCancelar}>
                    Cancelar
                  </Button>
                  <Button
                    color='google plus'
                    type='submit'
                    disabled={!isValid}
                    form='creacion-vendedor'>
                    Guardar
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

export default NuevoVendedor;
