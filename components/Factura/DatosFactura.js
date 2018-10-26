import React from 'react';
import PropTypes from 'prop-types';
import Propiedad from '../Propiedad';
import { List } from 'semantic-ui-react';

const DatosFactura = ({ tipoCambio, opciones }) => (
  <List relaxed size='medium'>
    <List.Item>
      <List.Header as='strong'>Tipo de Documento: </List.Header>
      <Propiedad valor={opciones} propiedad='tipoDocumento.descripcion' />
    </List.Item>
    <List.Item>
      <List.Header as='strong'>Moneda: </List.Header>
      <Propiedad valor={opciones} propiedad='moneda.descripcion' /> &nbsp;
      <Propiedad
        valor={opciones}
        propiedad='moneda.id_moneda'
        fallback=''
        render={(moneda) => {
          const tasaCambio = tipoCambio.tasa_cambio.find((t) => t.origen === moneda);

          if (tasaCambio === undefined) {
            return null;
          }

          return (
            <strong>
              (1 {moneda} = {tasaCambio.valor} {tasaCambio.destino})
            </strong>
          );
        }} />
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
  tipoCambio: PropTypes.object.isRequired,
  opciones: PropTypes.object,
};

export default DatosFactura;
