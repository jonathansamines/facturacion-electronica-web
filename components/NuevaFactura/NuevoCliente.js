import React from 'react';
import { Button, Modal, Form, Select, Input } from 'semantic-ui-react';
import { Formik } from 'formik';
import servicio from '../../lib/servicio-api';

class NuevoCliente extends React.Component {
  state = {
    departamentos: [],
  }

  componentDidMount() {
    return servicio
      .get('/departamentos')
      .then((respuesta) => {
        this.setState({ departamentos: respuesta.data });
      });
  }

  crearCliente = (values, actions) => {
    return this.props.onCrearUsuario();
  }

  cancelar = () => {
    return this.props.onCancelar();
  }

  render () {
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
              nombre: '',
              apellido: '',
              id_departamento: null,
              id_municipio: null,
            })}
            onSubmit={this.crearCliente}>
            {({ values, handleChange, setFieldValue, handleSubmit }) => {
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
