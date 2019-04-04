import React, { Component } from "react";
import {
  Button,
  Icon,
  Menu,
  Segment,
  Sidebar,
  Image,
  Dropdown,
  DropdownDivider
} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  state = { visible: false };

  handleHideClick = () => this.setState({ visible: false });
  handleShowClick = () => this.setState({ visible: true });
  handleSidebarHide = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    const { children } = this.props;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Menu fixed="top" inverted>
            <Menu.Item onClick={this.handleShowClick}>
              <Button icon basic inverted toggle>
                <Icon name="content" />
              </Button>
            </Menu.Item>
            <Menu.Item as={Link} to="/" header>
              <Image
                size="mini"
                src="/logo.jpg"
                style={{ marginRight: "1.5em" }}
                circular
              />
              Legacy
            </Menu.Item>

            <Dropdown item simple closeOnChange text="Menu">
              <Dropdown.Menu>
                <Dropdown.Header>STUDENTS</Dropdown.Header>
                <Dropdown.Item as={Link} to="/new">
                  Student
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/admissionbatch">
                  Admission Batch
                </Dropdown.Item>
                <Dropdown.Item>Registration Number</Dropdown.Item>
                <DropdownDivider />
                <Dropdown.Item>
                  <i className="dropdown icon" />

                  <span className="text">Creation</span>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/createschool">
                      School Creation
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/createdepartment">
                      Department Creation
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/createprogramme">
                      Programme Creation
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/createscheme">
                      Scheme Creation
                    </Dropdown.Item>
                    <Dropdown.Item>Semester Creation</Dropdown.Item>
                    <Dropdown.Item>Course Creation</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
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
          </Menu>
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a">Home</Menu.Item>
            <Menu.Item as="a">Games</Menu.Item>
            <Menu.Item as="a">Channels</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={visible}
            style={{ minHeight: "100vh", marginTop: "60px" }}
          >
            {children}
          </Sidebar.Pusher>
          <Segment
            inverted
            style={{
              margin: "5em 0em 0em",
              padding: "1.5em 0em"
            }}
            attached="bottom"
            textAlign="center"
          >
            MZU
          </Segment>
        </Sidebar.Pushable>
      </div>
    );
  }
}
