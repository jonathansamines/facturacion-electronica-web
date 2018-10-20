import React from 'react';
import { Button, Modal, Form, Select, Message, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
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
          400
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

  cancelar = () => {
    return this.props.onCancelar();
  }

  render () {
    const { nombreCliente } = this.props;
    const { departamentos } = this.state;

    const opcionesDepartamentos = departamentos.map((departamento) => ({
      key: departamento.id_departamento,
      value: departamento.id_departamento,
      text: departamento.descripcion
    }));

    return (
      <Modal defaultOpen={true} size='tiny'>
        <Modal.Header>Nuevo cliente</Modal.Header>
        <Modal.Content>
          <Formik
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
            {({ values, status, handleChange, setFieldValue, handleSubmit }) => {
              const departamento = departamentos.find((departamento) => departamento.id_departamento === values.id_departamento);
              const municipios = departamento ? departamento.municipios : [];

              const opcionesMunicipios = municipios.map((municipio) => ({
                key: municipio.id_municipio,
                value: municipio.id_municipio,
                text: municipio.descripcion
              }))

              return (
                <Form id='creacion-cliente' onSubmit={handleSubmit}>
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
                      placeholder='Nombre del cliente'
                      value={values.nombre}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='apellido'
                      placeholder='Apellido del cliente'
                      value={values.apellido}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='direccion'
                      placeholder='Dirección de residencia o comercial'
                      value={values.direccion}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Select
                      search
                      name='id_departamento'
                      placeholder='Seleccione un departamento'
                      noResultsMessage='Departamento no encontrado'
                      options={opcionesDepartamentos}
                      value={values.id_departamento}
                      onChange={(event, data) => setFieldValue('id_departamento', data.value)} />
                  </Form.Field>
                  <Form.Field required>
                    <Select
                      search
                      name='id_municipio'
                      placeholder='Seleccione un municipio'
                      noResultsMessage='Municipio no encontrado'
                      options={opcionesMunicipios}
                      value={values.id_municipio}
                      onChange={(event, data) => setFieldValue('id_municipio', data.value)} />
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
          <Button onClick={this.cancelar}>
            Cancelar
          </Button>
          <Button
            color='google plus'
            type='submit'
            form='creacion-cliente'>
            Guardar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NuevoCliente;
