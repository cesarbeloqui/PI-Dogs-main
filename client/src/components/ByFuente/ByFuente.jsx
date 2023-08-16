import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { ALL, API, DB } from "../../utils/constants";
import {
  handleItemsSelectGlobal,
  modificaDogsByOrigen,
} from "../../redux/actions";
import style from "./ByFuente.module.css"
const ByFuente = () => {
  const option = useSelector((state) => state.filteredOrigen);
  const filteredTemperaments = useSelector(
    (state) => state.filteredTemperaments
  );
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  useEffect(() => {
    const filteredByOrigin =
      option === ALL
        ? filter // Si option es ALL, no se aplica ningún filtro
        : filter.filter((dog) => {
            if (typeof dog.id === "number") {
              return option === API;
            } else if (typeof dog.id === "string" && dog.id.length > 10) {
              return option === DB;
            } else {
              return true;
            }
          });

    dispatch(modificaDogsByOrigen(filteredByOrigin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, option, filteredTemperaments]);
  const handleItemsSelect = (event) => {
    dispatch(handleItemsSelectGlobal(event.target.value));
  };
  return (
    <div className={style.container}>
      <label htmlFor="itemsPerFuente">Razas por origen (API o DB)</label>
      <select id="itemsPerFuente" value={option} onChange={handleItemsSelect}>
        <option value={ALL}>{ALL}</option>
        <option value={API}>{API}</option>
        <option value={DB}>{DB}</option>
      </select>
    </div>
  );
};
export default ByFuente;
