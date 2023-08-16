import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import CardsConteiner from "../../components/CardsConteiner/CardsConteiner";
import { useSelector, useDispatch } from "react-redux";
import { getDogs, getTemperaments } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterDogsByTemperaments from "../../components/FilterDogsByTemperaments/FilterDogsByTemperaments";
import ByFuente from "../../components/ByFuente/ByFuente";
import ByName from "../../components/ByName/ByName";
import ByPeso from "../../components/ByPeso/ByPeso";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs);
    dispatch(getTemperaments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Estado para la cantidad de elementos por página
  const dataListDogs = useSelector((state) => state.filterPeso);

  // Cálculo de los índices de los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataListDogs.slice(indexOfFirstItem, indexOfLastItem);
  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Cambiar la cantidad de elementos por página
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reiniciar la página actual al cambiar la cantidad de elementos por página
  };

  return (
    
    <div className={style.container}>
      <div className={style.SearchBar}>
        <FilterDogsByTemperaments />
        <SearchBar />
      </div>
      <div className={style.container2}>
        <div className={style.filters}>
        <ByFuente />
        <ByName />
        <ByPeso />
        </div>
        <div>
          <div className={style.itemsPerPage}>
            <div className={style.SelectButton}>
              {" "}
              {/* Botones de paginación */}
              {Array.from({
                length: Math.ceil(dataListDogs.length / itemsPerPage),
              }).map((_item, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  disabled={index + 1 === currentPage}
                  className={style.buttonPerPage}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className={style.Datalist}>
              <label htmlFor="itemsPerPage">Elementos por página:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={8 * 1}>{`${8 * 1}`}</option>
                <option value={8 * 2}>{`${8 * 2}`}</option>
                <option value={8 * 3}>{`${8 * 3}`}</option>
                <option value={8 * 4}>{`${8 * 4}`}</option>
                <option value={8 * 5}>{`${8 * 5}`}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <CardsConteiner items={currentItems} />
      <div className={style.itemsPerPageEnd}>
        <div className={style.SelectButtonEnd}>
          {" "}
          {/* Botones de paginación */}
          {Array.from({
            length: Math.ceil(dataListDogs.length / itemsPerPage),
          }).map((_item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
              className={style.buttonPerPageEnd}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
