import axios from 'axios';
import { credenciales } from './credenciales';

const servicio = axios.create({
  baseURL: process.env.API_URL,
  timeout: 1000,
});

export const obtenerUsuarioLogueado = async ({ req } = {}) => {
  const respuesta = await servicio.get('/usuarios/me?incluir=empresa.sucursales', credenciales(req));

  return respuesta.data;
};

export const obtenerEmpresas = async ({ req } = {}) => {
  const respuesta = await servicio.get('/empresas', credenciales(req));

  return respuesta.data;
};

export const obtenerTipoCambioDia = async ({ req } = {}) => {
  const respuesta = await servicio.get('/tipo-cambio', credenciales(req));

  return respuesta.data;
};

export const obtenerMonedas = async ({ req } = {}) => {
  const respuesta = await servicio.get('/monedas', credenciales(req));

  return respuesta.data;
};

export const obtenerAfiliacionIva = async ({ req, idAfiliacionIVA } = {}) => {
  const respuesta = await servicio.get(`/afiliacion-iva/${idAfiliacionIVA}`, credenciales(req));

  return respuesta.data;
};

export const buscarProducto = async ({ req, busqueda } = {}) => {
  const respuesta = await servicio.get(`/productos`, {
    ...credenciales(req),
    params: {
      busqueda,
    }
  });

  return respuesta.data;
};

export const buscarVendedor = async ({ req, busqueda } = {}) => {
  const respuesta = await servicio.get(`/vendedores?busqueda=${busqueda}`, credenciales(req));

  return respuesta.data;
};

export const buscarCliente = async ({ req, busqueda } = {}) => {
  const respuesta = await servicio.get(`/clientes?busqueda=${busqueda}`, credenciales(req));

  return respuesta.data;
};

export const obtenerDepartamentos = async ({ req } = {}) => {
  const respuesta = await servicio.get('/departamentos', credenciales(req));

  return respuesta.data;
}

export const obtenerUnidadesMedida = async ({ req } = {}) => {
  const respuesta = await servicio.get('/unidades-medida', credenciales(req));

  return respuesta.data;
}

export const obtenerUnidadesGravables = async ({ req, impuestos } = {}) => {
  const respuesta = await servicio.get('/unidades-gravables', {
    ...credenciales(req),
    params: {
      impuestos,
    }
  });

  return respuesta.data;
}

export const obtenerTipoDocumentoPorId = async ({ req, idTipoDocumento } = {}) => {
  const respuesta = await servicio.get(`/tipos-documento/${idTipoDocumento}`, credenciales(req));

  return respuesta.data;
};

export const obtenerTiposProducto = async ({ req } = {}) => {
  const respuesta = await servicio.get('/tipos-producto', credenciales(req));

  return respuesta.data;
};

export const obtenerCondicionesEntrega = async ({ req } = {}) => {
  const respuesta = await servicio.get('/condiciones-entrega', credenciales(req));

  return respuesta.data;
};

export const crearProducto = async ({ req, producto } = {}) => {
  const respuesta = await servicio.post('/productos', producto, credenciales(req));

  return respuesta.data;
};

export const crearCliente = async ({ req, cliente } = {}) => {
  const respuesta = await servicio.post('/clientes', cliente, credenciales(req));

  return respuesta.data;
};

export const editarCliente = async ({ req, idCliente, cliente } = {}) => {
  const respuesta = await servicio.put(`/clientes/${idCliente}`, cliente, credenciales(req));

  return respuesta.data;
};

export const crearVendedor = async ({ req, vendedor } = {}) => {
  const respuesta = await servicio.post('/vendedores', vendedor, credenciales(req));

  return respuesta.data;
};

export const editarVendedor = async ({ req, vendedor, idVendedor } = {}) => {
  const respuesta = await servicio.put(`/vendedores/${idVendedor}`, vendedor, credenciales(req));

  return respuesta.data;
};

export const iniciarSesion = async ({ req, credenciales: creds } = {}) => {
  const respuesta = await servicio.post('/usuarios/login', creds, credenciales(req));

  return respuesta.data;
};

export const registrarUsuario = async ({ req, usuario } = {}) => {
  const respuesta = await servicio.post('/usuarios/registrar', usuario, credenciales(req));

  return respuesta.data;
};
