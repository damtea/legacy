import React, { Component } from "react";
import { connect } from "react-redux";
import { createStudent } from "../actions";
import { Field, reduxForm } from "redux-form";

class createStudents extends Component {
  onSubmit = formValues => {
    this.props.createStudent(formValues);
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>Create Student</h3>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="field">
            <Field
              name="name"
              component={this.renderInput}
              label="Enter Name"
            />
          </div>
          <div className="field">
            <Field
              name="id"
              component={this.renderInput}
              label="Enter Roll number"
            />
          </div>
          <div className="field">
            <Field
              name="registration"
              component={this.renderInput}
              label="Enter Registration Number"
            />
          </div>

          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const formWrapped = reduxForm({
  form: "createStudent"
})(createStudents);

export default connect(
  null,
  {
    createStudent
  }
)(formWrapped);
