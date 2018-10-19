import React from 'react';
import debounce from 'lodash/debounce';
import { Formik } from 'formik';
import { Form, Segment, Select } from 'semantic-ui-react';
import NuevoCliente from './NuevoCliente';
import servicio from './../../lib/servicio-api';

class SeleccionCliente extends React.Component {
  state = {
    busqueda: '',
    clientes: [],
    creando: false,
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

  crearCliente = (event, { value }) => {
    this.setState({ creando: true });
  }

  cancelarCreacion = () => {
    this.setState({ creando: false });
  }

  seleccionarCliente = (values, actions) => {
    const cliente = this.state.clientes.find((cliente) => cliente.id_cliente === values.id_cliente);

    return this.props.onClienteSeleccionado(cliente);
  }

  render() {
    const opcionesClientes = this.state.clientes.map((cliente) => ({
      key: cliente.id_cliente,
      value: cliente.id_cliente,
      text: `${cliente.nombre} ${cliente.apellido} (${cliente.nit})`
    }));

    return (
      <Segment vertical>
        {
          this.state.creando &&
          <NuevoCliente
            onCancelar={this.cancelarCreacion} />
        }

        <Formik
          initialValues={({
            id_cliente: null
          })}
          onSubmit={this.seleccionarCliente}>
          {({ setFieldValue, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Field required>
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
              </Form>
          )}
        </Formik>
      </Segment>
    );
  }
}

export default SeleccionCliente;
