import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateRegistration extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    //  this.props.fetchRegistrations();
  }
  componentDidUpdate() {
    //  this.props.fetchRegistrations();
  }
  onSubmit = formValues => {
    //  this.props.createRegistration(formValues);
    //  this.props.reset("createRegistration");
    console.log(formValues);
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderBatchs = () => {
    return this.props.batchs.map(batch => {
      if (batch) {
        return (
          <React.Fragment key={batch.id}>
            <Table.Row key={batch.id}>
              <Table.Cell>{batch.name}</Table.Cell>
              <Table.Cell collapsing>{batch.start_year}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return batch;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Registration Number Assign
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field name="favoriteColor" component="select">
                  <option />
                  <option value="ff0000">Red</option>
                  <option value="00ff00">Green</option>
                  <option value="0000ff">Blue</option>
                </Field>
              </Form.Field>

              <Form.Field>
                <Field
                  name="start_year"
                  component={this.renderInput}
                  label="Enter Start Year"
                />
              </Form.Field>

              <Button>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body />
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

const formWrapped = reduxForm({
  form: "createBatch"
})(CreateRegistration);

export default connect(
  null,
  {
    fetchStudents
  }
)(formWrapped);
