import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_BATCH":
      return { ...state, [action.payload.id]: action.payload };
    case "FETCH_BATCHS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "ERROR":
      return { ...action.payload };
    default:
      return state;
  }
};
