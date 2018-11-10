import './../styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { Menu, Container, Header, Segment, Dropdown } from 'semantic-ui-react';
import Logo from './../components/Logo';

const Main = ({ router, children, usuario }) => {
  return (
    <Container>
      <nav className='menu-principal'>
        <Menu secondary size='large'>
          <Menu.Item>
            <Header as='h3'>
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
            <Dropdown item icon='user circle' text={usuario.nombre_usuario}>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <a title={usuario.nombre_usuario} href='/api/usuarios/logout'>
                    Cerrar Sesión
                  </a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </nav>

      <main>
        <Segment stacked padded color='blue' className='contenedor-principal'>
          {children}
        </Segment>
      </main>
    </Container>
  );
};

Main.propTypes = {
  router: PropTypes.object,
  children: PropTypes.node,
  usuario: PropTypes.object
};

export default withRouter(Main);
