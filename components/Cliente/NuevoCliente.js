import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { validarCUI, validarNIT } from './../../lib/validaciones';
import { esquemaValidacion, FormularioCliente } from './Formulario';
import { obtenerDepartamentos, crearCliente } from '../../lib/servicio-api';

class NuevoCliente extends React.Component {
  state = {
    departamentos: [],
  }

  componentDidMount() {
    return obtenerDepartamentos()
      .then((departamentos) => {
        this.setState({ departamentos });
      });
  }

  crearCliente = (values, actions) => {
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

    return crearCliente({ cliente })
      .then((nuevoCliente) => {
        actions.setStatus({
          mensaje: 'Cliente creado correctamente',
          error: false,
        });

        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
          this.props.onClienteCreado(nuevoCliente);
        }, 1000);
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al crear el cliente. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, nombreCliente } = this.props;
    const { departamentos } = this.state;

    return (
      <Modal defaultOpen={true} size='small' onClose={onCancelar}>
        <Modal.Header>Nuevo cliente</Modal.Header>
        <Formik
          validationSchema={esquemaValidacion}
          initialValues={({
            cui: '',
            nit: '',
            nombre: nombreCliente,
            apellido: '',
            direccion: '',
            id_departamento: null,
            id_municipio: null,
          })}
          onSubmit={this.crearCliente}>
          {(props) => {
            return (
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
                    Guardar
                  </Button>
                </Modal.Actions>
              </>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}

NuevoCliente.propTypes = {
  nombreCliente: PropTypes.string.isRequired,
  onClienteCreado: PropTypes.func.isRequired,
  onCancelar: PropTypes.func.isRequired,
};

export default NuevoCliente;
