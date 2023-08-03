import React, { useState } from "react";
import "./CustomButton.css"; // Archivo CSS con los estilos del botón

const CustomButton = ({ value, onChange, disabledMessage, buttonText }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleButtonClick = (e) => {
    if (value) {
      e.preventDefault();
      onChange(e); // Llamar al onChange solo si el botón está habilitado (value = true)
    }
  };

  const handleMouseEnter = () => {
    if (disabledMessage) {
      setIsFocused(true); // Establecer isFocused en true cuando el botón está deshabilitado y el cursor entra
    }
  };

  const handleMouseLeave = () => {
    setIsFocused(false); // Establecer isFocused en false cuando el cursor sale del botón
  };

  return (
    <div className="container">
      <button
        className={`custom-button ${value ? "enabled" : "disabled"}`}
        onClick={
          value
            ? handleButtonClick
            : (e) => {
                e.preventDefault();
              }
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {buttonText}
      </button>
      {isFocused && disabledMessage && (
        <div className="message-container">
          <div className="message">{disabledMessage}</div>
        </div>
      )}
    </div>
  );
};

export default CustomButton;
