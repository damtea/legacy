import api from "../api/api";

export const createStudent = formValues => async dispatch => {
  try {
    const response = await api.post("/student/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_STUDENT", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchStudents = () => {
  return async dispatch => {
    try {
      const response = await api.get("/student/?format=json");
      dispatch({ type: "FETCH_STUDENTS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
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

export const editStudent = (id, formValues) => {
  return async dispatch => {
    try {
      const response = await api.patch(`/student/${id}/?format=json`, {
        ...formValues
      });
      dispatch({ type: "EDIT_STUDENT", payload: response.data });
    } catch (error) {
      alert(error);
    }
  };
};
export const deleteStudent = id => {
  return async dispatch => {
    await api.delete(`/student/student/${id}`);
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };
};

export const createProgramme = formValues => async dispatch => {
  try {
    const response = await api.post("/programme/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_PROGRAMME", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchProgrammes = () => {
  return async dispatch => {
    const response = await api.get("/programme/?format=json");
    dispatch({ type: "FETCH_PROGRAMMES", payload: response.data });
  };
};
export const editProgramme = (id, formValues) => {
  return async dispatch => {
    try {
      const response = await api.patch(`/programme/${id}/?format=json`, {
        ...formValues
      });
      dispatch({ type: "EDIT_PROGRAMME", payload: response.data });
    } catch (error) {
      alert(error);
    }
  };
};
export const deleteProgramme = id => {
  return async dispatch => {
    await api.delete(`/programme/${id}`);
    dispatch({ type: "DELETE_PROGRAMME", payload: id });
  };
};

export const createDepartment = formValues => async dispatch => {
  try {
    const response = await api.post("/department/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_DEPARTMENT", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchDepartments = () => {
  return async dispatch => {
    const response = await api.get("/department/?format=json");
    dispatch({ type: "FETCH_DEPARTMENTS", payload: response.data });
  };
};

export const createSchool = formValues => async dispatch => {
  try {
    const response = await api.post("/school/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_SCHOOL", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchSchools = () => {
  return async dispatch => {
    const response = await api.get("/school/?format=json");
    dispatch({ type: "FETCH_SCHOOLS", payload: response.data });
  };
};

export const createScheme = formValues => async dispatch => {
  try {
    const response = await api.post("/scheme/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_SCHEME", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchSchemes = () => {
  return async dispatch => {
    const response = await api.get("/scheme/?format=json");
    dispatch({ type: "FETCH_SCHEMES", payload: response.data });
  };
};

export const createBatch = formValues => async dispatch => {
  try {
    const response = await api.post("/admissionbatch/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_BATCH", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchBatchs = () => {
  return async dispatch => {
    const response = await api.get("/admissionbatch/?format=json");
    dispatch({ type: "FETCH_BATCHS", payload: response.data });
  };
};

export const fetchExamination = id => {
  return async dispatch => {
    try {
      const response = await api.get(`/examination/${id}`);
      dispatch({ type: "FETCH_EXAMINATION", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { name: "Search Not Found" } });
    }
  };
};

export const fetchCourses = () => {
  return async dispatch => {
    const response = await api.get("/course/?format=json");
    dispatch({ type: "FETCH_COURSES", payload: response.data });
  };
};
