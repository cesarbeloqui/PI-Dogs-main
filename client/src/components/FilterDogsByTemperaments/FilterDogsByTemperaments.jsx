import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomDatalist from "../../utils/CustomDatalist/CustomDatalist";
import filterDogsByTemperament from "../../utils/filterDogsByTemperament";
import { modificaDogsByTempetament } from "../../redux/actions";
import styles from "./FilterDogsByTemperament.module.css";
import {
  handleTemperamentChangeGlobal,
  handleRemoveTemperamentGlobal,
  handleResetTemperamentsGlobal,
} from "../../redux/actions";
const KEY = "temperament";

const FilterDogsByTemperaments = () => {
  //const [filteredTemperaments, setFilteredTemperaments] = useState([]);
  const filteredTemperaments = useSelector(
    (state) => state.filteredTemperaments
  );
  const dataListTemperaments = useSelector((state) => state.temperaments);
  /*   const filter = useSelector((state) => state.filter); */
  const dataListDogs = useSelector((state) => state.dogs);
  const filteredOrigen = useSelector((state) => state.filteredOrigen);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const showMessageFor3Seconds = (algo) => {
    setMessage(algo);
    setTimeout(() => {
      setMessage("");
    }, 3000); // 3000 milisegundos = 3 segundos
  };

  useEffect(() => {
    if (filteredTemperaments.length > 0) {
      const lastElement = filteredTemperaments[filteredTemperaments.length - 1];
      const filteredDogs = filterDogsByTemperament(
        filteredTemperaments,
        dataListDogs
      );
      if (/* !bandera &&  */ filteredDogs.length > 0) {
        dispatch(modificaDogsByTempetament(filteredDogs, KEY));
        setMessage("");
      } else {
        filteredTemperaments.pop();
        showMessageFor3Seconds(
          `No se encontró una Raza con el temperamento ${lastElement}`
        );
      }
    } else {
      dispatch(modificaDogsByTempetament(dataListDogs));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataListDogs, filteredTemperaments, filteredOrigen]);

  const handleTemperamentChange = (selectedTemperament) => {
    dispatch(
      handleTemperamentChangeGlobal(selectedTemperament, filteredTemperaments)
    );
  };
  const handleRemoveTemperament = (temperament) => {
    dispatch(handleRemoveTemperamentGlobal(filteredTemperaments, temperament));
  };
  const handleResetTemperaments = () => {
    dispatch(handleResetTemperamentsGlobal());
  };
  return (
    <div className={styles.container}>
      <CustomDatalist
        options={dataListTemperaments}
        onChange={handleTemperamentChange}
        placeholder="Temperamentos"
      />
      {message && <div className={styles.message}>{message}</div>}
      <button className={styles.button}
        type="button"
        key="filterAllTemperament"
        onClick={() => handleResetTemperaments()}
      >
        Limpiar
      </button>
      {filteredTemperaments.map((temperament) => (
        <button className={styles.button2}
          type="button"
          key={temperament}
          onClick={() => handleRemoveTemperament(temperament)}
        >
          {temperament}
        </button>
      ))}
    </div>
  );
};
export default FilterDogsByTemperaments;
