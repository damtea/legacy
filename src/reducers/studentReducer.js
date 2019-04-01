import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_STUDENT":
      return { ...action.payload };
    case "CREATE_STUDENT":
      return { ...state, [action.payload.id]: action.payload };
    case "ERROR":
      return { ...action.payload };
    default:
      return state;
  }
};
