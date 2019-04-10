import React, { Component } from "react";
import { connect } from "react-redux";
import { createDepartment, fetchDepartments } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateDepartment extends Component {
  componentDidMount() {
    this.props.fetchDepartments();
  }
  componentDidUpdate() {
    this.props.fetchDepartments();
  }
  onSubmit = formValues => {
    this.props.createDepartment(formValues);
    this.props.reset("createDepartment");
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
      if (department !== "Search Not Found") {
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
      return <React.Fragment key={department} />;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create Department
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Department Name"
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="code"
                  component={this.renderInput}
                  label="Enter Department Code"
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
  return { departments: Object.values(state.departments) };
};
const formWrapped = reduxForm({
  form: "createDepartment"
})(CreateDepartment);

export default connect(
  mapStateToProps,
  {
    createDepartment,
    fetchDepartments
  }
)(formWrapped);
