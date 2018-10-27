import React from 'react';
import Head from 'next/head';
import Main from './../layouts/Main';
import { Formik } from 'formik';
import { Form, Select, Button } from 'semantic-ui-react';
import { startOfToday } from 'date-fns';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { obtenerUsuarioLogueado } from './../lib/servicio-api'
import { TablaFacturas } from './../components/Factura';

class App extends React.Component {
  static async getInitialProps({ req }) {
    return {
      usuario: await obtenerUsuarioLogueado({ req })
    };
  }

  render() {
    return (
      <>
        <Head>
          <title>Factura</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Main usuario={this.props.usuario}>
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
                    <Button color='google plus' fluid>Buscar</Button>
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

export default App;
