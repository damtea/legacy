import React, { Component } from "react";
import { connect } from "react-redux";
import { createProgramme, fetchProgrammes } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateProgramme extends Component {
  componentDidMount() {
    this.props.fetchProgrammes();
  }
  componentDidUpdate() {
    this.props.fetchProgrammes();
  }
  onSubmit = formValues => {
    this.props.createProgramme(formValues);
    this.props.reset("createProgramme");
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderDepartments = () => {
    return this.props.departments.map(department => {
      if (department) {
        return (
          <React.Fragment key={department.id}>
            <Table.Row key={department.id}>
              <Table.Cell collapsing>{department.code}</Table.Cell>
              <Table.Cell>{department.name}</Table.Cell>
              <Table.Cell collapsing>{department.start_year}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return department;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create Programme
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Programme Name"
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="code"
                  component={this.renderInput}
                  label="Enter Programme Code"
                />
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
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderDepartments()}</Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { programmes: Object.values(state.programmes) };
};
const formWrapped = reduxForm({
  form: "createProgramme"
})(CreateProgramme);

export default connect(
  mapStateToProps,
  {
    createProgramme,
    fetchProgrammes
  }
)(formWrapped);
