import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Form, Input, Message } from 'semantic-ui-react';
import SelectorUnidadesGravables from './SelectorUnidadesGravables';
import InformacionProducto from './InformacionProducto';
import InformacionProductoFactura from './InformacionProductoFactura';
import TablaImpuestos from './TablaImpuestos';
import { calcularDetalleProducto } from './calculos';

const FormularioConfirmacionProducto = ({
  moneda,
  tipoCambio,
  producto,
  exportacion,
  unidadesGravables,
  formProps
}) => {

  const { unidades, descuento, ...unidadesGravablesProductoSeleccionadas } = formProps.values;

  const unidadesGravablesProducto = Object.keys(unidadesGravablesProductoSeleccionadas).map((id_impuesto_unidad_gravable) => (
    unidadesGravables.find((unidadGravable) => `${unidadGravable.id_unidad_gravable}${unidadGravable.id_impuesto}` === unidadesGravablesProductoSeleccionadas[id_impuesto_unidad_gravable])
  ))
  .filter(unidadGravable => unidadGravable !== undefined);

  const { impuestos, montoGravable, precioUnitario } = calcularDetalleProducto({
    moneda,
    producto,
    unidades,
    descuento,
    unidadesGravables: unidadesGravablesProducto,
    tipoCambio,
  });

  const impuestosDisponiblesProducto = producto.tipo_producto.impuestos.filter(
    (impuesto) => !!unidadesGravables.find((unidadGravable) => unidadGravable.id_impuesto === impuesto.id_impuesto)
  );

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width='16'>
          <Segment vertical>
            <InformacionProducto
              moneda={moneda}
              producto={producto}
              precioUnitario={precioUnitario} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width='7'>
          <Segment vertical>
            <Form id='formulario-confirmacion-producto' onSubmit={formProps.handleSubmit} error={!formProps.isValid}>
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
                        unidadGravableSeleccionada={formProps.values[impuesto.id_impuesto]}
                        onSeleccion={(event, data) => formProps.setFieldValue(impuesto.id_impuesto, data.value)} />
                    </Form.Field>
                  );
                })
              }

              <Form.Group>
                <Form.Field width='8' required error={Boolean(formProps.errors.descuento)}>
                  <label>Unidades</label>
                  <Input
                    name='unidades'
                    type='number'
                    min={1}
                    step={'0.000001'}
                    placeholder='Unidades'
                    value={formProps.values.unidades}
                    onChange={formProps.handleChange} />
                </Form.Field>
                <Form.Field width='8' required error={Boolean(formProps.errors.descuento)}>
                  <label>Descuento</label>
                  <Input
                    name='descuento'
                    type='number'
                    min={0}
                    step={'0.000001'}
                    placeholder='Descuento'
                    value={formProps.values.descuento}
                    onChange={(event) => {
                      const descuento = event.target.valueAsNumber;
                      const esDescuentoValido = descuento <= formProps.values.unidades * producto.precio;

                      formProps.setFieldValue('descuento', event.target.value, Number.isNaN(descuento) || esDescuentoValido);

                      if (!Number.isNaN(descuento) && !esDescuentoValido) {
                        return formProps.setFieldError('descuento', 'El descuento no puede ser mayor al precio total');
                      }
                    }} />
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column width='9'>
          <InformacionProductoFactura
            moneda={moneda}
            impuestos={impuestos}
            unidades={unidades}
            precioUnitario={precioUnitario}
            montoGravable={montoGravable} />

          {
            unidadesGravablesProducto.length > 0 ?
            <Segment vertical>
              <TablaImpuestos
                moneda={moneda}
                impuestos={impuestos} />
            </Segment>
            :
            <Message info content='No se han seleccionado unidades gravables válidas para este producto' />
          }
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width='16'>
          {
            Object.values(formProps.errors).length > 0 &&
            <Message
              error
              header='Errores de validacion encontrados'
              list={Object.values(formProps.errors)}
            />
          }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

FormularioConfirmacionProducto.propTypes = {
  moneda: PropTypes.object.isRequired,
  producto: PropTypes.object.isRequired,
  exportacion: PropTypes.bool.isRequired,
  unidadesGravables: PropTypes.array.isRequired,
  formProps: PropTypes.object,
  tipoCambio: PropTypes.object,
};

export default FormularioConfirmacionProducto;
