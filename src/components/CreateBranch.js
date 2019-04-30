import React, { Component } from "react";
import { connect } from "react-redux";
import { createBranch, fetchBranches, fetchProgrammes } from "../actions";
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
  Select,
  Input
} from "semantic-ui-react";
class CreateBranch extends Component {
  state = {
    btnActive: true,
    deleteopen: false,
    editopen: false,
    id: null,
    name: null,
    code: null,
    degree: null
  };
  componentDidMount() {
    this.props.fetchProgrammes();
    this.props.fetchBranches();
  }
  deleteShow = branch => {
    this.setState({
      id: branch.id,
      name: branch.name,
      deleteopen: true
    });
  };
  editShow = branch => {
    this.setState({
      id: branch.id,
      name: branch.name,
      code: branch.code,
      degree: branch.degree,
      editopen: true
    });
  };
  closeDelete = () => {
    this.setState({
      deleteopen: false,
      id: null,
      code: null,
      degree: null
    });
  };
  closeEdit = () => {
    this.setState({
      editopen: false,
      id: null,
      name: null,
      code: null,
      degree: null
    });
  };
  deleteSchemeFunction = async () => {
    await this.props.deleteScheme(this.state.id);
    this.setState({
      deleteopen: false,
      id: null,
      code: null,
      degree: null
    });
  };
  onSubmitEdit = async e => {
    e.preventDefault();
    const formValues = {
      name: this.state.name,
      code: this.state.code,

      degree: this.state.degree
    };

    await this.props.editScheme(this.state.id, formValues);
    this.setState({
      editopen: false,
      id: null,
      name: null,

      code: null,
      degree: null
    });
  };
  onSubmit = formValues => {
    this.props.createBranch(formValues);
    this.props.reset("createBranch");
  };

  renderInput = ({ input, type, placeholder }) => {
    return <Input {...input} type={type} placeholder={placeholder} />;
  };
  renderSchemes = () => {
    const style = { padding: 0 };
    return this.props.branch.map(objBranch => {
      if (objBranch !== "Search Not Found") {
        const progname = this.props.programmes.map(programme => {
          if (programme.id === objBranch.programme) {
            return programme.name;
          }
          return programme;
        });

        return (
          <Table.Row key={objBranch.id}>
            <Table.Cell collapsing textAlign="center" style={style}>
              {objBranch.name}
            </Table.Cell>
            <Table.Cell style={style} textAlign="center" collapsing>
              {objBranch.code}
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
                  onClick={e => this.editShow(objBranch)}
                />
                <Button
                  icon="trash alternate"
                  negative
                  compact
                  onClick={e => this.deleteShow(objBranch)}
                />
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        );
      }
      return <React.Fragment key={objBranch} />;
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
        <Segment.Group>
          <Segment>
            <Header as="h2">Branch Creation</Header>
          </Segment>
          <Segment.Group horizontal>
            <Segment>
              <Form
                as="form"
                style={{ width: "450px" }}
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Form.Field required>
                  <label>Branch</label>
                  <Field
                    name="name"
                    component={this.renderInput}
                    placeholder="Branch Name"
                  />
                </Form.Field>

                <Form.Field required>
                  <label>Code</label>
                  <Field
                    name="code"
                    component={this.renderInput}
                    placeholder="Code name for Branch"
                  />
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
                    {this.renderProgrammes()}
                  </Field>
                </Form.Field>
                <Form.Field>
                  <Button disabled={this.state.btnActive}>Submit</Button>
                </Form.Field>
              </Form>
            </Segment>
          </Segment.Group>
        </Segment.Group>
        <Divider />
        <Container>
          <Table striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Code</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Degree</Table.HeaderCell>
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
    branch: Object.values(state.branch),
    programmes: Object.values(state.programmes)
  };
};
const formWrapped = reduxForm({
  form: "createBranch"
})(CreateBranch);

export default connect(
  mapStateToProps,
  {
    createBranch,
    fetchBranches,
    fetchProgrammes
  }
)(formWrapped);
