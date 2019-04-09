export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_EXAMINATION":
      return { ...action.payload };
    case "ERROR":
      return { ...action.payload };
    case "RESET_EXAMINATION":
      return {};
    default:
      return state;
  }
};
