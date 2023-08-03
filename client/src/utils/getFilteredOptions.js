const getFilteredOptions = (options, value) => {
  if (!value) {
    return options;
  }

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  // Ordenar las coincidencias por cercanía al valor del input (longitud de la diferencia)


  return filteredOptions;
};
export default getFilteredOptions;
