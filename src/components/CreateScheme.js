import React, { Component } from "react";
import { connect } from "react-redux";
import { createScheme, fetchSchemes, fetchProgrammes } from "../actions";
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
  state = { btnActive: true };
  componentDidMount() {
    this.props.fetchProgrammes();
    this.props.fetchSchemes();
  }
  componentDidUpdate() {
    this.props.fetchSchemes();
    this.props.fetchProgrammes();
  }
  onSubmit = formValues => {
    this.props.createScheme(formValues);
    this.props.reset("createScheme");
  };

  renderInput = ({ label, input, type }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} type={type} />
      </div>
    );
  };
  renderSchemes = () => {
    return this.props.schemes.map(scheme => {
      if (scheme) {
        const progname = this.props.programmes.map(programme => {
          if (programme.id === scheme.programme) {
            return programme.name;
          }
          return programme;
        });

        return (
          <React.Fragment key={scheme.id}>
            <Table.Row key={scheme.id}>
              <Table.Cell collapsing>{scheme.name}</Table.Cell>
              <Table.Cell collapsing>{scheme.scheme_start_year}</Table.Cell>
              <Table.Cell collapsing>{scheme.duration_of_regular}</Table.Cell>
              <Table.Cell collapsing>{scheme.duration_of_extention}</Table.Cell>
              <Table.Cell collapsing>{scheme.total_duration}</Table.Cell>
              <Table.Cell collapsing>{scheme.grace_mark}</Table.Cell>
              <Table.Cell collapsing>{scheme.no_of_semester}</Table.Cell>
              <Table.Cell collapsing>{progname}</Table.Cell>
            </Table.Row>
          </React.Fragment>
        );
      }
      return scheme;
    });
  };

  renderProgrammes = () => {
    return this.props.programmes.map(programme => {
      if (programme) {
        return (
          <option value={programme.id} key={programme.id}>
            {programme.name}
          </option>
        );
      }
      return programme;
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
                  label="Scheme Name"
                />
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Field>
                  <Field
                    name="scheme_start_year"
                    component={this.renderInput}
                    label="Start Year"
                    type="number"
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="duration_of_regular"
                    component={this.renderInput}
                    label="Duration of Regular"
                    type="number"
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="duration_of_extention"
                    component={this.renderInput}
                    label="Duration of Extention"
                    type="number"
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="total_duration"
                    component={this.renderInput}
                    label="Total Duration"
                    type="number"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <Field
                    name="grace_mark"
                    component={this.renderInput}
                    label="Grace Mark"
                  />
                </Form.Field>
                <Form.Field>
                  <Field
                    name="no_of_semester"
                    component={this.renderInput}
                    label="Number of Semester"
                    type="number"
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <Field
                  name="programme"
                  component="select"
                  onChange={e =>
                    e.target.value === "-- Select Programme --"
                      ? this.setState({ btnActive: true })
                      : this.setState({ btnActive: false })
                  }
                >
                  <option>-- Select Programme --</option>
                  {this.renderProgrammes()}
                </Field>
              </Form.Field>
              <Button disabled={this.state.btnActive}>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
                <Table.HeaderCell>Regular Duration</Table.HeaderCell>
                <Table.HeaderCell>Extention</Table.HeaderCell>
                <Table.HeaderCell>Total Duration</Table.HeaderCell>
                <Table.HeaderCell>Grace Mark</Table.HeaderCell>
                <Table.HeaderCell>Semester</Table.HeaderCell>
                <Table.HeaderCell>Programme</Table.HeaderCell>
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
  return {
    schemes: Object.values(state.schemes),
    programmes: Object.values(state.programmes)
  };
};
const formWrapped = reduxForm({
  form: "createScheme"
})(CreateScheme);

export default connect(
  mapStateToProps,
  {
    createScheme,
    fetchSchemes,
    fetchProgrammes
  }
)(formWrapped);
