import React from 'react';
import { Table } from 'semantic-ui-react';

const TablaFacturas = () => (
  <Table striped basic='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Fecha de Generación</Table.HeaderCell>
        <Table.HeaderCell>Fecha de Certificación</Table.HeaderCell>
        <Table.HeaderCell>Cliente</Table.HeaderCell>
        <Table.HeaderCell>Autorización</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan='5'>No se encontraron facturas con el criterio seleccionado</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export default TablaFacturas;
