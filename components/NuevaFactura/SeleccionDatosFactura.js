import React from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'semantic-ui-react';
import { SelectorCliente, NuevoCliente } from '../Cliente';
import { SelectorVendedor, NuevoVendedor } from '../Vendedor';

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

  seleccionarInformacion = (values, actions) => {
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

  crearVendedor = (event, { value }) => {
    this.setState({ nuevoVendedor: { nombre: value } });
  }

  cancelarCreacionVendedor = () => {
    this.setState({ nuevoVendedor: null });
  }

  render() {
    const {
      clientes,
      vendedores,
      nuevoCliente,
      nuevoVendedor,
    } = this.state;

    const { sucursales } = this.props;

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
          initialValues={({
            id_cliente: null,
            id_vendedor: null
          })}
          onSubmit={this.seleccionarInformacion}>
          {({ setFieldValue, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group inline>
                <Form.Field width='6'>
                  <label>Cliente</label>
                  <SelectorCliente
                    name='id_cliente'
                    clientes={clientes}
                    clienteSeleccionado={values.id_cliente}
                    onAgregar={this.crearCliente}
                    onBusqueda={this.actualizarClientes}
                    onSeleccion={(event, data) => setFieldValue('id_cliente', data.value)} />
                </Form.Field>
                <Form.Field width='6'>
                  <label>Vendedor</label>
                  <SelectorVendedor
                    name='id_vendedor'
                    vendedores={vendedores}
                    vendedorSeleccionado={values.id_vendedor}
                    onAgregar={this.crearVendedor}
                    onBusqueda={this.actualizarVendedores}
                    onSeleccion={(event, data) => setFieldValue('id_vendedor', data.value)} />
                </Form.Field>
                <Form.Field width='4'>
                  <Button color='google plus'>Generar Factura</Button>
                </Form.Field>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default SeleccionDatosFactura;
