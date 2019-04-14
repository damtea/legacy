import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import createStudents from "./components/createStudents";
import SearchResult from "./components/SearchResult";
import CreateProgramme from "./components/CreateProgramme";
import CreateDepartment from "./components/CreateDepartment";
import CreateSchool from "./components/CreateSchool";
import SideBar from "./components/Sidebar";
import CreateScheme from "./components/CreateScheme";
import CreateBatch from "./components/CreateBatch";
import CreateRegistration from "./components/CreateRegistration";
import Search from "./components/Search";
import LoginForm from "./components/LoginForm";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { authCheck } from "./actions";
const Containers = ({ children }) => (
  <div>
    <SideBar>{children}</SideBar>
  </div>
);

const App = props => {
  useEffect(() => {
    props.authCheck();
  }, []);

  if (props.auth.message && props.auth.message === "Authentication failed") {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="*" exact component={LoginForm} />
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <div>
          <Containers>
            <Switch>
              <Route path="/" exact component={Search} />
              <Route path="/result/:id" exact component={SearchResult} />
              <Route path="/new" exact component={createStudents} />
              <Route
                path="/createprogramme"
                exact
                component={CreateProgramme}
              />
              <Route
                path="/createdepartment"
                exact
                component={CreateDepartment}
              />
              <Route path="/createschool" exact component={CreateSchool} />
              <Route path="/createscheme" exact component={CreateScheme} />
              <Route path="/admissionbatch" exact component={CreateBatch} />
              <Route
                path="/createregistration"
                exact
                component={CreateRegistration}
              />
            </Switch>
          </Containers>
        </div>
      </Router>
    </div>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(
  mapStateToProps,
  { authCheck }
)(App);
