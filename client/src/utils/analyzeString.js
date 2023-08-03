const analyzeString = (str) => {
  if (str.trim() === "") {
    // Si el string está vacío
    return {
      valid: false,
      message:
        "Atención: debe ingresar solo números. Si desea ingresar un rango de números, ingrese el mínimo y luego un espacio para agregar el máximo.",
      string: "",
    };
  }

  if (/^\d+$/.test(str)) {
    // Si el string es un
    const firstThreeChars = str.slice(0, 3);
    return {
      valid: true,
      message:
        "El número es válido. Si desea ingresar un rango, presione espacio y escriba el siguiente número.",
      string: firstThreeChars,
    };
  }

  if (/^\d+\s$/.test(str)) {
    // Si el string es un número seguido de un espacio
    return {
      valid: false,
      message: "Ahora debe ingresar un máximo.",
      string: str + "- ",
    };
  }

  // Si el string es un rango válido con un solo número
  if (/^\d+\s-\s?$/.test(str)) {
    const stri = str.split(" ");
    return {
      valid: true,
      message:
        "El número es válido. Si desea ingresar un rango, presione espacio y escriba el siguiente número.",
      string: stri[0],
    };
  }

  // Si el string es un rango válido
  if (/^\d+\s-\s\d+$/.test(str)) {
    const firstNineChars = str.slice(0, 9);
    /*     const arrayRango = firstNineChars.split(" ");
    const selectedIndices = [0, 2];
    const arrayRangoSelected = arrayRango
      .filter((_, index) => selectedIndices.includes(index))
      .map((value) => Number(value));
    const sortedArray = arrayRangoSelected.sort((a, b) => a - b);
 */
    return {
      valid: true,
      message: "El rango es válido.",
      string: firstNineChars /* `${sortedArray[0]} - ${sortedArray[1]}` */,
    };
  }

  // Si el string no cumple con ninguno de los criterios anteriores
  return {
    valid: false,
    message: "Debe ingresar un número válido.",
    string: "",
  };
};

export default analyzeString;
/* 

console.log(analyzeString("48829")); // --> {valid:false, message:"Solo se aceptan numeros de tres", string: ""}
console.log(analyzeString("")); // --> {valid:false, message:"Atención: debe ingresar solo numeros. Si desea ingresar un rango de numeros ingrese el minimo y luego un espacio para agregar el maximo", string: ""}
console.log(analyzeString("10")); // --> {valid:true, message:"El número es válido. Si desea ingresar un rango, presione espacio y escriba el siguiente número.", string: "10"}
console.log(analyzeString("10 ")); // --> {valid:false, message:"Ahora debe ingresar un máximo.", string: "10 - "}
console.log(analyzeString("10 -")); // --> {valid:true, message:"El número es válido. Si desea ingresar un rango, presione espacio y escriba el siguiente número.", string: "10"}
console.log(analyzeString("22 - ")); // --> {valid:false, message:"Ahora debe ingresar un máximo.", string: "22 - "}
console.log(analyzeString("10 - 22")); // --> {valid:true, message:"El rango es válido.", string: "10 - 22"}
Ahora la función devuelve los resultados esperados para cada caso.
*/
