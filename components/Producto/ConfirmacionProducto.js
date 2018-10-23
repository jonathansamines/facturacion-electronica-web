import React from 'react';
import { Formik } from 'formik';
import { Segment, List, Button, Modal, Form, Input } from 'semantic-ui-react';

const ConfirmacionProducto = (props) => {
  const { onCancelar, onConfirmar, producto } = props;

  return (
    <Modal defaultOpen={true} size='tiny' onClose={onCancelar}>
      <Modal.Header>{producto.nombre}</Modal.Header>
      <Modal.Content>
        <p>{producto.descripcion}</p>
        <Segment vertical>
          <List relaxed horizontal size='medium'>
            <List.Item>
              <List.Header as='strong'>Marca: </List.Header>
              {producto.marca}
            </List.Item>
            <List.Item>
              <List.Header as='strong'>Precio: </List.Header>
              {producto.precio} {producto.id_moneda}
            </List.Item>
          </List>
        </Segment>
        <Segment vertical>
          <Formik
            initialValues={({
              unidades: 1
            })}
            onSubmit={onConfirmar}>
            {({ values, handleChange, handleSubmit }) => {
              return (
                <Form id='confirmacion-unidades-producto' onSubmit={handleSubmit}>
                  <Form.Group inline>
                    <Form.Field width='twelve'>
                      <label>Unidades</label>
                      <Input
                        name='unidades'
                        type='number'
                        min={1}
                        placeholder='Unidades'
                        value={values.unidades}
                        onChange={handleChange} />
                    </Form.Field>
                    <Form.Field width='four'>
                      <label>{producto.unidad_medida.descripcion}</label>
                    </Form.Field>
                  </Form.Group>
                </Form>
              );
              }}
          </Formik>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancelar}>
          Cancelar
        </Button>
        <Button
          color='google plus'
          type='submit'
          form='confirmacion-unidades-producto'>
          Agregar
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmacionProducto;
