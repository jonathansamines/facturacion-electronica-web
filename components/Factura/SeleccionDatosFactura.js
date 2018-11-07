import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { startOfToday } from 'date-fns';
import { Form, Button } from 'semantic-ui-react';
import FechaEmision from './FechaEmision';
import { SelectorCliente, NuevoCliente } from '../Cliente';
import { SelectorVendedor, NuevoVendedor } from '../Vendedor';

const NIT_CONSUMIDOR_FINAL = 'CF';

class SeleccionDatosFactura extends React.Component {
  state = {
    clientes: [],
    vendedores: [],
    nuevoVendedor: null,
    nuevoCliente: null,
  }

  actualizarClientes = ({ clientes }) => {
    if (clientes) {
      this.setState({ clientes });
    }
  }

  actualizarVendedores = ({ vendedores }) => {
    if (vendedores) {
      this.setState({ vendedores });
    }
  }

  crearCliente = (event, { value }) => {
    this.setState({ nuevoCliente: { nombre: value } });
  }

  cancelarCreacionCliente = () => {
    this.setState({ nuevoCliente: null });
  }

  seleccionarInformacion = (values) => {
    const { clientes, vendedores } = this.state;

    const cliente = clientes.find((cliente) => cliente.id_cliente === values.id_cliente) || null;
    const vendedor = vendedores.find((vendedor) => vendedor.id_vendedor === values.id_vendedor) || null;

    return this.props.onSeleccion({ cliente, vendedor });
  }

  agregarCliente = (cliente) => {
    this.setState(({ clientes }) => ({
      nuevoCliente: null,
      clientes: [
        ...clientes,
        cliente
      ]
    }));
  }

  agregarVendedor = (vendedor) => {
    this.setState(({ vendedores }) => ({
      nuevoVendedor: null,
      vendedores: [
        ...vendedores,
        vendedor
      ]
    }));
  }

  generarFactura = () => null;

  crearVendedor = (event, { value }) => {
    this.setState({ nuevoVendedor: { nombre: value } });
  }

  cancelarCreacionVendedor = () => {
    this.setState({ nuevoVendedor: null });
  }

  obtenerClientesDisponibles = (clientes, exportacion, tipoDocumento) => {
    return clientes.filter((cliente) => {
      // En el caso de las exportaciones, el receptor no tiene un NIT y por tanto solo CF es permitido
      if (exportacion) {
        return cliente.nit === NIT_CONSUMIDOR_FINAL;
      }

      // En el caso de las facturas especiales, solo clientes con CUI válidos se permiten y por tanto CF no tiene sentido
      if (tipoDocumento.id_tipo_documento === 'FESP') {
        return cliente.nit !== NIT_CONSUMIDOR_FINAL;
      }

      return true;
    })
  }

  render() {
    const {
      clientes,
      vendedores,
      nuevoCliente,
      nuevoVendedor,
    } = this.state;

    const {
      sucursales,
      exportacion,
      tipoDocumento,
    } = this.props;

    const clientesDisponibles = this.obtenerClientesDisponibles(clientes, exportacion, tipoDocumento);

    return (
      <>
        {
          nuevoCliente &&
          <NuevoCliente
            nombreCliente={nuevoCliente.nombre}
            onClienteCreado={this.agregarCliente}
            onCancelar={this.cancelarCreacionCliente} />
        }

        {
          nuevoVendedor &&
          <NuevoVendedor
            sucursales={sucursales}
            nombreVendedor={nuevoVendedor.nombre}
            onVendedorCreado={this.agregarVendedor}
            onCancelar={this.cancelarCreacionVendedor} />
        }

        <Formik
          validationSchema={
            Yup.object().shape({
              id_cliente: Yup.number().required(),
              id_vendedor: Yup.number().required(),
            })
          }
          initialValues={({
            id_cliente: null,
            id_vendedor: null,
            fecha_factura: startOfToday(new Date()),
          })}
          onSubmit={this.generarFactura}>
          {({ isValid, setFieldValue, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Field width='2'>
                  <label>Fecha Factura</label>
                  <FechaEmision
                    fechaFactura={values.fecha_factura}
                    onSeleccion={(selectedDay) => setFieldValue('fecha_factura', selectedDay)} />
                </Form.Field>
                <Form.Field width='6'>
                  <label>Cliente</label>
                  <SelectorCliente
                    name='id_cliente'
                    clientes={clientesDisponibles}
                    clienteSeleccionado={values.id_cliente}
                    onAgregar={(...args) => {
                      this.crearCliente(...args);
                      setFieldValue('id_cliente', null);
                    }}
                    onBusqueda={this.actualizarClientes}
                    onSeleccion={(event, data) => {
                      setFieldValue('id_cliente', data.value);
                      this.seleccionarInformacion({
                        ...values,
                        id_cliente: data.value
                      });
                    }} />
                </Form.Field>
                <Form.Field width='6'>
                  <label>Vendedor</label>
                  <SelectorVendedor
                    name='id_vendedor'
                    vendedores={vendedores}
                    vendedorSeleccionado={values.id_vendedor}
                    onAgregar={(...args) => {
                      this.crearVendedor(...args);
                      setFieldValue('id_vendedor', null);
                    }}
                    onBusqueda={this.actualizarVendedores}
                    onSeleccion={(event, data) => {
                      setFieldValue('id_vendedor', data.value);
                      this.seleccionarInformacion({
                        ...values,
                        id_vendedor: data.value
                      });
                    }} />
                </Form.Field>
                <Form.Field width='2'>
                  <label>&nbsp;</label>
                  <Button color='blue'  disabled={!isValid} fluid>Facturar</Button>
                </Form.Field>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

SeleccionDatosFactura.propTypes = {
  tipoDocumento: PropTypes.object,
  exportacion: PropTypes.bool,
  hayProductos: PropTypes.bool,
  sucursales: PropTypes.array,
  onSeleccion: PropTypes.func.isRequired
};

export default SeleccionDatosFactura;
