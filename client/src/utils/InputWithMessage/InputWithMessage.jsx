import React, { useState, useEffect } from "react";
import style from "./InputWithMessage.module.css";

const InputWithMessage = ({
  type,
  value,
  onChange,
  list,
  placeholder,
  Message,
  valid=null,
}) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const change = (e) => {
    onChange(e); // Llama a la función onChange para actualizar el valor del input
  };
  useEffect(() => {
    // Actualiza el mensaje solo cuando el input está enfocado
    if (isFocused) {
      showMessage(Message);
    } else {
      hideMessage();
    }
  }, [value, Message, isFocused]);

  const showMessage = (mess) => {
    setMessage(mess);
  };

  const hideMessage = () => {
    setMessage("");
  };



  return (
    <div className={style.inputContainer}>
      <input
        type={type}
        value={value}
        onChange={change}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        list={list}
        className={valid !== null ? (valid ? style.true : style.false) : ""}
      />
      {isFocused && message && <div className={style.message}>{message}</div>}
    </div>
  );
};

export default InputWithMessage;
