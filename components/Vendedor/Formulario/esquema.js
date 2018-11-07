import * as Yup from 'yup';

export default Yup.object().shape({
  cui: Yup.string().required('El código único de identificación es obligatorio'),
  nit: Yup.string().required('El número de identificación tributaria es obligatorio'),
  nombre: Yup.string().required('El nombre del vendedor es obligatorio'),
  apellido: Yup.string(),
  id_sucursal: Yup.number().nullable().required('La sucursal en la que el vendedor se encuentra es obligatoria')
});
