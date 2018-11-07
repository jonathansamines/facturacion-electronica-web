import * as Yup from 'yup';

export default Yup.object().shape({
  cui: Yup.string().required('El código único de identificación es obligatorio'),
  nit: Yup.string().required('El número de identificación tributaria es obligatorio'),
  nombre: Yup.string().required('El nombre del cliente es obligatorio'),
  apellido: Yup.string().required('El apellido del cliente es obligatorio'),
  direccion: Yup.string().required('La dirección comercial o de residencia es obligatoria'),
  id_departamento: Yup.string().nullable().required('El departamento de residencia es obligatorio'),
  id_municipio: Yup.string().nullable().required('El municipio de residencia es obligatorio')
});
