import React from 'react';
import PropTypes from 'prop-types';
import { TextArea, Form, Message, Input } from 'semantic-ui-react';
import SelectorMunicipio from '../SelectorMunicipio';
import SelectorDepartamento from '../SelectorDepartamento';

const FormularioCliente = ({
  departamentos,
  values,
  errors,
  status,
  isValid,
  isSubmitting,
  handleChange,
  setFieldValue,
  handleSubmit
}) => {
  const departamento = departamentos.find((departamento) => departamento.id_departamento === values.id_departamento);
  const municipios = departamento ? departamento.municipios : [];
  const errorList = Object.keys(errors).map((error) => errors[error]);

  return (
    <Form
      id='formulario-cliente'
      autoComplete='off'
      loading={isSubmitting}
      error={!isValid || (status && status.error)}
      success={isValid || !(status && status.error)}
      onSubmit={handleSubmit}>
      <Form.Group widths='equal'>
        <Form.Field required error={Boolean(errors.cui)}>
          <label>Código único de identificación</label>
          <Input
            name='cui'
            placeholder='Código único de identificacion'
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
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field required error={Boolean(errors.nombre)}>
          <label>Nombre del cliente</label>
          <Input
            name='nombre'
            placeholder='Nombre del cliente'
            value={values.nombre}
            onChange={handleChange} />
        </Form.Field>
        <Form.Field required error={Boolean(errors.apellido)}>
          <label>Apellido del cliente</label>
          <Input
            name='apellido'
            placeholder='Apellido del cliente'
            value={values.apellido}
            onChange={handleChange} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field error={Boolean(errors.correo)}>
          <label>Correo electrónico</label>
          <Input
            type='email'
            name='correo_electronico'
            placeholder='ej. correo@miempresa.com'
            value={values.correo_electronico}
            onChange={handleChange} />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field required>
          <label>Departamento</label>
          <SelectorDepartamento
            name='id_departamento'
            departamentos={departamentos}
            departamentoSeleccionado={values.id_departamento}
            onSeleccion={(event, data) => {
              setFieldValue('id_departamento', data.value);
              setFieldValue('id_municipio', null);
            }} />
        </Form.Field>
        <Form.Field required>
          <label>Municipio</label>
          <SelectorMunicipio
            name='id_municipio'
            municipios={municipios}
            municipioSeleccionado={values.id_municipio}
            onSeleccion={(event, data) => setFieldValue('id_municipio', data.value)} />
        </Form.Field>
      </Form.Group>
      <Form.Field required error={Boolean(errors.direccion)}>
        <label>Dirección de residencia o comercial</label>
        <TextArea
          name='direccion'
          placeholder='Dirección de residencia o comercial'
          value={values.direccion}
          onChange={handleChange} />
      </Form.Field>
      {
        status &&
        status.mensaje &&
        <Message success={!status.error} error={status.error} content={status.mensaje} />
      }

      {
        errorList.length > 0 &&
        <Message
          error
          header='Errores de validación encontrados'
          list={errorList} />
      }
    </Form>
  );
};

FormularioCliente.propTypes = {
  departamentos: PropTypes.array.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.object,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default FormularioCliente;
