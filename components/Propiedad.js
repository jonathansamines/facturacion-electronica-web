import get from 'lodash/get';
import identity from 'lodash/identity';

const Propiedad = ({ propiedad, valor, fallback = '-', render = identity }) => {
  const resultado = get(valor, propiedad, fallback);

  if (resultado === fallback) {
    return fallback;
  }

  return render(resultado);
}

export default Propiedad;
