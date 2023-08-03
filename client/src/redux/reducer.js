import { GET_DOGS, GET_TEMPERAMENTS } from "./actions-type";
const initialState = {
  dogs: [],
  /*
  detail: [],
  search: [],
  filter: [],
  order: [],
  page: 1,
  totalPages: 0, */
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, dogs: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    default:
      return { ...state };
  }
};
export default rootReducer;
