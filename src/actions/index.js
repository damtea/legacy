import api from "../api/api";

export const createStudent = formValues => async dispatch => {
  try {
    const response = await api.post("/student", { ...formValues });
    dispatch({ type: "CREATE_STUDENT", payload: response.data });
  } catch (error) {
    alert("Already Exits");
  }
};

export const fetchStudents = () => {
  return async dispatch => {
    const response = await api.get("/student");
    dispatch({ type: "FETCH_STUDENTS", payload: response.data });
  };
};

export const fetchStudent = id => {
  return async dispatch => {
    try {
      const response = await api.get(`/student/${id}`);
      dispatch({ type: "FETCH_STUDENT", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { name: "Search Not Found" } });
    }
  };
};

export const createProgramme = formValues => async dispatch => {
  try {
    const response = await api.post("/programme", { ...formValues });
    dispatch({ type: "CREATE_PROGRAMME", payload: response.data });
  } catch (error) {
    alert("Already Exits");
  }
};

export const fetchProgrammes = () => {
  return async dispatch => {
    const response = await api.get("/programme");
    dispatch({ type: "FETCH_PROGRAMMES", payload: response.data });
  };
};

export const createDepartment = formValues => async dispatch => {
  try {
    const response = await api.post("/department/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_DEPARTMENT", payload: response.data });
  } catch (error) {
    alert("Already Exits");
  }
};

export const fetchDepartments = () => {
  return async dispatch => {
    const response = await api.get("/department/?format=json");
    dispatch({ type: "FETCH_DEPARTMENTS", payload: response.data });
  };
};
