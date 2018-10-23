import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { validarCUI, validarNIT } from './../../lib/validaciones';
import { esquemaValidacion, FormularioCliente } from './Formulario';
import { obtenerDepartamentos, editarCliente } from '../../lib/servicio-api';

class EditarCliente extends React.Component {
  state = {
    departamentos: [],
  }

  componentDidMount() {
    return obtenerDepartamentos()
      .then((departamentos) => {
        this.setState({ departamentos });
      });
  }

  editarCliente = (values, actions) => {
    const cliente = {
      nit: values.nit,
      cui: values.cui,
      id_municipio: values.id_municipio,
      nombre: values.nombre,
      apellido: values.apellido,
      direccion: values.direccion,
    };

    // validaciones locales
    const resultadoValidacionCUI = validarCUI(cliente.cui);
    if (resultadoValidacionCUI.error) {
      actions.setSubmitting(false);

      return actions.setErrors({
        cui: resultadoValidacionCUI.error
      });
    }

    if (!validarNIT(cliente.nit)) {
      actions.setSubmitting(false);

      return actions.setErrors({
        nit: 'El número de identificación tributaria es inválido',
      });
    }

    return editarCliente({ cliente, idCliente: this.props.cliente.id_cliente })
      .then((clienteEditado) => {
        actions.setStatus({
          mensaje: 'Cliente actualizado correctamente',
          error: false,
        });

        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
          this.props.onClienteEditado(clienteEditado);
        }, 1000);
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al actualizar el cliente. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { departamentos } = this.state;
    const { onCancelar, cliente } = this.props;
    const departamentoCliente = (
      departamentos.find((d) => d.municipios.find(m => m.id_municipio === cliente.id_municipio)) || {}
    ).id_departamento;

    return (
      <Modal defaultOpen={true} size='small' onClose={onCancelar}>
        <Modal.Header>Editar cliente</Modal.Header>
        <Formik
          enableReinitialize={true}
          isInitialValid={true}
          initialValues={{
            nit: cliente.nit,
            cui: cliente.cui,
            id_municipio: cliente.id_municipio,
            id_departamento: departamentoCliente,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            direccion: cliente.direccion,
          }}
          validationSchema={esquemaValidacion}
          onSubmit={this.editarCliente}>
          {(props) => (
            <>
              <Modal.Content>
                <FormularioCliente departamentos={departamentos} {...props} />
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={onCancelar}>
                  Cancelar
                </Button>
                <Button
                  color='google plus'
                  type='submit'
                  loading={props.isSubmitting}
                  disabled={!props.isValid}
                  form='formulario-cliente'>
                  Actualizar
                </Button>
              </Modal.Actions>
            </>
          )}
        </Formik>
      </Modal>
    );
  }
}

EditarCliente.propTypes = {
  cliente: PropTypes.object.isRequired,
  onClienteEditado: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default EditarCliente;
