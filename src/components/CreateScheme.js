import React, { Component } from "react";
import { connect } from "react-redux";
import { createScheme, fetchSchemes } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateScheme extends Component {
  componentDidMount() {
    this.props.fetchSchemes();
  }
  componentDidUpdate() {
    this.props.fetchSchemes();
  }
  onSubmit = formValues => {
    this.props.createScheme(formValues);
    this.props.reset("createScheme");
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderSchemes = () => {
    return this.props.schemes.map(scheme => {
      if (scheme) {
        return (
          <React.Fragment key={scheme.id}>
            <Table.Row key={scheme.id}>
              <Table.Cell collapsing>{scheme.name}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return scheme;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create Scheme
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Scheme Name"
                />
              </Form.Field>

              <Button>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderSchemes()}</Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { schemes: Object.values(state.schemes) };
};
const formWrapped = reduxForm({
  form: "createScheme"
})(CreateScheme);

export default connect(
  mapStateToProps,
  {
    createScheme,
    fetchSchemes
  }
)(formWrapped);
