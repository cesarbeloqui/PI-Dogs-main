const buscarSimilitudes = (name, objetos) => {
  const nombreBuscado = name.toLowerCase();

  return objetos.filter((objeto) => {
    const nombreObjeto = objeto.name.toLowerCase();
    return nombreObjeto.includes(nombreBuscado);
  });
};

module.exports = buscarSimilitudes;
