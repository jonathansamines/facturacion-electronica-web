import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';

const FormularioUnidadesGravables = ({
  exportacion,
  impuestosDisponiblesProducto,
  unidadesGravables,
  setFieldValue,
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form id='formulario-unidades-gravables' onSubmit={handleSubmit}>
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

    <Form.Field required>
      <label>Unidades</label>
      <Input
        name='unidades'
        type='number'
        min={1}
        step={'0.000001'}
        placeholder='Unidades'
        value={values.unidades}
        onChange={handleChange} />
    </Form.Field>
  </Form>
);

FormularioUnidadesGravables.propTypes = {
  exportacion: PropTypes.bool.isRequired,
  impuestosDisponiblesProducto: PropTypes.array.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default FormularioUnidadesGravables;
