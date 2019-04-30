import React, { Component } from "react";
import { connect } from "react-redux";
import { createDepartment, fetchDepartments, fetchSchools } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table,
  SegmentGroup
} from "semantic-ui-react";
class CreateDepartment extends Component {
  state = {
    btnActive: true
  };
  componentDidMount() {
    this.props.fetchDepartments();
    this.props.fetchSchools();
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
        const schoolname = this.props.schools.map(school => {
          if (school.id === department.school) {
            return school.name;
          }
          return school;
        });
        return (
          <React.Fragment key={department.id}>
            <Table.Row key={department.id}>
              <Table.Cell collapsing>{department.code}</Table.Cell>
              <Table.Cell>{department.name}</Table.Cell>
              <Table.Cell collapsing>{schoolname}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return <React.Fragment key={department} />;
    });
  };
  renderSchool = () => {
    return this.props.schools.map(sch => {
      if (sch !== "Search Not Found") {
        return (
          <option value={sch.id} key={sch.id}>
            {sch.name}
          </option>
        );
      }
      return <React.Fragment key={sch} />;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Segment.Group>
          <Segment>
            <Header as="h2">School Creation</Header>
          </Segment>
          <SegmentGroup horizontal>
            <Segment>
              <Form
                style={{ width: "450px" }}
                as="form"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
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

                <Form.Field required>
                  <label>School</label>
                  <Field
                    name="school"
                    component="select"
                    onChange={e =>
                      e.target.value === "-- Select School --"
                        ? this.setState({ btnActive: true })
                        : this.setState({ btnActive: false })
                    }
                  >
                    <option>-- Select School --</option>
                    {this.renderSchool()}
                  </Field>
                </Form.Field>
                <Button disabled={this.state.btnActive}>Submit</Button>
              </Form>
            </Segment>
          </SegmentGroup>
        </Segment.Group>
        <Table celled striped size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>School</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderDepartments()}</Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    departments: Object.values(state.departments),
    schools: Object.values(state.schools)
  };
};
const formWrapped = reduxForm({
  form: "createDepartment"
})(CreateDepartment);

export default connect(
  mapStateToProps,
  {
    createDepartment,
    fetchDepartments,
    fetchSchools
  }
)(formWrapped);
