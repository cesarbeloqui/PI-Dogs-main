import React from "react";
import style from "./ByPeso.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ASC, DES, SIN } from "../../utils/constants";
import { handleItemsSelectGlobalPeso } from "../../redux/actions";
import { useEffect } from "react";
import { modificaDogsByPeso } from "../../redux/actions";
const ByPeso = () => {
  const dispatch = useDispatch();
  const filterName = useSelector((state) => state.filterName);
  const filteredPeso = useSelector((state) => state.filteredPeso);
  const filteredName = useSelector((state) => state.filteredName);
  useEffect(() => {
    // Función para calcular el promedio de peso
    const calculateWeightAverage = (weight) => {
      const [min, max] = weight.split(" - ");

      if (max) {
        return (parseInt(min) + parseInt(max)) / 2;
      } else {
        return parseInt(min);
      }
    };
    // Ordenar por promedio de peso ascendente
    const sortedByWeightAsc = [...filterName].sort((a, b) => {
      const avgA = calculateWeightAverage(a.weight);
      const avgB = calculateWeightAverage(b.weight);
      return avgA - avgB;
    });

    // Ordenar por promedio de peso descendente
    const sortedByWeightDesc = [...filterName].sort((a, b) => {
      const avgA = calculateWeightAverage(a.weight);
      const avgB = calculateWeightAverage(b.weight);
      return avgB - avgA;
    });
    if (filteredPeso === ASC) {
      dispatch(modificaDogsByPeso(sortedByWeightAsc));
    } else if (filteredPeso === DES) {
      dispatch(modificaDogsByPeso(sortedByWeightDesc));
    } else {
      dispatch(modificaDogsByPeso(filterName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName, filteredPeso, filteredName]);

  const handleItemsSelect = (e) => {
    dispatch(handleItemsSelectGlobalPeso(e.target.value));
  };
  return (
    <div className={style.container}>
      <label htmlFor="itemsPerPeso">Razas por Peso (Asc, Des o Sin)</label>
      <select
        id="itemsPerPeso"
        value={filteredPeso}
        onChange={handleItemsSelect}
      >
        <option value={ASC}>{ASC}</option>
        <option value={DES}>{DES}</option>
        <option value={SIN}>{SIN}</option>
      </select>
    </div>
  );
};

export default ByPeso;
