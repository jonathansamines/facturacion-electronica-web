import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';

// TODO: Probably all information in this component should be read-only and auto-computed
// HOW?

const FormularioRetencionesFacturaEspecial = ({
  complemento,
  values,
  errors,
  isValid,
  handleChange,
  handleSubmit,
}) => (
  <Form id='formulario-complemento' autoComplete='off' error={!isValid} onSubmit={handleSubmit}>
    <h3>{complemento.descripcion}</h3>
    <Form.Group widths='equal'>
      <Form.Field required={complemento.requerido} error={Boolean(errors.retencion_isr)}>
        <label>Retención ISR</label>
        <Input
          name='retencion_isr'
          type='number'
          min={1}
          step={0.00001}
          placeholder='Ingrese el monton a retener'
          value={values.retencion_isr}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.retencion_iva)}>
        <label>Retención IVA</label>
        <Input
          name='retencion_iva'
          type='number'
          min={1}
          step={0.00001}
          placeholder='Ingrese el monton a retener'
          value={values.retencion_iva}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.total_menos_retenciones)}>
        <label>Total - Retenciones</label>
        <Input
          name='total_menos_retenciones'
          type='number'
          min={1}
          step={0.00001}
          value={values.total_menos_retenciones}
          onChange={handleChange} />
      </Form.Field>
    </Form.Group>
    {
      Object.keys(errors).length > 0 &&
      <Message
        error
        header='Errores de validación encontrados'
        list={Object.values(errors)} />
    }
  </Form>
);


FormularioRetencionesFacturaEspecial.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isValid: PropTypes.bool,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormularioRetencionesFacturaEspecial;
