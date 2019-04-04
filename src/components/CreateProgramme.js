import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createProgramme,
  fetchProgrammes,
  deleteProgramme,
  editProgramme
} from "../actions";
import { Field, reduxForm } from "redux-form";
import {
  Segment,
  Container,
  Form,
  Button,
  Header,
  Table,
  Modal
} from "semantic-ui-react";
class CreateProgramme extends Component {
  state = {
    deleteopen: false,
    editopen: false,
    pid: null,
    pname: null,
    pcode: null,
    syear: null
  };
  deleteShow = programme => {
    this.setState({
      pid: programme.id,
      pname: programme.name,
      deleteopen: true
    });
  };
  editShow = programme => {
    this.setState({
      pid: programme.id,
      pname: programme.name,
      pcode: programme.code,
      syear: programme.start_year,
      editopen: true
    });
  };
  closeDelete = () => {
    this.setState({
      deleteopen: false,
      pid: null,
      pname: null,
      pcode: null,
      syear: null
    });
  };
  closeEdit = () => {
    this.setState({
      editopen: false,
      pid: null,
      pname: null,
      pcode: null,
      syear: null
    });
  };
  deleteProgrammeFunction = async () => {
    await this.props.deleteProgramme(this.state.pid);
    this.setState({
      deleteopen: false,
      pid: null,
      pname: null,
      pcode: null,
      syear: null
    });
  };
  onSubmitEdit = async e => {
    e.preventDefault();
    const formValues = {
      name: this.state.pname,
      code: this.state.pcode,
      start_year: this.state.syear
    };

    await this.props.editProgramme(this.state.pid, formValues);
    this.setState({
      editopen: false,
      pid: null,
      pname: null,
      pcode: null,
      syear: null
    });
  };
  componentDidMount() {
    this.props.fetchProgrammes();
  }

  onSubmit = formValues => {
    this.props.createProgramme(formValues);
    this.props.reset("createProgramme");
  };

  renderInput = ({ label, input, placeholder }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} placeholder={placeholder} />
      </div>
    );
  };

  renderInputEdit = ({ label, input }) => {
    return (
      <div>
        <label> {label} </label>
        <input {...input} />
      </div>
    );
  };
  renderProgrammes = () => {
    return this.props.programmes.map(programme => {
      if (programme) {
        return (
          <React.Fragment key={programme.id}>
            <Table.Row key={programme.id}>
              <Table.Cell collapsing>{programme.code}</Table.Cell>
              <Table.Cell>{programme.name}</Table.Cell>
              <Table.Cell collapsing>{programme.start_year}</Table.Cell>
              <Table.Cell collapsing>
                <Button.Group compact>
                  <Button
                    icon="edit"
                    primary
                    compact
                    onClick={e => this.editShow(programme)}
                  />
                  <Button
                    icon="trash alternate"
                    negative
                    compact
                    onClick={e => this.deleteShow(programme)}
                  />
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          </React.Fragment>
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
            Create Programme
          </Header>
          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Programme Name"
                  placeholder="Name..."
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="code"
                  component={this.renderInput}
                  label="Programme Code"
                  placeholder="Code..."
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="start_year"
                  component={this.renderInput}
                  label="Start Year"
                  placeholder="Starting year..."
                />
              </Form.Field>

              <Button>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Code</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Start Year</Table.HeaderCell>
                <Table.HeaderCell>...</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderProgrammes()}</Table.Body>
          </Table>
        </Container>

        <Modal
          name="delete"
          size="small"
          open={this.state.deleteopen}
          onClose={this.closeDelete}
        >
          <Modal.Header>Delete Programme</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {this.state.pname} programme?</p>
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
              onClick={this.deleteProgrammeFunction}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          name="edit"
          size="small"
          open={this.state.editopen}
          onClose={this.closeEdit}
        >
          <Modal.Header>Edit Programme</Modal.Header>
          <Modal.Content>
            <Container>
              <Form size="small" as="form" onSubmit={this.onSubmitEdit}>
                <Form.Field>
                  <label>Programme Name</label>
                  <input
                    placeholder="Programme Name"
                    name="name"
                    value={this.state.pname}
                    onChange={e => this.setState({ pname: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Programme Code</label>
                  <input
                    placeholder="Programme Code"
                    name="code"
                    value={this.state.pcode}
                    onChange={e => this.setState({ pcode: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Start Year</label>
                  <input
                    placeholder="Start Year"
                    name="start_year"
                    value={this.state.syear}
                    onChange={e => this.setState({ syear: e.target.value })}
                  />
                </Form.Field>

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
  return { programmes: Object.values(state.programmes) };
};
const formWrapped = reduxForm({
  form: "createProgramme"
})(CreateProgramme);

export default connect(
  mapStateToProps,
  {
    createProgramme,
    fetchProgrammes,
    deleteProgramme,
    editProgramme
  }
)(formWrapped);
