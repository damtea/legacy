import api from "../api/api";

export const createStudent = formValues => async dispatch => {
  try {
    const response = await api.post("/core/student/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_STUDENT", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const authSubmit = formValues => async dispatch => {
  try {
    const response = await api.post("/user/login", {
      ...formValues
    });

    if (
      response.data.message === "Authentication successful" &&
      response.data.token
    ) {
      localStorage.setItem("token", response.data.token);

      return dispatch({ type: "AUTH_SUCCESS", payload: response.data });
    }
    return dispatch({ type: "AUTH_FAIL", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const logout = () => async dispatch => {
  try {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      return dispatch({
        type: "AUTH_FAIL",
        payload: { message: "Authentication failed" }
      });
    }
    return dispatch({
      type: "AUTH_FAIL",
      payload: { message: "Authentication failed" }
    });
  } catch (error) {
    alert(error);
  }
};

export const authCheck = () => async dispatch => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/checkAuth", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (response.data.message === "Authentication successful") {
        return dispatch({ type: "AUTH_SUCCESS", payload: response.data });
      }
      return dispatch({ type: "AUTH_FAIL", payload: response.data });
    } catch (error) {
      alert(error);
    }
  }
  return dispatch({
    type: "AUTH_FAIL",
    payload: { message: "Authentication failed" }
  });
};

export const fetchStudents = () => {
  return async dispatch => {
    try {
      const response = await api.get("/core/student/?format=json");
      dispatch({ type: "FETCH_STUDENTS", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchStudent = id => {
  return async dispatch => {
    try {
      const response = await api.get(`/core/student/${id}`);
      dispatch({ type: "FETCH_STUDENT", payload: response.data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: { name: "Search Not Found" } });
    }
  };
};

export const resetStudent = () => {
  return async dispatch => {
    await dispatch({ type: "RESET_STUDENT" });
  };
};

export const resetExamination = () => {
  return async dispatch => {
    await dispatch({ type: "RESET_EXAMINATION" });
  };
};

export const resetCourses = () => {
  return async dispatch => {
    await dispatch({ type: "RESET_COURSES" });
  };
};

export const editStudent = (id, formValues) => {
  return async dispatch => {
    try {
      const response = await api.patch(`/core/student/${id}/?format=json`, {
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
    await api.delete(`/core/student/${id}`);
    dispatch({ type: "DELETE_STUDENT", payload: id });
  };
};

export const createProgramme = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/degree/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_PROGRAMME", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchProgrammes = () => {
  return async dispatch => {
    const response = await api.get("/academic/degree/?format=json");
    dispatch({ type: "FETCH_PROGRAMMES", payload: response.data });
  };
};
export const editProgramme = (id, formValues) => {
  return async dispatch => {
    try {
      const response = await api.patch(`/academic/degree/${id}/?format=json`, {
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
    await api.delete(`/academic/degree/${id}`);
    dispatch({ type: "DELETE_PROGRAMME", payload: id });
  };
};

export const createDepartment = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/department/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_DEPARTMENT", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchDepartments = () => {
  return async dispatch => {
    const response = await api.get("/academic/department/?format=json");
    dispatch({ type: "FETCH_DEPARTMENTS", payload: response.data });
  };
};

export const createSchool = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/school/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_SCHOOL", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchSchools = () => {
  return async dispatch => {
    const response = await api.get("/academic/school/?format=json");
    dispatch({ type: "FETCH_SCHOOLS", payload: response.data });
  };
};

export const createScheme = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/scheme/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_SCHEME", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchSchemes = () => {
  return async dispatch => {
    const response = await api.get("/academic/scheme/?format=json");
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

//Branch

export const createBranch = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/branch/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_BRANCH", payload: response.data });
  } catch (error) {
    alert(error);
  }
};

export const fetchBranches = () => {
  return async dispatch => {
    const response = await api.get("/academic/branch/?format=json");
    dispatch({ type: "FETCH_BRANCHES", payload: response.data });
  };
};

//courses
export const fetchCourses = () => {
  return async dispatch => {
    const response = await api.get("/academic/course/?format=json");
    dispatch({ type: "FETCH_COURSES", payload: response.data });
  };
};

export const createCourse = formValues => async dispatch => {
  try {
    const response = await api.post("/academic/course/?format=json", {
      ...formValues
    });
    dispatch({ type: "CREATE_COURSE", payload: response.data });
  } catch (error) {
    alert(error);
  }
};
