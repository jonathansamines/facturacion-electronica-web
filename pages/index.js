import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Main from './../layouts/Main';
import { Formik } from 'formik';
import { Form, Select, Button } from 'semantic-ui-react';
import { startOfToday } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { esSesionValida } from './../lib/credenciales';
import { obtenerUsuarioLogueado } from './../lib/servicio-api'
import { TablaFacturas } from './../components/Factura';

class App extends React.Component {
  static async getInitialProps({ req, res }) {
    if (!esSesionValida(req) && req) {
      return res.redirect('/iniciar-sesion');
    }

    return {
      usuario: await obtenerUsuarioLogueado({ req })
    };
  }

  render() {
    const { usuario } = this.props;

    return (
      <>
        <Head>
          <title>Facturas</title>
        </Head>
        <Main usuario={usuario}>
          <Formik
            initialValues={({
              busqueda: null,
              fecha_factura: startOfToday(new Date()),
            })}
            onSubmit={this.seleccionarInformacion}>
            {({ setFieldValue, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Field width='3'>
                    <label>Fecha Factura</label>
                    <DayPickerInput
                      placeholder='Seleccione una fecha'
                      value={values.fecha_factura}
                      inputProps={({
                        name: 'fecha_factura'
                      })}
                      onDayChange={(selectedDay) => setFieldValue('fecha_factura', selectedDay)} />
                  </Form.Field>
                  <Form.Field width='10'>
                    <label>Busqueda</label>
                    <Select
                      search
                      name='busqueda'
                      selectOnBlur={false}
                      selectOnNavigation={false}
                      placeholder='Buscar factura (Número de autorización, descripción o cliente'
                      noResultsMessage='Factura no encontrada'
                      options={[]}
                      value={null} />
                  </Form.Field>
                  <Form.Field width='3'>
                    <label>&nbsp;</label>
                    <Button color='blue' fluid>Buscar</Button>
                  </Form.Field>
                </Form.Group>
              </Form>
            )}
          </Formik>
          <TablaFacturas />
        </Main>
      </>
    );
  }
}

App.propTypes = {
  usuario: PropTypes.object
};

export default App;
