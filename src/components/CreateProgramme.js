import React, { Component } from "react";
import { connect } from "react-redux";
import { createProgramme, fetchProgrammes } from "../actions";
import { Field, reduxForm } from "redux-form";

class CreateProgramme extends Component {
  componentDidMount() {
    this.props.fetchProgrammes();
  }

  onSubmit = formValues => {
    this.props.createProgramme(formValues);
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderProgrammes = () => {
    return this.props.programmes.map(programme => {
      return <li key={programme.id}>{programme.name}</li>;
    });
  };

  render() {
    return (
      <div>
        <h3>Programme Creation</h3>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <div className="field">
            <Field
              name="name"
              component={this.renderInput}
              label="Enter Programme Name"
            />
          </div>

          <button className="ui button primary">Submit</button>
        </form>
        <div>
          <h3>Programme List</h3>
          <ul>{this.renderProgrammes()}</ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { programmes: Object.values(state.programmes) };
};
const formWrapped = reduxForm({
  form: "createProgrammes"
})(CreateProgramme);

export default connect(
  mapStateToProps,
  {
    createProgramme,
    fetchProgrammes
  }
)(formWrapped);
