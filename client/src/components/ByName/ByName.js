import React from "react";
import style from "./ByName.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ASC, DES, SIN } from "../../utils/constants";
import { handleItemsSelectGlobalName } from "../../redux/actions";
import { useEffect } from "react";
import { modificaDogsByName } from "../../redux/actions";

const ByName = () => {
  const dispatch = useDispatch();
  const filterOrigen = useSelector((state) => state.filterOrigen);
  const filteredName = useSelector((state) => state.filteredName);
  const filteredOrigen = useSelector((state) => state.filteredOrigen);
  useEffect(() => {
    const sortedByNameAsc = [...filterOrigen].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const sortedByNameDesc = [...filterOrigen].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    if (filteredName === ASC) {
        dispatch(modificaDogsByName(sortedByNameAsc));
     }else if (filteredName === DES) {
        dispatch(modificaDogsByName(sortedByNameDesc));
     }else{
        dispatch(modificaDogsByName(filterOrigen));
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOrigen, filteredName, filteredOrigen]);

  const handleItemsSelect = (e) => {
    console.log(e.target.value);
    dispatch(handleItemsSelectGlobalName(e.target.value));
  };

  return (
    <div className={style.container}>
      <label htmlFor="itemsPerName">
        Razas por Nombre (Asc, Des o Desord.)
      </label>
      <select
        id="itemsPerName"
        value={filteredName}
        onChange={handleItemsSelect}
      >
        <option value={ASC}>{ASC}</option>
        <option value={DES}>{DES}</option>
        <option value={SIN}>{SIN}</option>
      </select>
    </div>
  );
};

export default ByName;
