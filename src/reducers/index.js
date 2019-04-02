import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import studentReducer from "./studentReducer";
import programmeReducer from "./programmeReducer";
import departmentReducer from "./departmentReducer";
import schoolReducer from "./schoolReducer";
export default combineReducers({
  form: formReducer,
  students: studentReducer,
  programmes: programmeReducer,
  departments: departmentReducer,
  schools: schoolReducer
});
