import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const FormularioFacturaCambiaria = ({
  complemento,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => (
  <Form id='formulario-factura-cambiaria' onSubmit={handleSubmit}>
    <h3>{complemento.descripcion}</h3>
    <Form.Group widths='equal'>
      <Form.Field required={Boolean(complemento.requerido)}>
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
      <Form.Field required={Boolean(complemento.requerido)}>
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
  </Form>
);


FormularioFacturaCambiaria.propTypes = {
  values: PropTypes.object,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormularioFacturaCambiaria;
