import React, { Component } from "react";
import { connect } from "react-redux";
import { createStudent, fetchStudents } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class createStudents extends Component {
  componentDidMount() {
    this.props.fetchStudents();
  }
  componentDidUpdate() {
    this.props.fetchStudents();
  }
  onSubmit = formValues => {
    this.props.createStudent(formValues);
    this.props.reset("createStudent");
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderStudents = () => {
    if (this.props.students.length > 0) {
      return this.props.students.map(student => {
        if (student) {
          return (
            <React.Fragment key={student.id}>
              <Table.Row key={student.id}>
                <Table.Cell collapsing>{student.id}</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell collapsing>
                  {student.sex === "M" ? "Male" : "Female"}
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          );
        }
        return student;
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create Student
          </Header>

          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="id"
                  component={this.renderInput}
                  label="Enter Roll Number"
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Name"
                />
              </Form.Field>

              <Form.Field>
                <label>
                  <Field name="sex" component="input" type="radio" value="M" />
                  Male
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  <Field name="sex" component="input" type="radio" value="F" />
                  Female
                </label>
              </Form.Field>

              <Button>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Roll number</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Sex</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderStudents()}</Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { students: Object.values(state.students) };
};
const formWrapped = reduxForm({
  form: "createStudent"
})(createStudents);

export default connect(
  mapStateToProps,
  {
    createStudent,
    fetchStudents
  }
)(formWrapped);
