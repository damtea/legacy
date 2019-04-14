import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import studentReducer from "./studentReducer";
import programmeReducer from "./programmeReducer";
import departmentReducer from "./departmentReducer";
import schoolReducer from "./schoolReducer";
import schemeReducer from "./schemeReducer";
import batchReducer from "./batchReducer";
import examinationReducer from "./examinationReducer";
import courseReducer from "./courseReducer";
import authReducer from "./authReducer";
export default combineReducers({
  form: formReducer,
  students: studentReducer,
  programmes: programmeReducer,
  departments: departmentReducer,
  schools: schoolReducer,
  schemes: schemeReducer,
  batchs: batchReducer,
  marks: examinationReducer,
  courses: courseReducer,
  auth: authReducer
});
