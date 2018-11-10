import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Main from './../layouts/Main';
import pProps from 'p-props';
import { Formik } from 'formik';
import { Form, Input, Button } from 'semantic-ui-react';
import { startOfToday } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { esSesionValida } from './../lib/credenciales';
import { obtenerUsuarioLogueado, obtenerFacturas } from './../lib/servicio-api'
import { TablaFacturas } from './../components/Factura';

class App extends React.Component {
  static async getInitialProps({ req, res }) {
    if (!esSesionValida(req) && req) {
      return res.redirect('/iniciar-sesion');
    }

    return pProps({
      usuario: obtenerUsuarioLogueado({ req }),
      facturas: obtenerFacturas({ req }),
    });
  }

  render() {
    const { facturas, usuario } = this.props;

    return (
      <>
        <Head>
          <title>Facturas</title>
        </Head>
        <Main usuario={usuario}>
          <Formik
            initialValues={({
              busqueda: '',
              fecha_factura: startOfToday(new Date()),
            })}
            onSubmit={this.seleccionarInformacion}>
            {({ setFieldValue, handleChange, handleSubmit, values }) => (
              <Form onSubmit={handleSubmit} autoComplete='off'>
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

                    <Input
                      name='busqueda'
                      icon='search'
                      placeholder='Buscar factura (Número de autorización o cliente)'
                      value={values.busqueda}
                      onChange={handleChange} />
                  </Form.Field>
                  <Form.Field width='3'>
                    <label>&nbsp;</label>
                    <Button color='blue' type='submit' fluid>Buscar</Button>
                  </Form.Field>
                </Form.Group>
              </Form>
            )}
          </Formik>
          <TablaFacturas facturas={facturas} />
        </Main>
      </>
    );
  }
}

App.propTypes = {
  usuario: PropTypes.object,
  facturas: PropTypes.array,
};

export default App;
