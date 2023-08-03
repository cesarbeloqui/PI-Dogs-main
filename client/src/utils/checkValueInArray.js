/* Esta función realiza lo siguiente:

Verifica si el primer argumento es un array y el segundo argumento es una cadena. Si no se cumple esta condición, la función arrojará un error.

Convierte el valor de búsqueda a minúsculas utilizando toLowerCase().

Utiliza el método some() del array para verificar si al menos un elemento del array coincide con el valor de búsqueda en minúsculas. Si encuentra una coincidencia, devuelve true; de lo contrario, devuelve false.
 */
const checkValueInArray = (arr, value) => {
    if (!Array.isArray(arr) || typeof value !== 'string') {
      throw new Error('Invalid input: First argument must be an array, and the second argument must be a string.');
    }
  
    const lowercaseValue = value.toLowerCase();
    return arr.some((item) => item.toLowerCase() === lowercaseValue);
  };

  export default checkValueInArray;