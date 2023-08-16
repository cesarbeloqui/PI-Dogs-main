export default function filterDogsByTemperament(
  temperamentsToFilter,
  dogArray
) {
  return dogArray.filter((dog) => {
    return temperamentsToFilter.every((temperament) =>
      dog.temperament.includes(temperament)
    );
  });
}
