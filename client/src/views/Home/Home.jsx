import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import CardsConteiner from "../../components/CardsConteiner/CardsConteiner";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDogs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Estado para la cantidad de elementos por página
  const dataList = useSelector((state) => state.dogs);
  // Cálculo de los índices de los elementos que se mostrarán en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);
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
    <div>
      <div>
        <label htmlFor="itemsPerPage">Elementos por página:</label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={6 * 1}>{`${6 * 1}`}</option>
          <option value={6 * 2}>{`${6 * 2}`}</option>
          <option value={6 * 3}>{`${6 * 3}`}</option>
          <option value={6 * 4}>{`${6 * 4}`}</option>
          <option value={6 * 5}>{`${6 * 5}`}</option>
        </select>
        <div>
          {/* Botones de paginación */}
          {Array.from({
            length: Math.ceil(dataList.length / itemsPerPage),
          }).map((item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <CardsConteiner items={currentItems} />
      <div>
        {/* Botones de paginación */}
        {Array.from({ length: Math.ceil(dataList.length / itemsPerPage) }).map(
          (item, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Home;
