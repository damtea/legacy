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
  Table,
  Divider,
  Modal,
  Select
} from "semantic-ui-react";
class CreateScheme extends Component {
  state = {
    btnActive: true,
    deleteopen: false,
    editopen: false,
    id: null,
    name: null,
    start: null,
    regular: null,
    extention: null,
    duration: null,
    grace: false,
    semester: null,
    programme: null
  };
  componentDidMount() {
    this.props.fetchProgrammes();
    this.props.fetchSchemes();
  }
  deleteShow = scheme => {
    this.setState({
      id: scheme.id,
      name: scheme.name,
      deleteopen: true
    });
  };
  editShow = scheme => {
    this.setState({
      id: scheme.id,
      name: scheme.name,
      start: scheme.scheme_start_year,
      regular: scheme.duration_of_regular,
      extention: scheme.duration_of_extention,
      duration: scheme.total_duration,
      grace: scheme.grace_mark,
      semester: scheme.no_of_semester,
      programme: scheme.programme,
      editopen: true
    });
  };
  closeDelete = () => {
    this.setState({
      deleteopen: false,
      id: null,
      name: null,
      start: null,
      regular: null,
      extention: null,
      duration: null,
      grace: false,
      semester: null,
      programme: null
    });
  };
  closeEdit = () => {
    this.setState({
      editopen: false,
      id: null,
      name: null,
      start: null,
      regular: null,
      extention: null,
      duration: null,
      grace: false,
      semester: null,
      programme: null
    });
  };
  deleteSchemeFunction = async () => {
    await this.props.deleteScheme(this.state.id);
    this.setState({
      deleteopen: false,
      id: null,
      name: null,
      start: null,
      regular: null,
      extention: null,
      duration: null,
      grace: false,
      semester: null,
      programme: null
    });
  };
  onSubmitEdit = async e => {
    e.preventDefault();
    const formValues = {
      name: this.state.name,
      scheme_start_year: this.state.start,
      duration_of_regular: this.state.regular,
      duration_of_extention: this.state.extention,
      total_duration: this.state.duration,
      grace_mark: this.state.grace,
      no_of_semester: this.state.semester,
      programme: this.state.programme
    };

    await this.props.editScheme(this.state.id, formValues);
    this.setState({
      editopen: false,
      id: null,
      name: null,
      start: null,
      regular: null,
      extention: null,
      duration: null,
      grace: false,
      semester: null,
      programme: null
    });
  };
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
    const style = { padding: 0 };
    return this.props.schemes.map(scheme => {
      if (scheme !== "Search Not Found") {
        const progname = this.props.programmes.map(programme => {
          if (programme.id === scheme.programme) {
            return programme.name;
          }
          return programme;
        });

        return (
          <Table.Row key={scheme.id}>
            <Table.Cell collapsing textAlign="center" style={style}>
              {scheme.name}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.scheme_start_year}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.duration_of_regular}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.duration_of_extention}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.total_duration}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.grace_mark.value}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {scheme.no_of_semester}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {progname}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              <Button.Group compact>
                <Button
                  icon="edit"
                  primary
                  compact
                  onClick={e => this.editShow(scheme)}
                />
                <Button
                  icon="trash alternate"
                  negative
                  compact
                  onClick={e => this.deleteShow(scheme)}
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        );
      }
      return <React.Fragment key={scheme} />;
    });
  };

  renderProgrammes = () => {
    return this.props.programmes.map(programme => {
      if (programme !== "Search Not Found") {
        return (
          <option value={programme.id} key={programme.id}>
            {programme.name}
          </option>
        );
      }
      return <React.Fragment key={programme} />;
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
              <Form.Field required>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Scheme Name"
                />
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Field required>
                  <Field
                    name="scheme_start_year"
                    component={this.renderInput}
                    label="Start Year"
                    type="number"
                  />
                </Form.Field>
                <Form.Field required>
                  <Field
                    name="duration_of_regular"
                    component={this.renderInput}
                    label="Duration of Regular"
                    type="number"
                  />
                </Form.Field>
                <Form.Field required>
                  <Field
                    name="duration_of_extention"
                    component={this.renderInput}
                    label="Duration of Extention"
                    type="number"
                  />
                </Form.Field>
                <Form.Field required>
                  <Field
                    name="total_duration"
                    component={this.renderInput}
                    label="Total Duration"
                    type="number"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field required>
                  <Field
                    name="grace_mark"
                    component={this.renderInput}
                    label="Grace Mark"
                  />
                </Form.Field>
                <Form.Field required>
                  <Field
                    name="no_of_semester"
                    component={this.renderInput}
                    label="Number of Semester"
                    type="number"
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field required>
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
        </Container>
        <Divider />
        <Container>
          <Table striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Start Year
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Regular Duration
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Extention
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Total Duration
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Grace Mark
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Semester</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  Programme
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">...</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderSchemes()}</Table.Body>
          </Table>
        </Container>
        <Modal
          name="delete"
          size="small"
          open={this.state.deleteopen}
          onClose={this.closeDelete}
        >
          <Modal.Header>Delete Scheme</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {this.state.name} scheme?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeDelete} negative>
              No
            </Button>
            <Button
              positive
              icon="trash"
              labelPosition="left"
              content="Yes"
              onClick={this.deleteSchemeFunction}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          name="edit"
          size="small"
          open={this.state.editopen}
          onClose={this.closeEdit}
        >
          <Modal.Header>Edit Scheme</Modal.Header>
          <Modal.Content>
            <Container>
              <Form size="small" as="form" onSubmit={this.onSubmitEdit}>
                <Form.Field required>
                  <label>Scheme Name</label>
                  <input
                    placeholder="Scheme Name"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Start Year</label>
                  <input
                    placeholder="Starting Year"
                    type="number"
                    name="scheme_start_year"
                    value={this.state.start}
                    onChange={e => this.setState({ start: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Duration of Regular</label>
                  <input
                    placeholder="Regular Duration"
                    type="number"
                    name="duration_of_regular"
                    value={this.state.regular}
                    onChange={e => this.setState({ regular: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Duration of Extention</label>
                  <input
                    placeholder="Extention Duration"
                    type="number"
                    name="duration_of_extention"
                    value={this.state.extention}
                    onChange={e => this.setState({ extention: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Total Duration</label>
                  <input
                    placeholder="Regular Duration"
                    type="number"
                    name="total_duration"
                    value={this.state.duration}
                    onChange={e => this.setState({ duration: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Grace Mark</label>
                  <input
                    placeholder="true or false"
                    name="grace_mark"
                    value={this.state.grace}
                    onChange={e => this.setState({ grace: e.target.value })}
                  />
                </Form.Field>
                <Form.Field required>
                  <label>Number of Semester</label>
                  <input
                    placeholder="Semester"
                    type="number"
                    name="no_of_semester"
                    value={this.state.semester}
                    onChange={e => this.setState({ semester: e.target.value })}
                  />
                </Form.Field>
                <Form.Field
                  control={Select}
                  options={this.renderProgrammes()}
                  placeholder="Gender"
                  search
                  required
                />

                <Button>Update</Button>
                <Button negative onClick={this.closeEdit}>
                  Close
                </Button>
              </Form>
            </Container>
          </Modal.Content>
        </Modal>
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
