import { useEffect, useState } from "react";
import React from "react";
import { getDogsbyName } from "../../redux/actions";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const nameDogs = useSelector((state) => state.nameDogs);
  useEffect(() => {
    dispatch(getDogsbyName(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameDogs, search]);
  const onChange = (e) => {
    if (e.target.value.length === 0) {
      setSearch("");
    }
    setInput(e.target.value);
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearch(input);
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setSearch(input)}>
        Search
      </button>
      <input
        className={styles.input}
        value={input}
        onChange={onChange}
        placeholder="Search"
        onKeyDown={onKeyDown}
        list="dogNames"
      />
      {/* Datalist with options from nameDogs */}
      <datalist id="dogNames" className={styles.datalist}>
        {nameDogs.map((dogName) => (
          <option key={dogName} value={dogName} />
        ))}
      </datalist>
        <button className={styles.button2} onClick={() => setSearch("")}>
          Atras
        </button>

    </div>
  );
};
export default SearchBar;
