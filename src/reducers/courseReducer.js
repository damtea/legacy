import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_COURSES":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "CREATE_COURSE":
      return { ...state, [action.payload.id]: action.payload };
    case "ERROR":
      return { ...action.payload };
    case "RESET_COURSES":
      return {};
    default:
      return state;
  }
};
