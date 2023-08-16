import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
import LoaderCard from "../../utils/LoaderCard/LoaderCard";
import {SERVER} from "../../redux/actions-type"


const Detail = () => {
  const { idDog } = useParams();
  const [response, setResponse] = useState({});
  const [imagenCargada, setImagenCargada] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${SERVER}/dogs/${idDog}`;
      try {
        const response = await axios.get(url);
        setResponse(response.data);
      } catch (error) {
        // Manejo de errores
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idDog]);

  const handleImagenCargada = () => {
    setImagenCargada(true);
  };

  const { id, image, name, weight, temperament, height, life_span } = response;
  console.log(typeof id);

  return (
    <div className={style.container}>
      <h1>Información detallada de la raza: {name}</h1>
      <div className={style.content}>
        <div className={style.cardContainer}>
          <div className={style.column}>
            <div className={style.containerImage}>
              <div className={style.api}>
                <p>{typeof id === "number" ? `API` : "DB"}</p>
              </div>
              {!imagenCargada && (
                <>
                  <img
                    src={image}
                    alt={name}
                    onLoad={handleImagenCargada}
                    style={{ opacity: 0 }}
                    className={style.image}
                  />
                  <LoaderCard />
                </>
              )}
              {imagenCargada && (
                <img src={image} alt={name} className={style.image} />
              )}
            </div>
            <div className={style.data}>
              <table>
                <tr>
                  <th>Id:</th>
                  <td>{id}</td>
                </tr>
                <tr>
                  <th>Nombre de la Raza:</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>Peso:</th>
                  <td>{weight} kg</td>
                </tr>
                <tr>
                  <th>Tiene los temperamentos:</th>
                  <td>{temperament && temperament.join(", ")}</td>
                </tr>
                <tr>
                  <th>Altura:</th>
                  <td>{height} cm</td>
                </tr>
                <tr>
                  <th>Esperanza de vida:</th>
                  <td>{life_span}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
