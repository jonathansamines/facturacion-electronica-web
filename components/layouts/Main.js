import './../../styles.scss';

import React from 'react';
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
        <img src='/logo.png' />
      </Menu.Item>
      <Menu.Item>Features</Menu.Item>
      <Menu.Item>Testimonials</Menu.Item>
      <Menu.Item>Sign-in</Menu.Item>
    </Menu>
  </Container>
);

export default Main;
