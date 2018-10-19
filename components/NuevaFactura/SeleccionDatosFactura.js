import React from 'react';
import debounce from 'lodash/debounce';
import { Formik } from 'formik';
import { Form, Select, Button } from 'semantic-ui-react';
import NuevoCliente from './NuevoCliente';
import servicio from './../../lib/servicio-api';

class SeleccionCliente extends React.Component {
  state = {
    busqueda: '',
    clientes: [],
    vendedores: [],
    crearVendedor: false,
    crearCliente: false,
  }

  buscarCliente = debounce((event, data) => {
    const busqueda = data.searchQuery;

    if (busqueda !== undefined && busqueda.length > 0) {
      return servicio
        .get(`/clientes?busqueda=${busqueda}`)
        .then((respuesta) => {
          this.setState({ clientes: respuesta.data })
        });
    }
  }, 200)

  buscarVendedor = debounce((event, data) => {
    const busqueda = data.searchQuery;

    if (busqueda !== undefined && busqueda.length > 0) {
      return servicio
        .get(`/vendedores?busqueda=${busqueda}`)
        .then((respuesta) => {
          this.setState({ vendedores: respuesta.data })
        });
    }
  }, 200)

  crearCliente = (event, { value }) => {
    this.setState({ crearVendedor: true });
  }

  cancelarCreacionCliente = () => {
    this.setState({ crearCliente: false });
  }

  seleccionarInformacion = (values, actions) => {
    const cliente = this.state.clientes.find((cliente) => cliente.id_cliente === values.id_cliente) || null;
    const vendedor = this.state.vendedores.find((vendedor) => vendedor.id_vendedor === values.id_vendedor) || null;

    return this.props.onSeleccion({ cliente, vendedor });
  }

  crearVendedor = () => {
    this.setState({ crearVendedor: true });
  }

  cancelarCreacionVendedor = () => {
    this.setState({ crearVendedor: false });
  }

  render() {
    const { clientes, vendedores } = this.state;

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
          this.state.crearCliente &&
          <NuevoCliente
            onCancelar={this.cancelarCreacionCliente} />
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
