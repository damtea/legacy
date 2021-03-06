import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_PROGRAMME":
      return { ...state, [action.payload.id]: action.payload };
    case "FETCH_PROGRAMMES":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "ERROR":
      return { ...action.payload };
    case "DELETE_PROGRAMME":
      return _.omit(state, action.payload);
    case "EDIT_PROGRAMME":
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
