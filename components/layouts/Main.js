import './../../styles.scss';

import React from 'react';
import Link from 'next/link';
import { Menu, Container, Header } from 'semantic-ui-react';

const style = {
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  }
}

const Main = ({ children }) => (
  <Container>
    <Menu stackable>
      <Menu.Item>
        <Header as='h3' content='Facturacion electrónica' style={style.h3} textAlign='center' />
        <img src='/static/images/logo.png' />
      </Menu.Item>
      <Menu.Item>
        <Link href='/'><a title='Facturas'>Facturas</a></Link>
      </Menu.Item>
      <Menu.Item>
        <Link href='/nueva-factura'><a title='Nueva Factura'>Nueva Factura</a></Link>
      </Menu.Item>
      <Menu.Item>
        <Link href='/cerrar-sesion'><a title='Lucas Manita'>Lucas Manita</a></Link>
      </Menu.Item>
    </Menu>
    {children}
  </Container>
);

export default Main;
