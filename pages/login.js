import './../styles.scss';

import React from 'react';
import { Container } from 'semantic-ui-react';
import InicioSesion from '../components/InicioSesion';

class PaginaLogin extends React.Component {
  iniciarSesion = async (credenciales) => {

  }

  render() {
    return (
      <Container className='pagina-login'>
        <InicioSesion onSubmit={this.iniciarSesion} />
      </Container>
    );
  }
}

export default PaginaLogin;
