import React from "react";
import style from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={style.mainContainer}>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <Link to="/create">
        <button>Form</button>
      </Link>
      <Link to="/detail">
        <button>Detail</button>
      </Link>
      <Link to="/">
        <button>LandingPage</button>
      </Link>
    </div>
  );
};
export default NavBar;
