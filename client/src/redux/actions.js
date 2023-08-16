import axios from "axios";
import checkValueInArray from "../utils/checkValueInArray";
import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BYNAME,
  GET_NAME_DOGS,
  MODIFICA_DOGS,
  BANDERA,
  CHANGE_TEMPERAMENTS,
  CHANGE_ORIGEN,
  MODIFICA_DOGS_ORIGEN,
  CHANGE_NAME,
  MODIFICA_DOGS_NAME,
  CHANGE_PESO,
  MODIFICA_DOGS_PESO,
  SERVER,
} from "./actions-type";

export const getDogs = async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER}/dogs`);
    const dogs = response.data;
    const dogsName = dogs.map((dog) => dog.name);
    dispatch({ type: GET_DOGS, payload: dogs });
    dispatch({ type: GET_NAME_DOGS, payload: dogsName });
  } catch (error) {
    // Manejar el error si la llamada a la API falla
    console.error("Error fetching dogs:", error);
  }
};
export const getTemperaments = async (dispatch) => {
  try {
    const response = await axios.get(`${SERVER}/temperaments`);
    const temperaments = response.data;
    dispatch({ type: GET_TEMPERAMENTS, payload: temperaments });
  } catch (error) {
    // Manejar el error si la llamada a la API falla
    console.error("Error fetching temperaments:", error);
  }
};
export const getDogsbyName = (name) => async (dispatch) => {
  const endpoint = `${SERVER}/dogs/name?name=${name}`;
  try {
    if (name) {
      const response = await axios.get(endpoint);
      const dogs = response.data;
      dispatch({ type: GET_DOGS_BYNAME, payload: dogs });
    } else {
      const response = await axios.get(`${SERVER}/dogs`);
      const dogs = response.data;
      dispatch({ type: GET_DOGS, payload: dogs });
    }
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
};
export const modificaDogsByTempetament = (filteredDogs, KEY) => (dispatch) => {
  dispatch({ type: BANDERA, payload: { [KEY]: true } });
  dispatch({ type: MODIFICA_DOGS, payload: filteredDogs });
};

export const handleTemperamentChangeGlobal =
  (selectedTemperament, filteredTemperaments) => (dispatch) => {
    if (!checkValueInArray(filteredTemperaments, selectedTemperament)) {
      dispatch({
        type: CHANGE_TEMPERAMENTS,
        payload: [...filteredTemperaments, selectedTemperament],
      });
    } else {
      dispatch({ type: CHANGE_TEMPERAMENTS, payload: [selectedTemperament] });
    }
  };
export const handleRemoveTemperamentGlobal =
  (filteredTemperaments, temperament) => (dispatch) => {
    const updatedTemperaments = [...filteredTemperaments];
    const newfilteredTemperaments = updatedTemperaments.filter(
      (temp) => temp !== temperament
    ); // Eliminar 1 elemento en el nombre de temperamento especificado
    dispatch({ type: CHANGE_TEMPERAMENTS, payload: newfilteredTemperaments });
  };
export const handleResetTemperamentsGlobal = () => (dispatch) => {
  dispatch({ type: CHANGE_TEMPERAMENTS, payload: [] });
};

export const handleItemsSelectGlobal = (value) => (dispatch) => {
  dispatch({ type: CHANGE_ORIGEN, payload: value });
};

export const modificaDogsByOrigen = (filteredDogs) => (dispatch) => {
  dispatch({ type: MODIFICA_DOGS_ORIGEN, payload: filteredDogs });
};
export const handleItemsSelectGlobalName = (value) => (dispatch) => {
  dispatch({ type: CHANGE_NAME, payload: value });
};

export const modificaDogsByName = (filteredDogs) => (dispatch) => {
  dispatch({ type: MODIFICA_DOGS_NAME, payload: filteredDogs });
};
export const handleItemsSelectGlobalPeso = (value) => (dispatch) => {
  dispatch({ type: CHANGE_PESO, payload: value });
};

export const modificaDogsByPeso = (filteredDogs) => (dispatch) => {
  dispatch({ type: MODIFICA_DOGS_PESO, payload: filteredDogs });
};
