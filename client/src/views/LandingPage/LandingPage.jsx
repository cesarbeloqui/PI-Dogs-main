import React from "react";
import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";
import Logo from "../../Logo.png";

const LandingPage = () => {
  const preventContextMenu = (event) => {
    event.preventDefault();
  };
  return (
    <div className={style.container}>
      <div className={style.column1}>
        <div className={style.buttonLogo}>
          <Link to="/home">
            <button
              className={style.button}
              onContextMenu={preventContextMenu}
              type="button"
            >
              Home
            </button>
          </Link>
          <img src={Logo} alt="" className={style.logo} />
        </div>
        <h1 className={style.title}>¡Bienvenido!</h1>
        <h2 className={style.h2}>
          ¿Quieres saber más sobre las Razas de Perros?
        </h2>
        <p className={style.p}>
          Descubre las razas caninas más famosas, sus temperamentos únicos y
          filtra según tus preferencias. Te ofrecemos un espacio para conocer a
          fondo estas personalidades, facilitando elecciones informadas en tu
          búsqueda del compañero ideal. ¿No encuentras tu raza favorita? ¡Crea
          la tuya en nuestra sección "Crear Raza"!
        </p>
      </div>
      <div className={style.column2}>
        <div className={style.box1}></div>
        <div className={style.img}>
          <img src="https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg" alt="" />
        </div>
        <div className={style.img}>
          <img src="https://cdn2.thedogapi.com/images/SkJ3blcN7.jpg" alt="" />
        </div>
        <div className={style.img}>
          <img src="https://cdn2.thedogapi.com/images/Byz6mgqEQ.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
