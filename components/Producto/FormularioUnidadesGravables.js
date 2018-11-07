import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import { Form, Input, Message } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';

const FormularioUnidadesGravables = ({
  producto,
  exportacion,
  impuestosDisponiblesProducto,
  unidadesGravables,
  setFieldValue,
  setFieldError,
  values,
  errors,
  isValid,
  handleChange,
  handleSubmit,
}) => (
  <Form id='formulario-unidades-gravables' onSubmit={handleSubmit} error={!isValid}>
    {
      impuestosDisponiblesProducto.map((impuesto) => {
        const unidadesGravablesDisponiblesProducto = unidadesGravables.filter((unidadGravable) => {

          // Si la unidad gravable no soporta exportación y la factura es de exportación,
          // excluimos la unidad gravable
          if (exportacion && !unidadGravable.exportacion) {
            return false;
          }

          return unidadGravable.id_impuesto === impuesto.id_impuesto;
        });

        return (
          <Form.Field key={impuesto.id_impuesto} required>
            <label>Unidad Gravable {impuesto.nombre_corto}</label>
            <SelectorUnidadesGravables
              name={impuesto.nombre_corto}
              unidadesGravables={unidadesGravablesDisponiblesProducto}
              unidadGravableSeleccionada={values[impuesto.id_impuesto]}
              onSeleccion={(event, data) => setFieldValue(impuesto.id_impuesto, data.value)} />
          </Form.Field>
        );
      })
    }

    <Form.Group widths='equal'>
      <Form.Field required error={Boolean(errors.descuento)}>
        <label>Unidades</label>
        <Input
          name='unidades'
          type='number'
          min={1}
          step={'0.000001'}
          placeholder='Unidades'
          value={values.unidades}
          onChange={handleChange} />
        <ErrorMessage name='unidades' />
      </Form.Field>
      <Form.Field required error={Boolean(errors.descuento)}>
        <label>Descuento</label>
        <Input
          name='descuento'
          type='number'
          min={0}
          step={'0.000001'}
          placeholder='Descuento'
          value={values.descuento}
          onChange={(event) => {
            const descuento = event.target.valueAsNumber;
            const esDescuentoValido = descuento <= values.unidades * producto.precio;

            setFieldValue('descuento', event.target.value, Number.isNaN(descuento) || esDescuentoValido);

            if (!Number.isNaN(descuento) && !esDescuentoValido) {
              return setFieldError('descuento', 'El descuento no puede ser mayor al precio total');
            }
          }} />
      </Form.Field>
    </Form.Group>

    {
      Object.values(errors).length > 0 &&
      <Message
        error
        header='Errores de validacion encontrados'
        list={Object.values(errors)}
      />
    }
  </Form>
);

FormularioUnidadesGravables.propTypes = {
  producto: PropTypes.object.isRequired,
  exportacion: PropTypes.bool.isRequired,
  impuestosDisponiblesProducto: PropTypes.array.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  errors: PropTypes.object,
  values: PropTypes.object,
  isValid: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FormularioUnidadesGravables;
