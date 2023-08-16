import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Logo from "../../Logo.png"

const NavBar = () => {
  return (
    <div className={style.container}>

    <div className={style.mainContainer}>
      <Link to="/home">
        <button className={style.button}>Home</button>
      </Link>
      <Link to="/create">
        <button className={style.button}>Crear Raza</button>
      </Link>
    </div>
    <img src={Logo} alt="" className={style.img} />
    </div>
  );
};
export default NavBar;
