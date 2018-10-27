import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import pProps from 'p-props';
import * as Yup from 'yup';
import { Button, Modal, Form, Message, Input, TextArea } from 'semantic-ui-react';
import SelectorMoneda from '../SelectorMoneda';
import SelectorUnidadMedida from './SelectorUnidadMedida';
import SelectorTipoProducto from './SelectorTipoProducto';
import { crearProducto, obtenerTiposProducto, obtenerUnidadesMedida, obtenerMonedas } from '../../lib/servicio-api';

class NuevoProducto extends React.Component {
  state = {
    monedas: [],
    tiposProducto: [],
    unidadesMedida: []
  }

  componentDidMount() {
    return pProps({
      monedas: obtenerMonedas(),
      tipos_producto: obtenerTiposProducto({ tipoDocumento: this.props.tipoDocumento.id_tipo_documento }),
      unidades_medida: obtenerUnidadesMedida(),
    })
    .then(({ tipos_producto, unidades_medida, monedas }) => {
      this.setState({
        monedas,
        tiposProducto: tipos_producto,
        unidadesMedida: unidades_medida
      });
    });
  }

  crearProducto = (values, actions) => {
    return crearProducto({ producto: values })
      .then((nuevoProducto) => {
        actions.setStatus({
          mensaje: 'Producto creado correctamente',
          error: false,
        });

        setTimeout(() => {
          actions.resetForm();
          actions.setSubmitting(false);
          this.props.onProductoCreado(nuevoProducto)
        }, 1000);
      })
      .catch(() => {
        actions.setSubmitting(false);
        actions.setStatus({
          mensaje: 'Hubo un error al crear el producto. Vuelva a intentarlo',
          error: true,
        });
      });
  }

  render () {
    const { onCancelar, nombreProducto } = this.props;
    const { monedas, tiposProducto, unidadesMedida } = this.state;

    return (
      <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Nuevo Producto</Modal.Header>
        <Formik
          validationSchema={
            Yup.object().shape({
              nombre: Yup.string().required('El nombre del producto es obligatorio'),
              descripcion: Yup.string().required('La descripción del producto es obligatoria'),
              marca: Yup.string().required('La marca es obligatoria'),
              precio: Yup.number().required('El precio es obligatorio'),
              id_moneda: Yup.string().required(),
              id_tipo_producto: Yup.number().required(),
              id_unidad_medida: Yup.string().required()
            })
          }
          initialValues={({
            precio: 0,
            marca: '',
            nombre: nombreProducto,
            descripcion: '',
            id_moneda: null,
            id_unidad_medida: null,
            id_tipo_producto: null,
          })}
          onSubmit={this.crearProducto}>
          {({ isValid, isSubmitting, values, errors, status, handleChange, setFieldValue, handleSubmit }) => {
            return (
              <>
                <Modal.Content>
                  <Form
                    id='creacion-producto'
                    loading={isSubmitting}
                    error={!isValid || (status && status.error)}
                    success={isValid || !(status && status.error)}
                    onSubmit={handleSubmit}>
                    <Form.Field required error={Boolean(errors.nombre)}>
                      <label>Producto o servicio</label>
                      <Input
                        name='nombre'
                        placeholder='Nombre del producto o servicio'
                        value={values.nombre}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field required error={Boolean(errors.descripcion)}>
                      <label>Producto o servicio</label>
                      <TextArea
                        name='descripcion'
                        placeholder='Descripción del producto o servicio'
                        value={values.descripcion}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Group widths='equal'>
                      <Form.Field required error={Boolean(errors.marca)}>
                        <label>Marca</label>
                        <Input
                          name='marca'
                          placeholder='Nombre de la marca'
                          value={values.marca}
                          onChange={handleChange} />
                      </Form.Field>
                      <Form.Field required error={Boolean(errors.precio)}>
                        <label>Precio</label>
                        <Input
                          name='precio'
                          type='number'
                          min={0}
                          step={0.00000}
                          placeholder='Precio'
                          value={values.precio}
                          onChange={handleChange} />
                      </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Field required>
                        <label>Moneda</label>
                        <SelectorMoneda
                          name='id_moneda'
                          monedas={monedas}
                          monedaSeleccionada={values.id_moneda}
                          onSeleccion={(event, data) => setFieldValue('id_moneda', data.value)} />
                      </Form.Field>
                      <Form.Field required>
                        <label>Tipo de Producto</label>
                        <SelectorTipoProducto
                          name='id_tipo_producto'
                          tiposProducto={tiposProducto}
                          tipoProductoSeleccionado={values.id_tipo_producto}
                          onSeleccion={(event, data) => setFieldValue('id_tipo_producto', data.value)} />
                      </Form.Field>
                    </Form.Group>

                    <Form.Field required>
                      <label>Unidad de Medida</label>
                      <SelectorUnidadMedida
                        name='id_unidad_medida'
                        unidadesMedida={unidadesMedida}
                        unidadMedidaSeleccionada={values.id_unidad_medida}
                        onSeleccion={(event, data) => setFieldValue('id_unidad_medida', data.value)} />
                    </Form.Field>
                    {
                      status &&
                      status.mensaje &&
                      <Message success={!status.error} error={status.error} content={status.mensaje} />
                    }
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={onCancelar}>
                    Cancelar
                  </Button>
                  <Button
                    color='google plus'
                    type='submit'
                    loading={isSubmitting}
                    disabled={!isValid}
                    form='creacion-producto'>
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

NuevoProducto.propTypes = {
  nombreProducto: PropTypes.string.isRequired,
  tipoDocumento: PropTypes.object.isRequired,
  onCancelar: PropTypes.func.isRequired,
  onProductoCreado: PropTypes.func.isRequired,
};

export default NuevoProducto;
