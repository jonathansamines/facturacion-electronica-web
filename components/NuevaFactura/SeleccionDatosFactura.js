import React from 'react';
import debounce from 'lodash/debounce';
import { Formik } from 'formik';
import { Form, Select, Button } from 'semantic-ui-react';
import NuevoCliente from './NuevoCliente';
import NuevoVendedor from './NuevoVendedor';
import { buscarCliente, buscarVendedor } from './../../lib/servicio-api';

class SeleccionCliente extends React.Component {
  state = {
    clientes: [],
    vendedores: [],
    nuevoVendedor: null,
    nuevoCliente: null,
  }

  buscarCliente = debounce((event, data) => {
    const busqueda = data.searchQuery;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarCliente({ busqueda })
        .then((clientes) => {
          this.setState({ clientes });
        });
    }
  }, 200)

  buscarVendedor = debounce((event, data) => {
    const busqueda = data.searchQuery;

    if (busqueda !== undefined && busqueda.length > 0) {
      return buscarVendedor({ busqueda })
        .then((vendedores) => {
          this.setState({ vendedores });
        });
    }
  }, 200)

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

    const opcionesClientes = clientes.map((cliente) => ({
      key: cliente.id_cliente,
      value: cliente.id_cliente,
      text: `${cliente.nombre} ${cliente.apellido} (${cliente.nit})`
    }));

    const opcionesVendedores = vendedores.map((vendedor) => ({
      key: vendedor.id_vendedor,
      value: vendedor.id_vendedor,
      text: `${vendedor.nombre} ${vendedor.apellido} (${vendedor.nit})`
    }));

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
                  <Select
                    search
                    allowAdditions
                    additionLabel='Crear nuevo cliente: '
                    name='id_cliente'
                    placeholder='Nombre, CF o NIT (un nit valido)'
                    noResultsMessage='Cliente no encontrado'
                    options={opcionesClientes}
                    value={values.id_cliente}
                    onAddItem={this.crearCliente}
                    onSearchChange={this.buscarCliente}
                    onChange={(event, data) => setFieldValue('id_cliente', data.value)} />
                </Form.Field>
                <Form.Field width='6'>
                  <label>Vendedor</label>
                  <Select
                    search
                    allowAdditions
                    additionLabel='Crear nuevo vendedor: '
                    name='id_vendedor'
                    placeholder='Nombre, CF o NIT (un nit valido)'
                    noResultsMessage='Vendedor no encontrado'
                    options={opcionesVendedores}
                    value={values.id_vendedor}
                    onAddItem={this.crearVendedor}
                    onSearchChange={this.buscarVendedor}
                    onChange={(event, data) => setFieldValue('id_vendedor', data.value)} />
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

export default SeleccionCliente;
