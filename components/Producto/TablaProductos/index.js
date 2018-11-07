import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';
import Articulo from './Articulo';
import Tabla from './Tabla';

class TablaProductos extends React.Component {
  actualizarImpuestoProducto = ({ producto, unidades, descuento, unidadesGravables }) => {
    const { productos, onProductosModificados } = this.props;

    const nuevosProductos = productos.map((prod) => {
      if (prod.producto.id_producto === producto.id_producto) {
        return {
          producto,
          unidades,
          descuento,
          unidadesGravables,
        };
      }

      return prod;
    });

    onProductosModificados(nuevosProductos);
  }

  eliminarProducto = (producto) => {
    const { productos, onProductosModificados } = this.props;

    const nuevosProductos = productos.filter((prod) => prod.producto.id_producto !== producto.id_producto);

    onProductosModificados(nuevosProductos);
  }

  renderNoProductos = () => (
    <Table.Row>
      <Table.Cell colSpan='12'>No se han agregado productos a la factura.</Table.Cell>
    </Table.Row>
  )

  renderProducto = (attrs) => {
    const { moneda, tipoCambio, tipoDocumento, exportacion } = this.props;
    const {
      producto,
      unidades,
      descuento,
      unidadesGravables,
      montoGravable,
      impuestos,
      precioUnitario,
    } = attrs;

    return (
      <Articulo
        key={producto.id_producto}
        moneda={moneda}
        producto={producto}
        precioUnitario={precioUnitario}
        unidades={unidades}
        tipoCambio={tipoCambio}
        descuento={descuento}
        tipoDocumento={tipoDocumento}
        exportacion={exportacion}
        impuestos={impuestos}
        montoGravable={montoGravable}
        unidadesGravables={unidadesGravables}
        onEliminar={this.eliminarProducto}
        onImpuestoModificado={this.actualizarImpuestoProducto} />
    );
  }

  renderResumen = ({ totalUnidades, totalDescuento, totalImpuestos, totalMontoGravable }) => {
    const { moneda } = this.props;

    return (
      <Table.Row>
        <Table.HeaderCell colSpan='3' />
        <Table.HeaderCell colSpan='4'>
          <FormattedNumber style='decimal' value={totalUnidades} />
        </Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>
          <FormattedNumber style='currency' value={totalDescuento} currency={moneda.id_moneda} />
        </Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>
          <FormattedNumber style='currency' value={totalMontoGravable} currency={moneda.id_moneda} />
        </Table.HeaderCell>
        <Table.HeaderCell colSpan='1'>
          <FormattedNumber style='currency' value={totalImpuestos} currency={moneda.id_moneda} />
        </Table.HeaderCell>
        <Table.HeaderCell colSpan='4' textAlign='right'>
          <FormattedNumber style='currency' value={totalMontoGravable + totalImpuestos} currency={moneda.id_moneda}>
            {(formatted) => <strong>{formatted}</strong>}
          </FormattedNumber>
        </Table.HeaderCell>
      </Table.Row>
    );
  }

  render() {
    const { moneda, tipoCambio, productos } = this.props;

    return (
      <Table striped basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Código</Table.HeaderCell>
            <Table.HeaderCell>Tipo</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Unidad</Table.HeaderCell>
            <Table.HeaderCell>Precio Unitario</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Descuento</Table.HeaderCell>
            <Table.HeaderCell>Monto Gravable</Table.HeaderCell>
            <Table.HeaderCell>Impuestos</Table.HeaderCell>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Tabla
          moneda={moneda}
          tipoCambio={tipoCambio}
          productos={productos}
          noProductosRenderer={this.renderNoProductos}
          productoRenderer={this.renderProducto}
          resumenRenderer={this.renderResumen} />
      </Table>
    );
  }
}

TablaProductos.propTypes = {
  exportacion: PropTypes.bool.isRequired,
  moneda: PropTypes.object.isRequired,
  productos: PropTypes.array.isRequired,
  tipoCambio: PropTypes.object.isRequired,
  tipoDocumento: PropTypes.object,
  onProductosModificados: PropTypes.func.isRequired
};

export default TablaProductos;
