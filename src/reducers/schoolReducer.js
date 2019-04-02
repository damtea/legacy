import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_SCHOOL":
      return { ...state, [action.payload.id]: action.payload };
    case "FETCH_SCHOOLS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "ERROR":
      return { ...action.payload };
    default:
      return state;
  }
};
