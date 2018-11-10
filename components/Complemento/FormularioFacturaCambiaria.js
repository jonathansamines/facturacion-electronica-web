import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Message } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const FormularioFacturaCambiaria = ({
  complemento,
  values,
  errors,
  handleChange,
  isValid,
  handleSubmit,
  setFieldValue,
}) => (
  <Form id='formulario-complemento' autoComplete='off' error={!isValid} onSubmit={handleSubmit}>
    <h3>{complemento.descripcion}</h3>
    <Form.Group widths='equal'>
      <Form.Field required={complemento.requerido} error={Boolean(errors.numero_abono)}>
        <label>Número de abono</label>
        <Input
          name='numero_abono'
          type='number'
          min={1}
          placeholder='Número de abono'
          value={values.numero_abono}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.monto_abono)}>
        <label>Monto abono</label>
        <Input
          name='monto_abono'
          type='number'
          min={1}
          step={0.00001}
          placeholder='Ingrese el monto a abonar'
          value={values.monto_abono}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.fecha_vencimiento)}>
        <label>Fecha de vencimiento</label>
        <DayPickerInput
          placeholder='Seleccione una fecha'
          value={values.fecha_vencimiento}
          inputProps={({
            name: 'fecha_vencimiento'
          })}
          onDayChange={(diaSeleccionado) => setFieldValue('fecha_factura', diaSeleccionado)} />
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


FormularioFacturaCambiaria.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isValid: PropTypes.bool,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormularioFacturaCambiaria;
