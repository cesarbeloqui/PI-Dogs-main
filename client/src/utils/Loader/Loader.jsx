import React from 'react';
import style from './Loader.module.css'; // Archivo CSS con los estilos del loader

const Loader = () => {
  return (
    <div className={style.ldsRoller}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;