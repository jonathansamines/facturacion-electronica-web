import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';

const FormularioUnidadesGravables = ({
  impuestosDisponiblesProducto,
  unidadesGravables,
  setFieldValue,
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form id='formulario-unidades-gravables' onSubmit={handleSubmit}>
    {
      impuestosDisponiblesProducto.map((impuesto) => (
        <Form.Field key={impuesto.id_impuesto} required>
          <label>Unidad Gravable {impuesto.nombre_corto}</label>
          <SelectorUnidadesGravables
            name={impuesto.nombre_corto}
            unidadesGravables={unidadesGravables.filter((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)}
            unidadGravableSeleccionada={values[impuesto.id_impuesto]}
            onSeleccion={(event, data) => setFieldValue(impuesto.id_impuesto, data.value)} />
        </Form.Field>
      ))
    }

    <Form.Field required>
      <label>Unidades</label>
      <Input
        name='unidades'
        type='number'
        min={1}
        placeholder='Unidades'
        value={values.unidades}
        onChange={handleChange} />
    </Form.Field>
  </Form>
);

FormularioUnidadesGravables.propTypes = {
  impuestosDisponiblesProducto: PropTypes.array.isRequired,
  unidadesGravables: PropTypes.array.isRequired
};

export default FormularioUnidadesGravables;
