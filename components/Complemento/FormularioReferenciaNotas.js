import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Message, TextArea } from 'semantic-ui-react';
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
  errors,
  isValid,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => (
  <Form id='formulario-complemento' autoComplete='off' error={!isValid} onSubmit={handleSubmit}>
    <h3>{complemento.descripcion}</h3>
    <Form.Group widths='equal'>
      <Form.Field required={complemento.requerido} error={errors.version}>
        <label>Régimen del Documento</label>
        <Input
          name='version'
          type='number'
          min={1}
          placeholder='Version del complemento?'
          value={values.version}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={errors.regimen}>
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
      <Form.Field required={complemento.requerido} error={errors.numero_autorizacion}>
        <label>Número de autorización</label>
        <Input
          name='numero_autorizacion'
          placeholder='Ingrese el número de autorización del documento'
          value={values.numero_autorizacion}
          onChange={handleChange} />
      </Form.Field>
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required={complemento.requerido} error={errors.fecha_emision}>
        <label>Fecha de emisión</label>
        <DayPickerInput
          placeholder='Seleccione una fecha'
          value={values.fecha_emision}
          inputProps={({
            name: 'fecha_emision'
          })}
          onDayChange={(diaSeleccionado) => setFieldValue('fecha_emision', diaSeleccionado)} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.numero_serie)}>
        <label>Serie del documento de orígen</label>
        <Input
          name='numero_serie'
          type='text'
          placeholder='Ingrese el número de serie'
          value={values.numero_serie}
          onChange={handleChange} />
      </Form.Field>
      <Form.Field required={complemento.requerido} error={Boolean(errors.numero_documento)}>
        <label>Número del documento de orígen</label>
        <Input
          name='numero_documento'
          type='text'
          placeholder='Ingrese el número de documento'
          value={values.numero_documento}
          onChange={handleChange} />
      </Form.Field>
    </Form.Group>
    <Form.Group widths='equal'>
      <Form.Field required={complemento.requerido} error={Boolean(errors.motivo_ajuste)}>
        <label>Motivo del ajuste</label>
        <TextArea
          name='motivo_ajuste'
          placeholder='Detalle del motivo del ajuste'
          value={values.motivo_ajuste}
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


FormularioReferenciasNotas.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  isValid: PropTypes.bool,
  complemento: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormularioReferenciasNotas;
