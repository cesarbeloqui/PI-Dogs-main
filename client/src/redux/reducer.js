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
  MODIFICA_DOGS_NAME,
  CHANGE_NAME,
  MODIFICA_DOGS_PESO,
  CHANGE_PESO,
} from "./actions-type";
import { ALL, SIN } from "../utils/constants";
const initialState = {
  dogs: [],
  /*
  detail: [],
  search: [],
  order: [],
  page: 1,
  totalPages: 0, */
  filter: [],
  temperaments: [],
  nameDogs: [],
  bandera: { temperament: false, origen: false },
  filteredTemperaments: [],
  filteredOrigen: ALL,
  filterOrigen: [],
  filterName: [],
  filteredName: SIN,
  filterPeso: [],
  filteredPeso: SIN,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAME_DOGS:
      return { ...state, nameDogs: action.payload };
    case CHANGE_TEMPERAMENTS:
      return { ...state, filteredTemperaments: action.payload };
    case BANDERA:
      return {
        ...state,
        bandera: {
          ...state.bandera,
          [action.payload]: true,
        },
      };
    case GET_DOGS:
      return { ...state, dogs: action.payload };
    case GET_DOGS_BYNAME:
      return { ...state, dogs: action.payload };
    case MODIFICA_DOGS:
      return { ...state, filter: action.payload };
    case MODIFICA_DOGS_ORIGEN:
      return { ...state, filterOrigen: action.payload };
    case CHANGE_ORIGEN:
      return { ...state, filteredOrigen: action.payload };
    case CHANGE_NAME:
      return { ...state, filteredName: action.payload };
    case MODIFICA_DOGS_NAME:
      return { ...state, filterName: action.payload };
    case CHANGE_PESO:
      return { ...state, filteredPeso: action.payload };
    case MODIFICA_DOGS_PESO:
      return { ...state, filterPeso: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
