import React from "react";
import style from "./CardsConteiner.module.css";
import Card from "../Card/Card";
const CardsConteiner = (props) => {
  const data = props.items
  return (
    <div className={style.CardsConteiner}>
      {data.map((dato) => {
        return (
          <Card
            id={dato.id}
            key={dato.id}
            image={dato.image}
            name={dato.name}
            weight={dato.weight}
            temperament={dato.temperament}
          />
        );
      })}
    </div>
  );
};
export default CardsConteiner;
