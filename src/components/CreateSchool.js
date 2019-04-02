import React, { Component } from "react";
import { connect } from "react-redux";
import { createSchool, fetchSchools } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateSchool extends Component {
  componentDidMount() {
    this.props.fetchSchools();
  }
  componentDidUpdate() {
    this.props.fetchSchools();
  }
  onSubmit = formValues => {
    this.props.createSchool(formValues);
    this.props.reset("createSchool");
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderSchools = () => {
    return this.props.schools.map(school => {
      if (school) {
        return (
          <React.Fragment key={school.id}>
            <Table.Row key={school.id}>
              <Table.Cell collapsing>{school.code}</Table.Cell>
              <Table.Cell>{school.name}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return school;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create School
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter School Name"
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="code"
                  component={this.renderInput}
                  label="Enter School Code"
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
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderSchools()}</Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { schools: Object.values(state.schools) };
};
const formWrapped = reduxForm({
  form: "createSchool"
})(CreateSchool);

export default connect(
  mapStateToProps,
  {
    createSchool,
    fetchSchools
  }
)(formWrapped);
