import React from "react";
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
const Containers = ({ children }) => (
  <div>
    <SideBar>{children}</SideBar>
  </div>
);
class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Containers>
              <Switch>
                <Route path="/" exact component={Search} />
                <Route path="/login" exact component={LoginForm} />
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
  }
}

export default App;
