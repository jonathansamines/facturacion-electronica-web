import React from 'react';
import PropTypes from 'prop-types';
import Propiedad from '../Propiedad';
import { List } from 'semantic-ui-react';

const DatosFactura = ({ opciones }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Tipo de Documento: </List.Header>
      <Propiedad valor={opciones} propiedad='tipoDocumento.descripcion' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Moneda: </List.Header>
      <Propiedad valor={opciones} propiedad='moneda.descripcion' />
      <Propiedad valor={opciones} propiedad='moneda.id_moneda' fallback='' render={(valor) => ` (${valor})`} />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Sucursal: </List.Header>
      <Propiedad valor={opciones} propiedad='sucursal.descripcion' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Exportacion: </List.Header>
      <Propiedad valor={opciones} propiedad='exportacion' render={(valor) => valor ? 'Si' : 'No' } />
    </List.Item>
  </List>
);

DatosFactura.propTypes = {
  opciones: PropTypes.object,
};

export default DatosFactura;
