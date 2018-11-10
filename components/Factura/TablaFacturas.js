import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

const TablaFacturas = ({ facturas }) => (
  <Table striped basic='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Fecha de Generación</Table.HeaderCell>
        <Table.HeaderCell>Cliente</Table.HeaderCell>
        <Table.HeaderCell>Vendedor</Table.HeaderCell>
        <Table.HeaderCell>Tipo documento</Table.HeaderCell>
        <Table.HeaderCell>Moneda</Table.HeaderCell>
        <Table.HeaderCell>Total</Table.HeaderCell>
        <Table.HeaderCell>DTE</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        facturas.length === 0 &&
        <Table.Row>
          <Table.Cell colSpan='6'>No se encontraron facturas con el criterio seleccionado</Table.Cell>
        </Table.Row>
      }

      {
        facturas.map((factura) => (
          <Table.Row key={factura.id_factura}>
            <Table.Cell>{factura.fecha_emision}</Table.Cell>
            <Table.Cell>{factura.id_cliente}</Table.Cell>
            <Table.Cell>{factura.id_vendedor}</Table.Cell>
            <Table.Cell>{factura.id_tipo_documento}</Table.Cell>
            <Table.Cell>{factura.id_moneda}</Table.Cell>
            <Table.Cell>{factura.total}</Table.Cell>
            <Table.Cell>
              <a target='_blank' rel='noopener noreferrer' href={`/api/facturas/dte/${factura.id_factura}`}>Ver DTE</a>
            </Table.Cell>
          </Table.Row>
        ))
      }
    </Table.Body>
  </Table>
);

TablaFacturas.propTypes = {
  facturas: PropTypes.array
};

export default TablaFacturas;
