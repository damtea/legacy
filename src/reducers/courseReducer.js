import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_COURSES":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "ERROR":
      return { ...action.payload };
    default:
      return state;
  }
};
