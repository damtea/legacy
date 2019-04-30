import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import createStudents from "./components/createStudents";
import SearchResult from "./components/SearchResult";
import CreateDegree from "./components/CreateDegree";
import CreateDepartment from "./components/CreateDepartment";
import CreateSchool from "./components/CreateSchool";
import SideBar from "./components/Sidebar";
import CreateScheme from "./components/CreateScheme";
import CreateBatch from "./components/CreateBatch";
import CreateBranch from "./components/CreateBranch";
import CreateRegistration from "./components/CreateRegistration";
import CreateCourse from "./components/CreateCourse";
import Search from "./components/Search";
import LoginForm from "./components/LoginForm";
import Home from "./components/student/Home";
import "semantic-ui-css/semantic.min.css";
import { connect } from "react-redux";
import { authCheck } from "./actions";
import AdminLoginForm from "./components/AdminLoginForm";
const Containers = ({ children }) => (
  <div>
    <SideBar>{children}</SideBar>
  </div>
);

const App = props => {
  useEffect(() => {
    props.authCheck();
  }, []);

  //if (props.auth.message && props.auth.message === "Authentication failed") {
  //return (
  // <div>
  //  <Router>
  //  <Switch>
  //   <Route path="*" exact component={LoginForm} />
  //  </Switch>
  //  </Router>
  // </div>
  // );
  //}

  return (
    <div>
      <Router>
        <div>
          <Containers>
            <Switch>
              <Route path="/" exact component={Search} />
              <Route path="/result/:id" exact component={SearchResult} />
              <Route path="/new" exact component={createStudents} />
              <Route path="/createprogramme" exact component={CreateDegree} />
              <Route
                path="/createdepartment"
                exact
                component={CreateDepartment}
              />
              <Route path="/createschool" exact component={CreateSchool} />
              <Route path="/createscheme" exact component={CreateScheme} />
              <Route path="/admissionbatch" exact component={CreateBatch} />
              <Route path="/course" exact component={CreateCourse} />
              <Route
                path="/createregistration"
                exact
                component={CreateRegistration}
              />
              <Route path="/student" exact component={LoginForm} />
              <Route path="/admin" exact component={AdminLoginForm} />
              <Route path="/home" exact component={Home} />
              <Route path="/branch" exact component={CreateBranch} />
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
