export default (state = {}, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...action.payload };
    case "AUTH_FAIL":
      return { ...action.payload };
    default:
      return state;
  }
};
