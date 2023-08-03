import React, { useState } from "react";
import styles from "./CustomDatalist.module.css";
import { capitalizeFirstLetter } from "../capitalizeFirstLetter";
import getFilteredOptions from "../getFilteredOptions";

const CustomDatalist = ({ options, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!isFocused) {
        setInputValue("");
      }
      setIsFocused(false);
  };
  const temperaments = options.map((option) => option.name);
  const handleInputChange = (e) => {
    const inputValue = capitalizeFirstLetter(e.target.value);
    setInputValue(inputValue);
    setSelectedOption(null);
  };
  const handleOptionMouseDown = (option) => {
    setSelectedOption(option);
    setInputValue("");
    onChange(option);
  };
  const filteredOptions = getFilteredOptions(temperaments, inputValue);
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className={styles.input}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
      {isFocused && <ul className={styles.options}>
        {filteredOptions.map((option) => (
          <li key={option}  onMouseDown={() => handleOptionMouseDown(option)}>
            {option}
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default CustomDatalist;
