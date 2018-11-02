import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const opcionesRegimen = [
  {
    key: 'FEL',
    value: 'FEL',
    text: 'Facturación electrónica en línea (FEL)'
  },
  {
    key: 'FACE1',
    value: 'FACE1',
    text: 'Régimen Antiguo (FACE1)'
  }
];

const FormularioReferenciasNotas = ({
  complemento,
  values,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => (
  <Form id='formulario-retenciones-factura-especial' onSubmit={handleSubmit}>
    <h3>{complemento.descripcion}</h3>
    <Form.Group widths='equal'>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Régimen del Documento</label>
        <Select
          name='regimen'
          selectOnBlur={false}
          selectOnNavigation={false}
          placeholder='Seleccione el régimen del documento'
          options={opcionesRegimen}
          value={values.regimen}
          onChange={(event, data) => setFieldValue('regimen', data.value)} />
      </Form.Field>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Número de autorización</label>
        <Input
          name='numero_autorizacion'
          type='number'
          min={1}
          step={0.00001}
          placeholder='Ingrese el número de autorización del documento'
          value={values.numero_autorizacion}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Fecha de emisión</label>
        <DayPickerInput
          placeholder='Seleccione una fecha'
          value={values.fecha_emision}
          inputProps={({
            name: 'fecha_emision'
          })}
          onDayChange={(diaSeleccionado) => setFieldValue('fecha_emision', diaSeleccionado)} />
      </Form.Field>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Motivo del ajuste</label>
        <Input
          name='motivo_ajuste'
          type='text'
          placeholder='Detalle del motivo del ajuste'
          value={values.motivo_ajuste}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Número de Serie del documento de orígen</label>
        <Input
          name='numero_serie'
          type='text'
          placeholder='Ingrese el número de serie'
          value={values.numero_serie}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={Boolean(complemento.requerido)}>
        <label>Número de del documento de orígen</label>
        <Input
          name='numero_documento'
          type='text'
          placeholder='Ingrese el número de documento'
          value={values.numero_documento}
          onChange={handleChange} />
      </Form.Field>
    </Form.Group>
  </Form>
);


FormularioReferenciasNotas.propTypes = {
  values: PropTypes.object,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormularioReferenciasNotas;
