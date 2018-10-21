import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextArea, Button, Modal, Form, Message, Input } from 'semantic-ui-react';
import SelectorDepartamento from './SelectorDepartamento';
import SelectorMunicipio from './SelectorMunicipio';
import { obtenerDepartamentos, crearCliente } from '../../lib/servicio-api';

class NuevoCliente extends React.Component {
  state = {
    departamentos: [],
  }

  componentDidMount() {
    return obtenerDepartamentos()
      .then((departamentos) => {
        this.setState({ departamentos });
      });
  }

  crearCliente = (values, actions) => {
    const cliente = {
      nit: values.nit,
      cui: values.cui,
      id_municipio: values.id_municipio,
      nombre: values.nombre,
      apellido: values.apellido,
      direccion: values.direccion,
    };

    return crearCliente({ cliente })
      .then((nuevoCliente) => {
        actions.resetForm();
        actions.setSubmitting(false);

        actions.setStatus({
          mensaje: 'Cliente creado correctamente',
          error: false,
        });

        setTimeout(
          () => this.props.onClienteCreado(nuevoCliente),
          1000
        );
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al crear el cliente. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, nombreCliente } = this.props;
    const { departamentos } = this.state;

    return (
      <Modal defaultOpen={true} size='small' onClose={onCancelar}>
        <Modal.Header>Nuevo cliente</Modal.Header>
        <Formik
          validationSchema={
            Yup.object().shape({
              cui: Yup.string().required(),
              nit: Yup.string().required(),
              nombre: Yup.string().required(),
              apellido: Yup.string(),
              direccion: Yup.string().required(),
              id_departamento: Yup.string().required(),
              id_municipio: Yup.string().required()
            })
          }
          initialValues={({
            cui: '',
            nit: '',
            nombre: nombreCliente,
            apellido: '',
            direccion: '',
            id_departamento: null,
            id_municipio: null,
          })}
          onSubmit={this.crearCliente}>
          {({ isValid, isSubmitting, values, errors, status, handleChange, setFieldValue, handleSubmit }) => {
            const departamento = departamentos.find((departamento) => departamento.id_departamento === values.id_departamento);
            const municipios = departamento ? departamento.municipios : [];

            return (
              <>
                <Modal.Content>
                  <Form
                    id='creacion-cliente'
                    autoComplete='off'
                    loading={isSubmitting}
                    success={!(status && status.error)}
                    onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                      <Form.Field required>
                        <label>Código único de identificación</label>
                        <Input
                          name='cui'
                          error={Boolean(errors.cui)}
                          placeholder='Código único de identificacion'
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
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required>
                        <label>Nombre del cliente</label>
                        <Input
                          name='nombre'
                          error={Boolean(errors.nombre)}
                          placeholder='Nombre del cliente'
                          value={values.nombre}
                          onChange={handleChange} />
                      </Form.Field>
                      <Form.Field>
                      <label>Apellido del cliente</label>
                        <Input
                          name='apellido'
                          error={Boolean(errors.apellido)}
                          placeholder='Apellido del cliente'
                          value={values.apellido}
                          onChange={handleChange} />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required>
                        <label>Departamento</label>
                        <SelectorDepartamento
                          name='id_departamento'
                          departamentos={departamentos}
                          departamentoSeleccionado={values.id_departamento}
                          onSeleccion={(event, data) => setFieldValue('id_departamento', data.value)} />
                      </Form.Field>
                      <Form.Field required>
                        <label>Municipio</label>
                        <SelectorMunicipio
                          name='id_municipio'
                          municipios={municipios}
                          municipioSeleccionado={values.id_municipio}
                          onSeleccion={(event, data) => setFieldValue('id_municipio', data.value)} />
                      </Form.Field>
                    </Form.Group>
                    <Form.Field required>
                      <label>Dirección de residencia o comercial</label>
                      <TextArea
                        name='direccion'
                        error={Boolean(errors.direccion)}
                        placeholder='Dirección de residencia o comercial'
                        value={values.direccion}
                        onChange={handleChange} />
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
                    loading={isSubmitting}
                    disabled={!isValid}
                    form='creacion-cliente'>
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

export default NuevoCliente;
