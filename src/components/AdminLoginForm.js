import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Header,
  Image,
  Segment,
  Modal,
  Container
} from "semantic-ui-react";
import { connect } from "react-redux";
import { authSubmit } from "../actions";
import { withRouter } from "react-router-dom";
const AdminLoginForm = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onloginSubmit = async e => {
    e.preventDefault();

    const formValues = await {
      email: username,
      password: password
    };
    setUsername("");
    setPassword("");

    await props.authSubmit(formValues);
  };
  useEffect(() => {
    document.title = "Admin Login";

    if (props.auth && props.auth.message) {
      if (props.auth.message === "Authentication successful") {
        props.history.push("/");
      }
    }
  }, []);

  return (
    <React.Fragment>
      <Modal name="login" size="mini" open={true} dimmer>
        <Modal.Header>
          <Header as="h2" textAlign="center">
            <Image src="/logo.jpg" />
          </Header>
          <Header as="h3" textAlign="center">
            Admin Login
          </Header>
        </Modal.Header>
        <Modal.Content>
          <Container>
            <Form onSubmit={onloginSubmit}>
              <Segment>
                <Form.Input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />

                <Button
                  style={{ backgroundColor: "#1340BE", color: "white" }}
                  fluid
                  size="large"
                >
                  Login
                </Button>
              </Segment>
            </Form>
          </Container>
        </Modal.Content>
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(
  mapStateToProps,
  {
    authSubmit
  }
)(withRouter(AdminLoginForm));
