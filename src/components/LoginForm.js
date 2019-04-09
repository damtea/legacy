import React from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

const LoginForm = () => (
  <Grid
    textAlign="center"
    style={{ height: "100%", marginTop: "25px" }}
    verticalAlign="middle"
  >
    <Segment>
      <Grid.Column style={{ maxWidth: 450 }} textAlign="center">
        <Header as="h1" textAlign="center">
          <Image src="/logo.jpg" />
        </Header>
        <Header as="h2" style={{ color: "black" }} textAlign="center">
          Login to MZU Examination Site
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input
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
              required
            />

            <Button
              style={{ backgroundColor: "#1C5A28", color: "white" }}
              fluid
              size="large"
            >
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Segment>
  </Grid>
);

export default LoginForm;
