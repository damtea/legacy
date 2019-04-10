import _ from "lodash";
export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_STUDENTS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "FETCH_STUDENT":
      return { ...state, [action.payload.id]: action.payload };
    case "CREATE_STUDENT":
      return { ...state, [action.payload.id]: action.payload };
    case "ERROR":
      return { ...action.payload };
    case "DELETE_STUDENT":
      return _.omit(state, action.payload);
    case "EDIT_STUDENT":
      return { ...state, [action.payload.id]: action.payload };
    case "RESET_STUDENT":
      return {};
    default:
      return state;
  }
};
