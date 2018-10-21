import React from 'react';
import { Formik } from 'formik';
import { Segment, List, Button, Modal, Form } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';
import { obtenerUnidadesGravables } from '../../../lib/servicio-api';

class ModificarImpuestos extends React.Component {
  state = {
    unidadesGravables: []
  }

  componentDidMount() {
    return obtenerUnidadesGravables()
      .then((unidadesGravables) => {
        this.setState({ unidadesGravables: unidadesGravables });
      });
  }

  confirmar = () => {
    this.props.onConfirmar(this.props.producto);
  }

  cancelar = () => {
    this.props.onCancelar(this.props.producto);
  }

  render() {
    const { unidadesGravables } = this.state;
    const { producto } = this.props;

    return (
      <Modal defaultOpen={true} size='tiny' onClose={this.cancelar}>
        <Modal.Header>Modificar Impuestos</Modal.Header>
        <Modal.Content>
          <Segment vertical>
            <Formik
              initialValues={({
                unidades: 1
              })}
              onSubmit={this.confirmar}>
              {({ values, setFieldValue, handleSubmit }) => {
                return (
                  <Form id='modificar-impuestos' onSubmit={handleSubmit}>
                    <Form.Field>
                      <SelectorUnidadesGravables
                        name='id_unidad_gravable'
                        unidadesGravables={unidadesGravables}
                        unidadGravableSeleccionada={values.id_unidad_gravable}
                        onSeleccion={(event, data) => setFieldValue('id_unidad_gravable', data.value)} />
                    </Form.Field>
                  </Form>
                );
              }}
            </Formik>
          </Segment>
          <Segment vertical>
            <List relaxed horizontal size='medium'>
              <List.Item>
                <List.Header as='strong'>Producto: </List.Header>
                {producto.descripcion}
              </List.Item>
              <List.Item>
                <List.Header as='strong'>Unidades Gravables: </List.Header>
                0
              </List.Item>
              <List.Item>
                <List.Header as='strong'>Precio Unitario: </List.Header>
                {producto.precio}
              </List.Item>
            </List>
            <List relaxed horizontal size='medium'>
              <List.Item>
                <List.Header as='strong'>Impuesto (%): </List.Header>
                0
              </List.Item>
              <List.Item>
                <List.Header as='strong'>Precio Final: </List.Header>
                0
              </List.Item>
            </List>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.cancelar}>
            Cancelar
          </Button>
          <Button
            color='google plus'
            type='submit'
            form='modificar-impuestos'>
            Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModificarImpuestos;
