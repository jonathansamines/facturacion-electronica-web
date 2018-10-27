import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';
import ModificarImpuestos from './ModificarImpuestos';

class Articulo extends React.Component {
  state = {
    modificando: false,
  }

  modificarImpuestos = (event) => {
    event.preventDefault();

    this.setState({ modificando: true });
  }

  cancelarModificacionImpuesto = () => {
    this.setState({ modificando: false });
  }

  confirmarModificacionImpuesto = (...args) => {
    this.setState({ modificando: false }, () => {
      this.props.onImpuestoModificado(...args);
    });
  }

  eliminarProducto = (event) => {
    const { onEliminar, producto } = this.props;

    event.preventDefault();

    return onEliminar(producto);
  }

  render() {
    const {
      moneda,
      producto,
      unidades,
      tipoCambio,
      tipoDocumento,
      unidadesGravables,
      subtotalPrecioProducto,
      totalImpuestos,
      totalPrecioProducto,
    } = this.props;

    const { modificando } = this.state;

    return (
      <Table.Row>
        <Table.Cell>{producto.id_producto}</Table.Cell>
        <Table.Cell>{producto.nombre}</Table.Cell>
        <Table.Cell>{producto.descripcion}</Table.Cell>
        <Table.Cell>{unidades}</Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={subtotalPrecioProducto} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={totalImpuestos} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={totalPrecioProducto} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          {
            modificando &&
            <ModificarImpuestos
              producto={producto}
              unidades={unidades}
              moneda={moneda}
              tipoDocumento={tipoDocumento}
              tipoCambio={tipoCambio}
              unidadesGravables={unidadesGravables}
              onCancelar={this.cancelarModificacionImpuesto}
              onConfirmar={this.confirmarModificacionImpuesto} />
          }
          <a className='action-link' href='/' onClick={this.modificarImpuestos}>Impuestos</a>
          <a className='action-link' href='/' onClick={this.eliminarProducto}>Eliminar</a>
        </Table.Cell>
      </Table.Row>
    );
  }
}

Articulo.propTypes = {
  tipoCambio: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  moneda: PropTypes.object.isRequired,
  unidades: PropTypes.number.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  subtotalPrecioProducto: PropTypes.number.isRequired,
  totalImpuestos: PropTypes.number.isRequired,
  totalPrecioProducto: PropTypes.number.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onImpuestoModificado: PropTypes.func.isRequired,
};

export default Articulo;
