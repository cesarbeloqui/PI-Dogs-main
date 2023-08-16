import React, { useEffect, useState } from "react";
import style from "./Card.module.css";
import LoaderCard from "../../utils/LoaderCard/LoaderCard";
import {Link} from "react-router-dom"

const Card = (props) => {
  const [imagenCargada, setImagenCargada] = useState(false);
  useEffect(() => {
    setImagenCargada(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.image]);

  const handleImagenCargada = () => {
    setImagenCargada(true);
  };
  return (
    <div className={style.cardContainer}>
      <div className={style.column}>
        <div className={style.containerImage}>
        <Link to={`../detail/${props.id}`}>
          <div className={style.api}>
            <p>{typeof props.id === "number" ? `API` : "DB"}</p>
          </div>
          {!imagenCargada && (
            <><img
            src={props.image}
            alt={props.name}
            onLoad={handleImagenCargada}
            style={{ opacity: 0 }}
            className={style.image} /><LoaderCard /></>
          )}
          {imagenCargada && (
            <img src={props.image} alt={props.name} className={style.image} />
          )}

        </Link>
        </div>
        <div className={style.data}>
          <p>Nombre: {props.name}</p>
          <p>Peso: {props.weight}</p>
          <p>Temperamentos: {props.temperament.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
