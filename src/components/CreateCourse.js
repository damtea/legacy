import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createCourse,
  fetchDepartments,
  fetchProgrammes,
  fetchCourses
} from "../actions";
import { Field, reduxForm } from "redux-form";
import { Segment, Form, Button, Header, Table } from "semantic-ui-react";
class CreateDepartment extends Component {
  state = {
    btnActive: true
  };
  componentDidMount() {
    this.props.fetchDepartments();
    this.props.fetchProgrammes();
    this.props.fetchCourses();
  }
  componentDidUpdate() {
    this.props.fetchDepartments();
  }
  onSubmit = formValues => {
    this.props.createDepartment(formValues);
    this.props.reset("createDepartment");
  };

  renderInput = ({ label, input, placeholder }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} placeholder={placeholder} />
      </div>
    );
  };
  renderCourse = () => {
    return this.props.courses.map(course => {
      if (course !== "Search Not Found") {
        const departmentname = this.props.departments.map(department => {
          if (department.id === course.department) {
            return department.name;
          }
          return department;
        });
        const degreename = this.props.programmes.map(degree => {
          if (degree.id === course.degree) {
            return degree.name;
          }
          return degree;
        });
        return (
          <React.Fragment key={course.id}>
            <Table.Row key={course.id}>
              <Table.Cell collapsing>{course.code}</Table.Cell>
              <Table.Cell>{course.name}</Table.Cell>
              <Table.Cell>{course.semester}</Table.Cell>
              <Table.Cell collapsing>{departmentname}</Table.Cell>
              <Table.Cell collapsing>{degreename}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return <React.Fragment key={course} />;
    });
  };
  renderDepartment = () => {
    return this.props.departments.map(department => {
      if (department !== "Search Not Found") {
        return (
          <option value={department.id} key={department.id}>
            {department.name}
          </option>
        );
      }
      return <React.Fragment key={department} />;
    });
  };
  renderDegree = () => {
    return this.props.programmes.map(degree => {
      if (degree !== "Search Not Found") {
        return (
          <option value={degree.id} key={degree.id}>
            {degree.name}
          </option>
        );
      }
      return <React.Fragment key={degree} />;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Segment.Group>
          <Segment>
            <Header as="h2">Course Creation</Header>
          </Segment>

          <Segment>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Group widths={4}>
                <Form.Field>
                  <Field
                    name="code"
                    component={this.renderInput}
                    label="Code"
                    placeholder="Enter Course Code here..."
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="name"
                    component={this.renderInput}
                    label=" Name"
                    placeholder="Enter Course Name here..."
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="semester"
                    component={this.renderInput}
                    label="Semester"
                    placeholder="Enter Semster here..."
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={4}>
                <Form.Field required>
                  <label>Department</label>
                  <Field
                    name="department"
                    component="select"
                    onChange={e =>
                      e.target.value === "-- Select Department --"
                        ? this.setState({ btnActive: true })
                        : this.setState({ btnActive: false })
                    }
                  >
                    <option>-- Select Department --</option>
                    {this.renderDepartment()}
                  </Field>
                </Form.Field>
                <Form.Field required>
                  <label>Degree</label>
                  <Field
                    name="degree"
                    component="select"
                    onChange={e =>
                      e.target.value === "-- Select Degree --"
                        ? this.setState({ btnActive: true })
                        : this.setState({ btnActive: false })
                    }
                  >
                    <option>-- Select Degree --</option>
                    {this.renderDegree()}
                  </Field>
                </Form.Field>
              </Form.Group>
              <Button disabled={this.state.btnActive}>Submit</Button>
            </Form>
          </Segment>
        </Segment.Group>
        <Table celled striped size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Code</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Semester</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Degree</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderCourse()}</Table.Body>
        </Table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    departments: Object.values(state.departments),
    courses: Object.values(state.courses),
    programmes: Object.values(state.programmes)
  };
};
const formWrapped = reduxForm({
  form: "createDepartment"
})(CreateDepartment);

export default connect(
  mapStateToProps,
  {
    createCourse,
    fetchDepartments,
    fetchProgrammes,
    fetchCourses
  }
)(formWrapped);
