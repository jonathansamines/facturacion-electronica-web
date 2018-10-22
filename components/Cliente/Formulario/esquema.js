import * as Yup from 'yup';

const esquemaValidacion = Yup.object().shape({
  cui: Yup.string().required('El código único de identificación es obligatorio'),
  nit: Yup.string().required('El número de identificación tributaria es obligatorio'),
  nombre: Yup.string().required('El nombre del cliente es obligatorio'),
  apellido: Yup.string(),
  direccion: Yup.string().required('La dirección comercial o de residencia es obligatoria'),
  id_departamento: Yup.string().required(),
  id_municipio: Yup.string().required()
});

export default esquemaValidacion;
