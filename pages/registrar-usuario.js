import './../styles.scss';

import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import servicio from '../lib/servicio-api';
import Segmento from '../components/Segmento';
import { Container, Segment, Message, Select, Button, Form } from 'semantic-ui-react';

class PaginaRegistro extends React.Component {
  static async getInitialProps() {
    const respuesta = await servicio.get('/empresas');

    return {
      empresas: respuesta.data,
    };
  }

  registrarUsuario = (values, actions) => {
    return servicio
      .post('/usuarios/registrar', values)
      .then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        actions.setStatus({
          mensaje: 'Cuenta registrada correctamente',
          error: false,
        });
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error en al registrar el usuario. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render() {
    const { empresas } = this.props;
    const opcionesEmpresas = empresas.map((empresa) => ({
      key: empresa.id_empresa,
      value: empresa.id_empresa,
      text: empresa.nombre_comercial
    }));

    return (
      <Container className='pagina-simple'>
        <Segmento className='registro-usuario'>
          <Segmento.Encabezado titulo='Registrar cuenta' />
          <Formik
            initialValues={({
              nombre: '',
              apellido: '',
              correo_electronico: '',
              nombre_usuario: '',
              password: '',
              id_empresa: null
            })}
            onSubmit={this.registrarUsuario}>
            {({ setFieldValue, handleSubmit, handleChange, values, status }) => (
              <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Nombre</label>
                    <input
                      required
                      name='nombre'
                      placeholder='Nombre completo'
                      value={values.nombre}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Apellido</label>
                    <input
                      required
                      name='apellido'
                      placeholder='Apellidos completos'
                      value={values.apellido}
                      onChange={handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Correo electrónico</label>
                    <input
                      required
                      name='correo_electronico'
                      type='email'
                      placeholder='Correo electronico'
                      value={values.correo_electronico}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Nombre Usuario</label>
                    <input
                      required
                      name='nombre_usuario'
                      placeholder='Nombre de usuario'
                      value={values.nombre_usuario}
                      onChange={handleChange} />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Contraseña</label>
                    <input
                      required
                      name='password'
                      type='password'
                      placeholder='Contraseña'
                      value={values.password}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Empresa</label>
                    <Select
                      required
                      search={true}
                      noResultsMessage='Empresa no encontrada'
                      placeholder='Seleccione su empresa'
                      name='id_empresa'
                      options={opcionesEmpresas}
                      value={values.id_empresa}
                      onChange={(event, data) => setFieldValue('id_empresa', data.value)} />
                  </Form.Field>
                </Form.Group>

                {
                  status &&
                  status.mensaje &&
                  <Message negative={status.error}>{status.mensaje}</Message>
                }

                <Segment vertical textAlign='right'>
                  <span>Ya tienes una cuenta? </span>
                  <Link href='/iniciar-sesion'>
                    <a>Inicia sesión</a>
                  </Link>
                </Segment>

                <Segment textAlign='right' vertical>
                  <Button basic color='green' type='submit'>Registrar</Button>
                </Segment>
              </Form>
            )}
          </Formik>
        </Segmento>
      </Container>
    );
  }
}

export default PaginaRegistro;
