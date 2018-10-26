import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import SelectorFrase from './SelectorFrase';

class TiposFrase extends React.Component {
  render() {
    const { tiposFrase } = this.props;

    return (
      <Form>
        <Form.Group widths='equal'>
          {tiposFrase.map((tipoFrase) => (
            <Form.Field key={tipoFrase.id_tipo_frase}>
              <label>{tipoFrase.descripcion}</label>
              <SelectorFrase
                name='id_tipo_frase'
                tipoFrase={tipoFrase}
                frases={tipoFrase.frases}
                fraseSeleccionada={null}
                onSeleccion={() => tipoFrase} />
            </Form.Field>
          ))}
        </Form.Group>
      </Form>
    );
  }
}

TiposFrase.propTypes = {
  tiposFrase: PropTypes.array.isRequired,
};

export default TiposFrase;
