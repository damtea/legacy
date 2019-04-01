import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createStudents from "./components/createStudents";
import Home from "./components/Home";
import CreateProgramme from "./components/CreateProgramme";
import CreateDepartment from "./components/CreateDepartment";
const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/new" exact component={createStudents} />
            <Route path="/createprogramme" exact component={CreateProgramme} />
            <Route
              path="/createdepartment"
              exact
              component={CreateDepartment}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
