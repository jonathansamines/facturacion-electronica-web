import React from 'react';
import Head from 'next/head';
import Main from './../components/layouts/Main';
import { obtenerUsuarioLogueado } from './../lib/servicio-api'

class App extends React.Component {
  static async getInitialProps({ req }) {
    return {
      usuario: await obtenerUsuarioLogueado({ req })
    };
  }

  render() {
    return (
      <>
        <Head>
          <title>Factura</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Main usuario={this.props.usuario}>
          Hello to the world
        </Main>
      </>
    );
  }
}

export default App;
