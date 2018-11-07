import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Input } from 'semantic-ui-react';
import SelectorSucursal from './../../SelectorSucursal';

const FormularioVendedor = ({
  sucursales,
  isValid,
  isSubmitting,
  values,
  errors,
  status,
  handleChange,
  setFieldValue,
  handleSubmit
}) => (
  <Form
    id='formulario-vendedor'
    autoComplete='off'
    loading={isSubmitting}
    error={!isValid || status && status.error}
    success={isValid || !(status && status.error)}
    onSubmit={handleSubmit}>
    <Form.Field required error={Boolean(errors.cui)}>
      <label>Código único de identificación</label>
      <Input
        name='cui'
        placeholder='Código único de identificación'
        value={values.cui}
        onChange={handleChange} />
    </Form.Field>
    <Form.Field required error={Boolean(errors.nit)}>
      <label>Número de identificación tributaria</label>
      <Input
        name='nit'
        placeholder='Número de identificación tributaria'
        value={values.nit}
        onChange={handleChange} />
    </Form.Field>
    <Form.Field required error={Boolean(errors.nombre)}>
      <label>Nombre</label>
      <Input
        name='nombre'
        placeholder='Nombre del vendedor'
        value={values.nombre}
        onChange={handleChange} />
    </Form.Field>
    <Form.Field required error={Boolean(errors.apellido)}>
      <label>Apellido</label>
      <Input
        name='apellido'
        placeholder='Apellido del vendedor'
        value={values.apellido}
        onChange={handleChange} />
    </Form.Field>
    <Form.Field required>
      <label>Sucursal</label>
      <SelectorSucursal
        name='id_sucursal'
        sucursales={sucursales}
        sucursalSeleccionada={values.id_sucursal}
        onSeleccion={(event, data) => setFieldValue('id_sucursal', data.value)} />
    </Form.Field>
    {
      status &&
      status.mensaje &&
      <Message success={!status.error} error={status.error} content={status.mensaje} />
    }

    {
      Object.keys(errors).length > 0 &&
      <Message
        error
        header='Errores de validación encontrados'
        list={Object.values(errors)} />
    }
  </Form>
);

FormularioVendedor.propTypes = {
  sucursales: PropTypes.array.isRequired,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  values: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.object,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default FormularioVendedor;
