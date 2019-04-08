export default (state = {}, action) => {
  switch (action.type) {
    case "FETCH_EXAMINATION":
      return { ...action.payload };
    case "ERROR":
      return { ...action.payload };
    default:
      return state;
  }
};
