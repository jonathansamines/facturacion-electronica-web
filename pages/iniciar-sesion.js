import './../styles.scss';

import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import { Container, Segment, Message, Select, Button, Form } from 'semantic-ui-react';
import Segmento from '../components/Segmento';
import { obtenerEmpresas, iniciarSesion } from '../lib/servicio-api';

class PaginaLogin extends React.Component {
  static async getInitialProps({ req }) {
    return {
      empresas: await obtenerEmpresas({ req }),
    };
  }

  iniciarSesion = (values, actions) => {
    return iniciarSesion({ credenciales: values })
      .then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
        actions.setStatus({
          error: false,
        });

        window.location.replace('/');
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Credenciales incorrectas. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render() {
    const opcionesEmpresas = this.props.empresas.map((empresa) => ({
      key: empresa.id_empresa,
      value: empresa.id_empresa,
      text: empresa.nombre_comercial
    }));

    return (
      <Container className='pagina-simple'>
        <Segmento className='inicio-sesion'>
          <Segmento.Encabezado titulo='Iniciar Sesión' />
          <Formik
            initialValues={({
              nombre_usuario: '',
              password: '',
              id_empresa: null
            })}
            onSubmit={this.iniciarSesion}>
            {({ setFieldValue, handleChange, handleSubmit, values, status }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label>Nombre Usuario</label>
                  <input
                    required
                    autoComplete='off'
                    name='nombre_usuario'
                    placeholder='Nombre de usuario o correo electrónico'
                    value={values.nombre_usuario}
                    onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                  <label>Contraseña</label>
                  <input
                    required
                    autoComplete='off'
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
                    autoComplete='off'
                    placeholder='Seleccione su empresa'
                    name='id_empresa'
                    options={opcionesEmpresas}
                    value={values.id_empresa}
                    onChange={(event, data) => setFieldValue('id_empresa', data.value)} />
                </Form.Field>

                {
                  status &&
                  status.mensaje &&
                  <Message negative={status.error}>{status.mensaje}</Message>
                }

                <Segment vertical textAlign='right'>
                  <span>No tienes una cuenta? </span>
                  <Link href='/registrar-usuario'>
                    <a>Registrar cuenta</a>
                  </Link>
                </Segment>

                <Segment vertical textAlign='right'>
                  <Button color='google plus' type='submit'>Iniciar Sesión</Button>
                </Segment>
              </Form>
            )}
          </Formik>
        </Segmento>
      </Container>
    );
  }
}

export default PaginaLogin;
