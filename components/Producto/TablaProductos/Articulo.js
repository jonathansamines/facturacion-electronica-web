import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { FormattedNumber } from 'react-intl';
import ModificarImpuestos from './ModificarImpuestos';

const categorias = {
  B: 'Bien',
  S : 'Servicio'
};

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
      descuento,
      unidades,
      tipoCambio,
      exportacion,
      tipoDocumento,
      unidadesGravables,
      montoGravable,
      impuestos,
    } = this.props;

    const { modificando } = this.state;

    return (
      <Table.Row>
        <Table.Cell>{producto.id_producto}</Table.Cell>
        <Table.Cell>{categorias[producto.tipo_producto.categoria] || 'Desconocido'}</Table.Cell>
        <Table.Cell>{producto.nombre}</Table.Cell>
        <Table.Cell>{unidades}</Table.Cell>
        <Table.Cell>{producto.unidad_medida.descripcion}</Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={producto.precio} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={producto.precio * unidades} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={descuento} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={montoGravable} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={impuestos} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          <FormattedNumber style='currency' value={montoGravable + impuestos} currency={moneda.id_moneda} />
        </Table.Cell>
        <Table.Cell>
          {
            modificando &&
            <ModificarImpuestos
              producto={producto}
              unidades={unidades}
              moneda={moneda}
              descuento={descuento}
              exportacion={exportacion}
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
  exportacion: PropTypes.bool.isRequired,
  unidades: PropTypes.number.isRequired,
  tipoDocumento: PropTypes.object,
  unidadesGravables: PropTypes.array.isRequired,
  descuento: PropTypes.number.isRequired,
  impuestos: PropTypes.number.isRequired,
  montoGravable: PropTypes.number.isRequired,
  onEliminar: PropTypes.func.isRequired,
  onImpuestoModificado: PropTypes.func.isRequired,
};

export default Articulo;
