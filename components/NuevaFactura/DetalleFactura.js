import React from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

const DetalleFactura = () => (
  <Table striped basic='very'>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Código</Table.HeaderCell>
        <Table.HeaderCell>Descripción</Table.HeaderCell>
        <Table.HeaderCell>Cantidad</Table.HeaderCell>
        <Table.HeaderCell>Costo Unitario (Q)</Table.HeaderCell>
        <Table.HeaderCell>Impuestos (Q)</Table.HeaderCell>
        <Table.HeaderCell>Costo Total (Q)</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>001</Table.Cell>
        <Table.Cell>El producto</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>50.00</Table.Cell>
        <Table.Cell>5.00</Table.Cell>
        <Table.Cell>55.00</Table.Cell>
        <Table.Cell>
          <a>Impuestos</a>
          <a>Eliminar</a>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>001</Table.Cell>
        <Table.Cell>El producto</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>50.00</Table.Cell>
        <Table.Cell>5.00</Table.Cell>
        <Table.Cell>55.00</Table.Cell>
        <Table.Cell>
          <a>Impuestos</a>
          <a>Eliminar</a>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>001</Table.Cell>
        <Table.Cell>El producto</Table.Cell>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>50.00</Table.Cell>
        <Table.Cell>5.00</Table.Cell>
        <Table.Cell>55.00</Table.Cell>
        <Table.Cell>
          <a>Impuestos</a>
          <a>Eliminar</a>
        </Table.Cell>
      </Table.Row>
    </Table.Body>

    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='7'>
          3000.00
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
);

export default DetalleFactura
