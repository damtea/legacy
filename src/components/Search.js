import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  Button,
  Segment,
  Container,
  Message,
  Header
} from "semantic-ui-react";

import { withRouter } from "react-router-dom";
class Search extends Component {
  onSubmit = formValues => {
    this.props.history.push("/result/" + formValues.id);
  };

  renderInput = ({ placeholder, input }) => {
    return (
      <div>
        <input {...input} placeholder={placeholder} />
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Segment textAlign="center">
          <Container text textAlign="center">
            <Message>
              <Header as="h3">
                Welcome to MZU Examination Legacy Mark Application
              </Header>
            </Message>
            <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Group inline>
                <Form.Field required>
                  <Field
                    name="id"
                    component={this.renderInput}
                    placeholder="Search by Roll number"
                  />
                </Form.Field>
                <Button> Search </Button>
              </Form.Group>
            </Form>
          </Container>
        </Segment>
      </React.Fragment>
    );
  }
}

export default reduxForm({ form: "searchStudent" })(withRouter(Search));
