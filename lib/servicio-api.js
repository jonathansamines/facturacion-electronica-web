import axios from 'axios';
import { credenciales } from './credenciales';

const servicio = axios.create({
  baseURL: 'http://127.0.0.1:9000/api/',
  timeout: 1000,
});

export default servicio;

export const obtenerUsuarioLogueado = async (req) => {
  try {
    const response = await servicio.get('/usuarios/me?incluir=empresa.sucursales', credenciales(req));

    return response.data;
  } catch (ignoredError) {
  }
};
