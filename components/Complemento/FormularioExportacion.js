import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import SelectorCondicionesEntrega from './SelectorCondicionesEntrega';
import { obtenerCondicionesEntrega } from '../../lib/servicio-api';

class FormularioExportacion extends React.Component {
  state = {
    condicionesEntrega: [],
  }

  componentDidMount() {
    return obtenerCondicionesEntrega()
      .then((condicionesEntrega) => this.setState({ condicionesEntrega }))
  }

  render() {
    const { condicionesEntrega } = this.state;
    const {
      complemento,
      values,
      handleChange,
      handleSubmit,
      setFieldValue
    } = this.props;

    return (
      <Form id='formulario-exportacion' onSubmit={handleSubmit}>
        <h3>{complemento.descripcion}</h3>
        <Form.Group widths='equal'>
          <Form.Field required={complemento.requerido}>
            <label>Nombre consignatario</label>
            <Input
              name='nombre_consignatario'
              type='text'
              placeholder='Nombre del consignatario'
              value={values.nombre_consignatario}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Código consignatario</label>
            <Input
              name='codigo_consignatario'
              type='text'
              placeholder='Código del consignatario'
              value={values.codigo_consignatario}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Dirección consignatario</label>
            <Input
              name='direccion_consignatario'
              type='text'
              placeholder='Dirección del consignatario'
              value={values.direccion_consignatario}
              onChange={handleChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field required={complemento.requerido}>
            <label>Nombre del comprador</label>
            <Input
              name='nombre_comprador'
              type='text'
              placeholder='Nombre del comprador'
              value={values.nombre_comprador}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Dirección del Comprador</label>
            <Input
              name='direccion_comprador'
              type='text'
              placeholder='Dirección del comprador'
              value={values.direccion_comprador}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Código del comprador</label>
            <Input
              name='codigo_comprador'
              type='text'
              placeholder='Código del comprador'
              value={values.codigo_comprador}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Otra referencia</label>
            <Input
              name='otra_referencia'
              type='text'
              placeholder='Otra referencia'
              value={values.otra_referencia}
              onChange={handleChange} />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field required={complemento.requerido}>
            <label>Nombre exportador</label>
            <Input
              name='nombre_exportador'
              type='text'
              placeholder='Nombre exportador'
              value={values.nombre_exportador}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Código exportador</label>
            <Input
              name='codigo_exportador'
              type='text'
              placeholder='Código exportador'
              value={values.codigo_exportador}
              onChange={handleChange} />
          </Form.Field>
          <Form.Field required={complemento.requerido}>
            <label>Condición de entrega</label>
            <SelectorCondicionesEntrega
              name='condicion_entrega'
              condicionesEntrega={condicionesEntrega}
              condicionEntregaSeleccionada={values.condicion_entrega}
              onSeleccion={() => setFieldValue('condicion_entrega', values.condicion_entrega)} />
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

FormularioExportacion.propTypes = {
  values: PropTypes.object,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default FormularioExportacion;
