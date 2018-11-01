import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
import { editarVendedor } from '../../lib/servicio-api';
import { validarCUI, validarNIT } from './../../lib/validaciones';
import { esquemaValidacion, FormularioVendedor } from './Formulario';

class EditarVendedor extends React.Component {
  editarVendedor = (values, actions) => {
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

    return editarVendedor({ vendedor: values, idVendedor: this.props.vendedor.id_vendedor })
      .then((vendedorEditado) => {
        actions.setStatus({
          mensaje: 'Vendedor actualizado correctamente',
          error: false,
        });

        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
          this.props.onVendedorEditado(vendedorEditado)
        }, 1000);
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al actualizar el vendedor. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, vendedor, sucursales } = this.props;

    return (
      <Modal open={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Editar vendedor</Modal.Header>
        <Formik
          isInitialValid={true}
          enableReinitialize={true}
          validationSchema={esquemaValidacion}
          initialValues={({
            cui: vendedor.cui,
            nit: vendedor.nit,
            nombre: vendedor.nombre,
            apellido: vendedor.apellido,
            id_sucursal: vendedor.id_sucursal,
          })}
          onSubmit={this.editarVendedor}>
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

EditarVendedor.propTypes = {
  vendedor: PropTypes.object.isRequired,
  sucursales: PropTypes.array,
  onCancelar: PropTypes.func.isRequired,
  onVendedorEditado: PropTypes.func.isRequired,
};

export default EditarVendedor;
