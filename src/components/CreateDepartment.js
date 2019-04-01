import React, { Component } from "react";
import { connect } from "react-redux";
import { createDepartment, fetchDepartments } from "../actions";
import { Field, reduxForm } from "redux-form";

class CreateDepartment extends Component {
  componentDidMount() {
    this.props.fetchDepartments();
  }
  componentDidUpdate() {
    this.props.fetchDepartments();
  }
  onSubmit = formValues => {
    this.props.createDepartment(formValues);
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
        return <li key={department.id}>{department.name} </li>;
      }
      return department;
    });
  };

  render() {
    return (
      <div>
        <h3>Department Creation</h3>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="field">
            <Field
              name="name"
              component={this.renderInput}
              label="Enter Department Name"
            />
            <Field
              name="code"
              component={this.renderInput}
              label="Enter Department Code"
            />
            <Field
              name="start_year"
              component={this.renderInput}
              label="Enter Start Year"
            />
          </div>

          <button className="ui button primary">Submit</button>
        </form>
        <div>
          <h3>Department List</h3>
          <ul>{this.renderDepartments()}</ul>
        </div>
      </div>
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
