import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import Logo from '../Logo';

const EncabezadoSegmento = ({ titulo }) => (
  <>
    <Header
      as='h3'
      content={
        <>
          <Logo as='a' size='big' href='/' centered inline /> {titulo}
        </>
      } />
    <Divider />
  </>
);

export default EncabezadoSegmento;
