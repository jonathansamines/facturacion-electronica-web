import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';

const FormularioUnidadesGravables = ({ producto, unidadesGravables, setFieldValue, values, handleChange, handleSubmit }) => {
  const impuestosProducto = producto.tipo_producto.impuestos;

  return (
    <Form id='formulario-unidades-gravables' onSubmit={handleSubmit}>
      {
        impuestosProducto.map((impuesto) => (
          <Form.Field key={impuesto.id_impuesto} required>
            <label>Unidad Gravable {impuesto.nombre_corto}</label>
            <SelectorUnidadesGravables
              name={impuesto.nombre_corto}
              unidadesGravables={unidadesGravables.filter(u => u.id_impuesto === impuesto.id_impuesto)}
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
};

export default FormularioUnidadesGravables;
