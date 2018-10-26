import React from 'react';
import pProps from 'p-props';
import Head from 'next/head';
import Router from 'next/router';
import { Form, Grid, Segment } from 'semantic-ui-react';
import Main from './../layouts/Main';
import { DatosCliente } from './../components/Cliente';
import { DatosVendedor } from './../components/Vendedor';
import { DetalleProductos } from '../components/Producto';
import { ConfiguracionFactura } from './../components/ConfiguracionFactura';
import { DatosFactura, SeleccionDatosFactura } from './../components/Factura';
import { obtenerMonedas, obtenerUsuarioLogueado, obtenerAfiliacionIva, obtenerTipoCambioDia } from './../lib/servicio-api';

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
      tipoCambio: obtenerTipoCambioDia({ req })
    });
  }

  cancelarCreacion = () => Router.push('/');

  configurarFactura = (opciones) => this.setState({ opciones });

  configurarCliente = (cliente) => this.setState({ cliente });

  configurarVendedor = (vendedor) => this.setState({ vendedor });

  configurarSeleccion = ({ cliente, vendedor }) => this.setState({ cliente, vendedor });

  render() {
    const { usuario, monedas, afiliacionIVA, tipoCambio } = this.props;
    const { opciones, vendedor, cliente } = this.state;

    return (
      <>
        <Head>
          <title>Crear nueva factura</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Main usuario={usuario}>
          <Segment vertical padded>
            <SeleccionDatosFactura
              sucursales={usuario.empresa.sucursales}
              onSeleccion={this.configurarSeleccion} />
          </Segment>

          <Segment vertical padded>
            <Grid columns={3}>
              <Grid.Column width={6}>
                <DatosFactura tipoCambio={tipoCambio} opciones={opciones} />
              </Grid.Column>

              <Grid.Column width={5}>
                <DatosCliente
                  cliente={cliente}
                  onClienteEditado={this.configurarCliente} />
              </Grid.Column>

              <Grid.Column width={5}>
                <DatosVendedor
                  vendedor={vendedor}
                  sucursales={usuario.empresa.sucursales}
                  onVendedorEditado={this.configurarVendedor} />
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment vertical padded='very'>
            {
              opciones &&
              <DetalleProductos
                tipoCambio={tipoCambio}
                moneda={opciones.moneda}
                tipoDocumento={opciones.tipoDocumento} />
            }
          </Segment>
        </Main>

        <ConfiguracionFactura
          monedas={monedas}
          sucursales={usuario.empresa.sucursales}
          tiposDocumentos={afiliacionIVA.tipos_documentos}
          onConfirmacion={this.configurarFactura}
          onCancelar={this.cancelarCreacion} />
      </>
    );
  }
}

export default PaginaNuevaFactura;
