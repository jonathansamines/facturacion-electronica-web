import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'semantic-ui-react';
import SelectorFrase from './SelectorFrase';

class TiposFrase extends React.Component {
  obtenerEsquemaValidacion() {
    const { tiposFrase } = this.props;

    return Yup.object().shape({
      ...(tiposFrase.reduce((resultado, tipoFrase) => ({
        ...resultado,
        [tipoFrase.id_tipo_frase]: Yup.number().required(),
      }), {}))
    });
  }

  obtenerValoresPorDefecto() {
    const { tiposFrase } = this.props;

    return {
      ...(tiposFrase.reduce((resultado, tipoFrase) => ({
        ...resultado,
        [tipoFrase.id_tipo_frase]: null,
      }), {}))
    }
  }

  render() {
    const { tiposFrase } = this.props;

    return (
      <Formik
        validationSchema={this.obtenerEsquemaValidacion()}
        initialValues={this.obtenerValoresPorDefecto()}>
          {({ values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              {tiposFrase.map((tipoFrase) => (
                <Form.Field key={tipoFrase.id_tipo_frase} required={!!tipoFrase.requerido}>
                  <label>{tipoFrase.descripcion}</label>
                  <SelectorFrase
                    name={`${tipoFrase.id_tipo_frase}`}
                    tipoFrase={tipoFrase}
                    frases={tipoFrase.frases}
                    fraseSeleccionada={values[tipoFrase.id_tipo_frase]}
                    onSeleccion={(event, data) => setFieldValue(`${tipoFrase.id_tipo_frase}`, data.value)} />
                </Form.Field>
              ))}
            </Form.Group>
          </Form>
        )}
      </Formik>
    );
  }
}

TiposFrase.propTypes = {
  tiposFrase: PropTypes.array.isRequired,
};

export default TiposFrase;
