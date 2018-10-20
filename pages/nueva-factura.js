import React from 'react';
import pProps from 'p-props';
import Head from 'next/head';
import Router from 'next/router';
import { Grid, Segment } from 'semantic-ui-react';
import Main from './../layouts/Main';
import NuevaFactura from './../components/NuevaFactura';
import SeleccionDatosFactura from './../components/NuevaFactura/SeleccionDatosFactura';
import DatosFactura from './../components/NuevaFactura/DatosFactura';
import DatosCliente from './../components/NuevaFactura/DatosCliente';
import DatosVendedor from './../components/NuevaFactura/DatosVendedor';
import { obtenerMonedas, obtenerUsuarioLogueado, obtenerAfiliacionIva } from './../lib/servicio-api'
import DetalleFactura from '../components/DetalleFactura';

class PaginaNuevaFactura extends React.Component {
  state = {
    opciones: null,
    cliente: null,
    vendedor: null
  }

  static async getInitialProps({ req }) {
    const usuario = await obtenerUsuarioLogueado({ req });
    const idAfiliacionIVA = usuario.empresa.id_afiliacion_iva;

    return pProps({
      usuario,
      monedas: obtenerMonedas({ req }),
      afiliacionIVA: obtenerAfiliacionIva({ req, idAfiliacionIVA }),
    });
  }

  cancelarCreacion = () => {
    return Router.push('/');
  }

  configurarFactura = (opciones) => {
    this.setState({ opciones });
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
              sucursales={usuario.empresa.sucursales}
              onSeleccion={this.configurarSeleccion} />
          </Segment>

          <Segment vertical>
            <Grid columns={3}>
              {
                opciones &&
                <Grid.Column>
                  <DatosFactura opciones={opciones} />
                </Grid.Column>
              }

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
            {
              opciones &&
              <DetalleFactura moneda={opciones.moneda} />
            }
          </Segment>

          <NuevaFactura
            monedas={monedas}
            sucursales={usuario.empresa.sucursales}
            tiposDocumentos={afiliacionIVA.tipos_documentos}
            onConfirmacion={this.configurarFactura}
            onCancelar={this.cancelarCreacion} />
        </Main>
      </>
    );
  }
}

export default PaginaNuevaFactura;
