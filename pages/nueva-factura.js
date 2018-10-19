import React from 'react';
import pProps from 'p-props';
import Main from './../components/layouts/Main';
import NuevaFactura from './../components/NuevaFactura';
import SeleccionCliente from './../components/NuevaFactura/SeleccionCliente';
import servicio from './../lib/servicio-api'
import { credenciales } from './../lib/credenciales';

const obtenerMonedas = async (req) => {
  const respuesta = await servicio.get('/monedas', credenciales(req));

  return respuesta.data;
};

const obtenerAfiliacionIva = async (req, idAfiliacionIVA) => {
  const respuesta = await servicio.get(`/afiliacion-iva/${idAfiliacionIVA}`, credenciales(req));

  return respuesta.data;
};

const obtenerUsuarioLogueado = async (req) => {
  const response = await servicio.get('/usuarios/me?incluir=empresa.sucursales', credenciales(req));

  return response.data;
};

class PaginaNuevaFactura extends React.Component {
  state = {
    opciones: null,
    cliente: null
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

  configurarCliente = (cliente) => {
    this.setState(cliente);
  }

  render() {
    const { usuario, monedas, afiliacionIVA } = this.props;

    return (
      <Main>
        <SeleccionCliente
          onClienteSeleccionado={this.configurarCliente} />
        <NuevaFactura
          monedas={monedas}
          sucursales={usuario.empresa.sucursales}
          tiposDocumentos={afiliacionIVA.tipos_documentos}
          onConfirmacion={this.configurarFactura} />
      </Main>
    );
  }
}

export default PaginaNuevaFactura;
