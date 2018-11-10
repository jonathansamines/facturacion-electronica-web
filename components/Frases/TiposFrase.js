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
        [tipoFrase.id_tipo_frase]: tipoFrase.requerido ? Yup.number().nullable().required() : Yup.number().nullable(),
      }), {}))
    });
  }

  obtenerValoresPorDefecto() {
    const { tiposFrase, frasesSeleccionadas } = this.props;

    return {
      ...(tiposFrase.reduce((resultado, tipoFrase) => {

        const fraseSeleccionada = frasesSeleccionadas.find((frase) => frase.id_tipo_frase === tipoFrase.id_tipo_frase);

        return {
          ...resultado,
          [tipoFrase.id_tipo_frase]: fraseSeleccionada ? fraseSeleccionada.id_frase : null,
        };
      }, {}))
    }
  }

  seleccionarFrasePorTipoFrase = (values) => {
    const { tiposFrase, onSeleccion } = this.props;

    const frasesSeleccionadas = Object.keys(values).filter((key) => values[key] !== null).map((idTipoFrase) => {
      const tipo = tiposFrase.find((tipoFrase) => tipoFrase.id_tipo_frase === Number.parseInt(idTipoFrase));

      return tipo.frases.find((frase) => frase.id_frase === values[idTipoFrase]);
    });

    return onSeleccion && onSeleccion(frasesSeleccionadas);
  }

  render() {
    const { tiposFrase } = this.props;

    return (
      <Formik
        enableReinitialize={true}
        validationSchema={this.obtenerEsquemaValidacion()}
        initialValues={this.obtenerValoresPorDefecto()}
        onSubmit={this.seleccionarFrasePorTipoFrase}>
          {({ values, errors, isValid, handleSubmit, setFieldValue }) => (
          <Form id='formulario-seleccion-frase' error={!isValid} onSubmit={handleSubmit}>
            {tiposFrase.map((tipoFrase) => (
              <Form.Field
                key={tipoFrase.id_tipo_frase}
                required={tipoFrase.requerido}
                error={Boolean(errors[`${tipoFrase.id_tipo_frase}`])}>
                <label>{tipoFrase.descripcion}</label>
                <SelectorFrase
                  name={`${tipoFrase.id_tipo_frase}`}
                  tipoFrase={tipoFrase}
                  frases={tipoFrase.frases}
                  fraseSeleccionada={values[tipoFrase.id_tipo_frase]}
                  onSeleccion={(event, data) => setFieldValue(`${tipoFrase.id_tipo_frase}`, data.value)} />
              </Form.Field>
            ))}
          </Form>
        )}
      </Formik>
    );
  }
}

TiposFrase.propTypes = {
  frasesSeleccionadas: PropTypes.array.isRequired,
  tiposFrase: PropTypes.array.isRequired,
  onSeleccion: PropTypes.func.isRequired
};

export default TiposFrase;
