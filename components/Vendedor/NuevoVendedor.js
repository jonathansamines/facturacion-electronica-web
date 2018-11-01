import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { crearVendedor } from '../../lib/servicio-api';
import { validarCUI, validarNIT } from './../../lib/validaciones';
import { esquemaValidacion, FormularioVendedor } from './Formulario';

class NuevoVendedor extends React.Component {
  crearVendedor = (values, actions) => {
    // validaciones locales
    if (!validarNIT(values.nit)) {
      actions.setSubmitting(false);

      return actions.setErrors({
        nit: 'El número de identificación tributaria es inválido',
      });
    }

    const resultadoValidacionCUI = validarCUI(values.cui);
    if (resultadoValidacionCUI.error) {
      actions.setSubmitting(false);

      return actions.setErrors({
        cui: resultadoValidacionCUI.error
      });
    }

    return crearVendedor({ vendedor: values })
      .then((nuevoVendedor) => {
        actions.setStatus({
          mensaje: 'Vendedor creado correctamente',
          error: false,
        });

        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
          this.props.onVendedorCreado(nuevoVendedor)
        }, 1500);
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al crear el vendedor. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, nombreVendedor, sucursales } = this.props;

    return (
      <Modal open={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Nuevo vendedor</Modal.Header>
        <Formik
          validationSchema={esquemaValidacion}
          initialValues={({
            cui: '',
            nit: '',
            nombre: nombreVendedor,
            apellido: '',
            id_sucursal: null,
          })}
          onSubmit={this.crearVendedor}>
          {(props) => (
            <>
              <Modal.Content>
                <FormularioVendedor sucursales={sucursales} {...props} />
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
                  form='formulario-vendedor'>
                  Guardar
                </Button>
              </Modal.Actions>
            </>
          )}
        </Formik>
      </Modal>
    );
  }
}

NuevoVendedor.propTypes = {
  nombreVendedor: PropTypes.string.isRequired,
  sucursales: PropTypes.array,
  onCancelar: PropTypes.func.isRequired,
  onVendedorCreado: PropTypes.func.isRequired,
};

export default NuevoVendedor;
