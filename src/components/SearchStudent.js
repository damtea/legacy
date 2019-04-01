import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudent } from "../actions";
import { Field, reduxForm } from "redux-form";

class SearchStudent extends Component {
  onSubmit = formValues => {
    this.props.fetchStudent(formValues.id);
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
    if (this.props.students.name) {
      if (this.props.students.name !== "Search Not Found") {
        return (
          <div>
            Name: {this.props.students.name} <br />
            Registration Number: {this.props.students.registration}
          </div>
        );
      } else {
        return this.props.students.name;
      }
    }
  };
  render() {
    return (
      <div>
        <h3>Search Student</h3>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="field">
            <Field
              name="id"
              component={this.renderInput}
              label="Enter Roll number"
            />
          </div>

          <button className="ui button primary">Search</button>
        </form>
        {this.renderStudents()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { students: state.students };
};
const formWrapped = reduxForm({
  form: "fetchStudent"
})(SearchStudent);

export default connect(
  mapStateToProps,
  {
    fetchStudent
  }
)(formWrapped);
