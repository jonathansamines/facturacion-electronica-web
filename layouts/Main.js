import './../styles.scss';

import React from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Icon, Menu, Container, Header, Segment } from 'semantic-ui-react';
import Logo from './../components/Logo';

const Main = ({ router, children, usuario }) => {
  return (
    <Container>
      <nav className='menu-principal'>
        <Menu secondary stackable size='large'>
          <Menu.Item>
            <Header as='h2'>
              <Logo as='a' size='massive' href='/' />
              <Header.Content>
                {usuario.empresa.nombre_comercial}
                <Header.Subheader>
                  <strong>NIT: </strong>
                  <span>{usuario.empresa.nit}</span>
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item active={router.pathname === '/'}>
              <Link href='/'><a title='Facturas'>Facturas</a></Link>
            </Menu.Item>
            <Menu.Item active={router.pathname === '/nueva-factura'}>
              <Link href='/nueva-factura'><a title='Nueva Factura'>Nueva Factura</a></Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/cerrar-sesion'>
                <a title={usuario.nombre_usuario}>
                  <Icon name='user circle' />
                  {usuario.nombre_usuario}
                </a>
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </nav>

      <main>
        <Segment stacked color='red'>
          {children}
        </Segment>
      </main>
    </Container>
  );
};

export default withRouter(Main);
