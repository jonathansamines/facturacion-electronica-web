import axios from 'axios';
import { credenciales } from './credenciales';

const servicio = axios.create({
  baseURL: 'http://127.0.0.1:9000/api/',
  timeout: 1000,
});

export const obtenerUsuarioLogueado = async ({ req } = {}) => {
  try {
    const respuesta = await servicio.get('/usuarios/me?incluir=empresa.sucursales', credenciales(req));

    return respuesta.data;
  } catch (errorIgnorado) {
  }
};

export const obtenerEmpresas = async ({ req } = {}) => {
  const respuesta = await servicio.get('/empresas', credenciales(req));

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
  const respuesta = await servicio.get(`/productos?busqueda=${busqueda}`, credenciales(req));

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

export const crearCliente = async ({ req, cliente } = {}) => {
  const respuesta = await servicio.post('/clientes', cliente, credenciales(req));

  return respuesta.data;
};

export const crearVendedor = async ({ req, vendedor } = {}) => {
  const respuesta = await servicio.post('/vendedores', vendedor, credenciales(req));

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
