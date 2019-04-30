import React, { Component } from "react";
import { Menu, Segment, Sidebar, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { logout } from "../actions";
import { connect } from "react-redux";
class SideBar extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Menu
            fixed="top"
            inverted
            borderless
            style={{
              backgroundColor: "#004ea0",
              height: "10px",
              padding: 0,
              color: "black"
            }}
          >
            <Menu.Item as={Link} to="/">
              <Image
                size="mini"
                src="/logo.jpg"
                style={{ width: "25px", height: "25px" }}
                circular
              />
            </Menu.Item>

            <Dropdown
              item
              simple
              text="Core"
              icon="angle down"
              style={{ paddingRight: "0px", color: "white" }}
            >
              <Dropdown.Menu>
                <Dropdown.Header>STUDENTS</Dropdown.Header>
                <Dropdown.Item as={Link} to="/new">
                  Student
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/admissionbatch">
                  Admission Batch
                </Dropdown.Item>
                <Dropdown.Item>Registration Number</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              item
              simple
              text="Academics"
              icon="angle down"
              style={{ color: "white" }}
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/createschool">
                  School
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/createdepartment">
                  Department
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/createprogramme">
                  Degree
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/createscheme">
                  Scheme
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/branch">
                  Branch
                </Dropdown.Item>
                <Dropdown.Item>Semester</Dropdown.Item>
                <Dropdown.Item as={Link} to="/course">
                  Course
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Mapping</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>School - Department</Dropdown.Item>
                    <Dropdown.Item>Programme - Department</Dropdown.Item>
                    <Dropdown.Item>Scheme - Department</Dropdown.Item>
                    <Dropdown.Item>Student - Programme</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
              onClick={this.props.logout}
              position="right"
              style={{ color: "white" }}
            >
              Logout
            </Menu.Item>
          </Menu>

          <div style={{ minHeight: "100vh", marginTop: "45px" }}>
            {children}
          </div>
          <Segment
            inverted
            style={{
              margin: "5em 0em 0em",
              padding: "1.5em 0em"
            }}
            attached="bottom"
            textAlign="center"
          >
            Mizoram University, Examination Technical Section.
          </Segment>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default connect(
  null,
  { logout }
)(SideBar);
