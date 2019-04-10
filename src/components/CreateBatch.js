import React, { Component } from "react";
import { connect } from "react-redux";
import { createBatch, fetchBatchs } from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table
} from "semantic-ui-react";
class CreateBatch extends Component {
  componentDidMount() {
    this.props.fetchBatchs();
  }
  componentDidUpdate() {
    this.props.fetchBatchs();
  }
  onSubmit = formValues => {
    this.props.createBatch(formValues);
    this.props.reset("createBatch");
  };

  renderInput = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderBatchs = () => {
    return this.props.batchs.map(batch => {
      if (batch !== "Search Not Found") {
        return (
          <React.Fragment key={batch.id}>
            <Table.Row key={batch.id}>
              <Table.Cell>{batch.name}</Table.Cell>
              <Table.Cell collapsing>{batch.start_year}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return <React.Fragment key={batch} />;
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Admission Batch
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Batch Name"
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
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderBatchs()}</Table.Body>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return { batchs: Object.values(state.batchs) };
};
const formWrapped = reduxForm({
  form: "createBatch"
})(CreateBatch);

export default connect(
  mapStateToProps,
  {
    createBatch,
    fetchBatchs
  }
)(formWrapped);
