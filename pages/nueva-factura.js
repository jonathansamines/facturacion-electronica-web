import React from 'react';
import PropTypes from 'prop-types';
import pProps from 'p-props';
import Head from 'next/head';
import Router from 'next/router';
import { Grid, Segment } from 'semantic-ui-react';
import Main from './../layouts/Main';
import { DatosCliente } from './../components/Cliente';
import { DatosVendedor } from './../components/Vendedor';
import { DetalleProductos } from '../components/Producto';
import { ConfiguracionFactura } from './../components/ConfiguracionFactura';
import { ConfirmacionFactura, DatosFactura, SeleccionDatosFactura } from './../components/Factura';
import { esSesionValida } from './../lib/credenciales';
import { obtenerMonedas, obtenerUsuarioLogueado, obtenerAfiliacionIva, obtenerTipoCambioDia } from './../lib/servicio-api';

class PaginaNuevaFactura extends React.Component {
  state = {
    opciones: null,
    cliente: null,
    vendedor: null,
    confirmandoFacturacion: false,
    productos: []
  }

  static async getInitialProps({ req, res }) {
    if (!esSesionValida(req) && req) {
      return res.redirect('/iniciar-sesion');
    }

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

  configurarSeleccion = ({ cliente, vendedor, fechaEmision }) => this.setState({ cliente, vendedor, fechaEmision });

  iniciarFacturacion = () => this.setState({ confirmandoFacturacion: true })

  cancelarFacturacion = () => this.setState({ confirmandoFacturacion: false })

  confirmarFacturacion = () => {

    return Router.push('/');
  }

  actualizarProductos = ({ productos }) => this.setState({ productos });

  render() {
    const { usuario, monedas, afiliacionIVA, tipoCambio } = this.props;
    const {
      productos,
      opciones,
      vendedor,
      cliente,
      fechaEmision,
      confirmandoFacturacion
    } = this.state;

    return (
      <>
        <Head>
          <title>Crear nueva factura</title>
        </Head>

        <Main usuario={usuario}>
          <Segment vertical padded>
            {
              opciones &&
              <SeleccionDatosFactura
                hayProductos={true}
                tipoDocumento={opciones.tipoDocumento}
                exportacion={opciones.exportacion}
                sucursales={usuario.empresa.sucursales}
                onSeleccion={this.configurarSeleccion}
                onFacturacion={this.iniciarFacturacion} />
            }

            {
              confirmandoFacturacion &&
              <ConfirmacionFactura
                factura={{
                  productos,
                  moneda: opciones.moneda,
                  vendedor,
                  cliente,
                  fechaEmision,
                  sucursal: opciones.sucursal
                }}
                tipoCambio={tipoCambio}
                tipoDocumento={opciones.tipoDocumento}
                exportacion={opciones.exportacion}
                onCancelar={this.cancelarFacturacion}
                onConfirmacion={this.confirmarFacturacion} />
            }
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
                productos={productos}
                tipoCambio={tipoCambio}
                moneda={opciones.moneda}
                exportacion={opciones.exportacion}
                tipoDocumento={opciones.tipoDocumento}
                onProductosActualizados={this.actualizarProductos} />
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

PaginaNuevaFactura.propTypes = {
  usuario: PropTypes.object,
  monedas: PropTypes.array,
  afiliacionIVA: PropTypes.object,
  tipoCambio: PropTypes.object
}

export default PaginaNuevaFactura;
