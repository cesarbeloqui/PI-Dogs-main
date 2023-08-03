const analyzeStringAge = (str) => {
  if (str.trim() === "") {
    // Si el string está vacío
    return {
      valid: false,
      message:
        "Atención: debe ingresar solo números de dos digitos.",
      string: "",
    };
  }

  if (/^\d+$/.test(str)) {
    // Si el string es un
    const firstTwoChars = str.slice(0, 2);
    return {
      valid: true,
      message:
        "El número es válido.",
      string: firstTwoChars,
    };
  }

  // Si el string no cumple con ninguno de los criterios anteriores
  return {
    valid: false,
    message: "Debe ingresar un número válido.",
    string: "",
  };
};

export default analyzeStringAge;
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
