const cuiRegExp = /^[0-9]{4}\s?[0-9]{5}\s?[0-9]{4}$/;

// Se asume que la codificación de Municipios y
// departamentos es la misma que esta publicada en
// http://goo.gl/EsxN1a

// Listado de municipios actualizado segun:
// http://goo.gl/QLNglm

// Este listado contiene la cantidad de municipios
// existentes en cada departamento para poder
// determinar el código máximo aceptado por cada
// uno de los departamentos.
const munisPorDepto = [
  /* 01 - Guatemala tiene:      */ 17 /* municipios. */,
  /* 02 - El Progreso tiene:    */  8 /* municipios. */,
  /* 03 - Sacatepéquez tiene:   */ 16 /* municipios. */,
  /* 04 - Chimaltenango tiene:  */ 16 /* municipios. */,
  /* 05 - Escuintla tiene:      */ 13 /* municipios. */,
  /* 06 - Santa Rosa tiene:     */ 14 /* municipios. */,
  /* 07 - Sololá tiene:         */ 19 /* municipios. */,
  /* 08 - Totonicapán tiene:    */  8 /* municipios. */,
  /* 09 - Quetzaltenango tiene: */ 24 /* municipios. */,
  /* 10 - Suchitepéquez tiene:  */ 21 /* municipios. */,
  /* 11 - Retalhuleu tiene:     */  9 /* municipios. */,
  /* 12 - San Marcos tiene:     */ 30 /* municipios. */,
  /* 13 - Huehuetenango tiene:  */ 32 /* municipios. */,
  /* 14 - Quiché tiene:         */ 21 /* municipios. */,
  /* 15 - Baja Verapaz tiene:   */  8 /* municipios. */,
  /* 16 - Alta Verapaz tiene:   */ 17 /* municipios. */,
  /* 17 - Petén tiene:          */ 14 /* municipios. */,
  /* 18 - Izabal tiene:         */  5 /* municipios. */,
  /* 19 - Zacapa tiene:         */ 11 /* municipios. */,
  /* 20 - Chiquimula tiene:     */ 11 /* municipios. */,
  /* 21 - Jalapa tiene:         */  7 /* municipios. */,
  /* 22 - Jutiapa tiene:        */ 17 /* municipios. */
];

function depurarCUI(cui = '') {
  return cui.match(/[0-9]+/gi).join('');
}

/**
 * Función que permite validar que un CUI es válido
 * @see https://jsfiddle.net/miguelerm/tp0t481o/
 * @param {String} cui
 */
export function validarCUI(cui) {
  if (!cuiRegExp.test(cui)) {
    return {
      error: 'El formato de Código único de identificación no es válido'
    };
  }

  cui = depurarCUI(cui);
  cui = cui.replace(/\s/, '');

  const departamento = Number.parseInt(cui.substring(9, 11), 10);
  const municipio = Number.parseInt(cui.substring(11, 13), 10);

  const numero = cui.substring(0, 8);
  const verificador = Number.parseInt(cui.substring(8, 9), 10);

  if (departamento === 0 || municipio === 0) {
    return {
      error: 'CUCódigo único de identificaciónI con código de municipio o departamento inválido.'
    };
  }

  if (departamento > munisPorDepto.length) {
    return {
      error: 'Código único de identificación con código de departamento inválido.'
    };
  }

  if (municipio > munisPorDepto[departamento -1]) {
    return {
      error: 'Código único de identificación con código de municipio inválido.'
    };
  }

  // Se verifica el correlativo con base
  // en el algoritmo del complemento 11.
  let total = 0;

  for (let i = 0; i < numero.length; i++) {
      total += numero[i] * (i + 2);
  }

  const modulo = (total % 11);

  if (modulo !== verificador) {
    return {
      error: 'Digito verificador es inválido',
    };
  }

  return {
    error: false
  };
}

function depurarNIT(nit = '') {
  let depurado = nit.replace(/[\s]+/ig, ''); // eliminamos espacios en blanco

  // si el contenido tiene uno más caracteres diferentes a .
  // eliminamos todos los puntos
  if (depurado.search(/[\dA-Za-z]+/ig) !== -1) {
    depurado = depurado.replace(/[.]+/ig, '');
  }

  if (depurado !== '.') {
    depurado = depurado.replace(/[.]+/ig, '');
  }

  depurado = (
    (
      depurado.startsWith('-', depurado.length - 2) ||
      depurado.startsWith('_', depurado.length - 2)
    ) ?
      depurado.substring(0, depurado.length - 2) + depurado.substring(depurado.length - 1, depurado.length) :
      depurado
  );

  depurado = depurado.replace(/k$/ig, 'K');


  if (depurado.toUpperCase() === 'C/F' || depurado.toUpperCase() === 'CONSUMIDORFINAL') {
    return 'CF';
  }


  return depurado;
}

/**
 * Función que permite válidar que un NIT guatemalteco sea válido
 * @see https://gist.github.com/rodrigopolo/0807e96a5331eb17e819f485d9a3c891#file-guatemala-nit-validation-in-javascript
 * @param {String} nit
 */
export function validarNIT(nit) {
  nit = depurarNIT(nit);

  let add = 0;
  let nd = /^(\d+)-?([\dk])$/i.exec(nit);

	if (nd) {
    nd[2] = (nd[2].toLowerCase()=='k')? 10: Number.parseInt(nd[2], 10);

		for (var i = 0; i < nd[1].length; i++) {
			add += ( (((i-nd[1].length)*-1)+1) * nd[1][i] );
    }

		return ((11 - (add % 11)) % 11) == nd[2];
	} else {
		return false;
	}
}
