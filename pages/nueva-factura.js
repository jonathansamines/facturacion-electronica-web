import React from 'react';
import pProps from 'p-props';
import Head from 'next/head';
import Main from './../components/layouts/Main';
import NuevaFactura from './../components/NuevaFactura';
import SeleccionDatosFactura from './../components/NuevaFactura/SeleccionDatosFactura';
import DatosCliente from './../components/NuevaFactura/DatosCliente';
import DatosVendedor from './../components/NuevaFactura/DatosVendedor';
import servicio, { obtenerUsuarioLogueado } from './../lib/servicio-api'
import { credenciales } from './../lib/credenciales';
import { Grid, Segment, Button } from 'semantic-ui-react';
import DetalleFactura from '../components/NuevaFactura/DetalleFactura';

const obtenerMonedas = async (req) => {
  const respuesta = await servicio.get('/monedas', credenciales(req));

  return respuesta.data;
};

const obtenerAfiliacionIva = async (req, idAfiliacionIVA) => {
  const respuesta = await servicio.get(`/afiliacion-iva/${idAfiliacionIVA}`, credenciales(req));

  return respuesta.data;
};

class PaginaNuevaFactura extends React.Component {
  state = {
    opciones: null,
    cliente: null,
    vendedor: {
      nit: 3894893,
      nombre: 'El vendedor',
      apellido: 'confliable',
      direccion: 'La direccion'
    }
  }

  static async getInitialProps({ req }) {
    const usuario = await obtenerUsuarioLogueado(req);

    return pProps({
      usuario,
      monedas: obtenerMonedas(req),
      afiliacionIVA: obtenerAfiliacionIva(req, usuario.empresa.id_afiliacion_iva),
    });
  }

  configurarFactura = (opciones) => {
    this.setState(opciones);
  }

  configurarSeleccion = ({ cliente, vendedor }) => {
    this.setState({ cliente, vendedor });
  }

  render() {
    const { usuario, monedas, afiliacionIVA } = this.props;
    const { opciones, vendedor, cliente } = this.state;

    return (
      <>
        <Head>
          <title>Crear nueva factura</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Main usuario={usuario}>
          <Segment vertical>
            <SeleccionDatosFactura
              onSeleccion={this.configurarSeleccion} />
          </Segment>

          <Segment vertical>
            <Grid columns={2}>
              {
                cliente &&
                <Grid.Column>
                  <DatosCliente cliente={cliente} />
                </Grid.Column>
              }

              {
                vendedor &&
                <Grid.Column>
                  <DatosVendedor vendedor={vendedor} />
                </Grid.Column>
              }
            </Grid>
          </Segment>

          <Segment vertical>
            <DetalleFactura />
          </Segment>

          <NuevaFactura
            monedas={monedas}
            sucursales={usuario.empresa.sucursales}
            tiposDocumentos={afiliacionIVA.tipos_documentos}
            onConfirmacion={this.configurarFactura} />
        </Main>
      </>
    );
  }
}

export default PaginaNuevaFactura;
