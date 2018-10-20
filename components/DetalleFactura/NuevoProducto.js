import React from 'react';
import { Formik } from 'formik';
import pProps from 'p-props';
import { Button, Modal, Form, Message, Input } from 'semantic-ui-react';
import SelectorMoneda from './../SelectorMoneda';
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
      tipos_producto: obtenerTiposProducto(),
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
        actions.resetForm();
        actions.setSubmitting(false);

        actions.setStatus({
          mensaje: 'Producto creado correctamente',
          error: false,
        });

        setTimeout(
          () => this.props.onProductoCreado(nuevoProducto),
          400
        );
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
    const { onCancelar, descripcionProducto } = this.props;
    const { monedas, tiposProducto, unidadesMedida } = this.state;

    return (
      <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
        <Modal.Header>Nuevo Producto</Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={({
              precio: 0,
              marca: '',
              descripcion: descripcionProducto,
              id_moneda: null,
              id_unidad_medida: null,
              id_tipo_producto: null,
            })}
            onSubmit={this.crearProducto}>
            {({ values, status, handleChange, setFieldValue, handleSubmit }) => {
              return (
                <Form id='creacion-producto' onSubmit={handleSubmit}>
                  <Form.Field required>
                    <Input
                      name='descripcion'
                      placeholder='Nombre del producto o servicio'
                      value={values.descripcion}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='marca'
                      placeholder='Nombre de la marca'
                      value={values.marca}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <Input
                      name='precio'
                      type='number'
                      min={0}
                      placeholder='Precio'
                      value={values.precio}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field required>
                    <SelectorMoneda
                      name='id_moneda'
                      monedas={monedas}
                      monedaSeleccionada={values.id_moneda}
                      onSeleccion={(event, data) => setFieldValue('id_moneda', data.value)} />
                  </Form.Field>
                  <Form.Field required>
                    <SelectorTipoProducto
                      name='id_tipo_producto'
                      tiposProducto={tiposProducto}
                      tipoProductoSeleccionado={values.id_tipo_producto}
                      onSeleccion={(event, data) => setFieldValue('id_tipo_producto', data.value)} />
                  </Form.Field>
                  <Form.Field required>
                    <SelectorUnidadMedida
                      name='id_unidad_medida'
                      unidadesMedida={unidadesMedida}
                      unidadMedidaSeleccionada={values.id_unidad_medida}
                      onSeleccion={(event, data) => setFieldValue('id_unidad_medida', data.value)} />
                  </Form.Field>
                  {
                    status &&
                    status.mensaje &&
                    <Message negative={status.error}>{status.mensaje}</Message>
                  }
                </Form>
              );
             }}
          </Formik>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onCancelar}>
            Cancelar
          </Button>
          <Button
            color='google plus'
            type='submit'
            form='creacion-producto'>
            Guardar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NuevoProducto;
