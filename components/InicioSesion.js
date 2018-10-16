import React from 'react';
import Logo from './Logo';
import { Divider, Segment, Button, Header, Form } from 'semantic-ui-react';

const LoginTitle = () => (
  <>
    <Logo as='a' size='big' href='/' centered inline /> Iniciar Sesión
  </>
);

class InicioSesion extends React.Component {
  state = {
    usuario: '',
    password: ''
  }

  submit = (event) => {
    event.preventDefault();

    return this.props.onSubmit({
      usuario: this.state.usaurio,
      password: this.state.password
    });
  }

  actualizarUsuario = (event) => this.setState({ usuario: event.target.value });
  actualizarPassword = (event) => this.setState({ password: event.target.value });

  render() {
    return (
      <Segment
        stacked
        compact
        size='large'
        color='blue'
        className='inicio-sesion'>
          <Header
            as='h3'
            content={<LoginTitle />} />
          <Divider />

          <Form onSubmit={this.submit}>
            <Form.Field>
              <label>Nombre Usuario</label>
              <input
                required
                name='usuario'
                placeholder='Nombre de usuario o correo electrónico'
                value={this.state.usuario}
                onChange={this.actualizarUsuario} />
            </Form.Field>
            <Form.Field>
              <label>Contraseña</label>
              <input
                required
                name='password'
                type='password'
                placeholder='Contraseña'
                value={this.state.password}
                onChange={this.actualizarPassword} />
            </Form.Field>
            <Button basic color='blue' type='submit'>Iniciar Sesión</Button>
          </Form>
      </Segment>
    );
  }
}

export default InicioSesion;
