import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createStudent,
  fetchStudents,
  deleteStudent,
  editStudent
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
class createStudents extends Component {
  state = {
    btnActive: true,
    deleteopen: false,
    editopen: false,
    id: null,
    name: null,
    gender: null,
    category: null
  };
  deleteShow = student => {
    this.setState({
      id: student.id,
      name: student.name,
      deleteopen: true
    });
  };
  editShow = student => {
    this.setState({
      id: student.id,
      name: student.name,
      gender: student.Gender,
      category: student.category,
      editopen: true
    });
  };
  closeDelete = () => {
    this.setState({
      deleteopen: false,
      id: null,
      name: null,
      gender: null,
      category: null
    });
  };
  closeEdit = () => {
    this.setState({
      editopen: false,
      id: null,
      name: null,
      gender: null,
      category: null
    });
  };
  deleteStudentFunction = async () => {
    await this.props.deleteStudent(this.state.id);
    this.setState({
      deleteopen: false,
      id: null,
      name: null,
      gender: null,
      category: null
    });
  };
  onSubmitEdit = async e => {
    e.preventDefault();
    const formValues = {
      name: this.state.name,
      Gender: this.state.gender,
      category: this.state.category
    };

    await this.props.editStudent(this.state.id, formValues);
    this.setState({
      editopen: false,
      id: null,
      name: null,
      gender: null,
      category: null
    });
  };
  componentDidMount() {
    this.props.fetchStudents();
  }

  onSubmit = formValues => {
    this.props.createStudent(formValues);
    this.props.reset("createStudent");
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
    if (this.props.students.length > 0) {
      return this.props.students.map(student => {
        if (student) {
          return (
            <React.Fragment key={student.id}>
              <Table.Row key={student.id}>
                <Table.Cell collapsing>{student.id}</Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell collapsing>{student.Gender}</Table.Cell>
                <Table.Cell collapsing>{student.category}</Table.Cell>
                <Table.Cell collapsing>
                  <Button.Group compact>
                    <Button
                      icon="edit"
                      primary
                      compact
                      onClick={e => this.editShow(student)}
                    />
                    <Button
                      icon="trash alternate"
                      negative
                      compact
                      onClick={e => this.deleteShow(student)}
                    />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          );
        }
        return student;
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Container text>
          <Header as="h2" textAlign="center" block style={{ marginTop: "5px" }}>
            Create Student
          </Header>

          <Segment attached>
            <Form as="form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Form.Field>
                <Field
                  name="id"
                  component={this.renderInput}
                  label="Enter Roll Number"
                />
              </Form.Field>
              <Form.Field>
                <Field
                  name="name"
                  component={this.renderInput}
                  label="Enter Name"
                />
              </Form.Field>
              <Form.Group inline>
                <label> Sex:</label>
                <Form.Field>
                  <label>
                    <Field
                      name="Gender"
                      component="input"
                      type="radio"
                      value="MALE"
                    />
                    Male
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    <Field
                      name="Gender"
                      component="input"
                      type="radio"
                      value="FEMALE"
                    />
                    Female
                  </label>
                </Form.Field>
              </Form.Group>
              <Form.Field>
                <Field
                  name="category"
                  component="select"
                  onChange={e =>
                    e.target.value === "-- Select Category --"
                      ? this.setState({ btnActive: true })
                      : this.setState({ btnActive: false })
                  }
                >
                  <option>-- Select Category --</option>
                  <option value="ST">Scheduled Tribe</option>
                  <option value="SC">Scheduled Caste</option>
                  <option value="OBC">Other Backward Classes</option>
                  <option value="GEN">General</option>
                </Field>
              </Form.Field>
              <Button disabled={this.state.btnActive}>Submit</Button>
            </Form>
          </Segment>
          <Table celled striped size="small">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Roll number</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Sex</Table.HeaderCell>
                <Table.HeaderCell>Categories</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">...</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderStudents()}</Table.Body>
          </Table>
        </Container>

        <Modal
          name="delete"
          size="small"
          open={this.state.deleteopen}
          onClose={this.closeDelete}
        >
          <Modal.Header>Delete Student</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {this.state.name}?</p>
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
              onClick={this.deleteStudentFunction}
            />
          </Modal.Actions>
        </Modal>
        <Modal
          name="edit"
          size="small"
          open={this.state.editopen}
          onClose={this.closeEdit}
        >
          <Modal.Header>Edit Student</Modal.Header>
          <Modal.Content>
            <Container>
              <Form size="small" as="form" onSubmit={this.onSubmitEdit}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Gender</label>
                  <input
                    placeholder="Gender"
                    name="Gender"
                    value={this.state.gender}
                    onChange={e => this.setState({ gender: e.target.value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Category</label>
                  <input
                    placeholder="Category"
                    name="category"
                    value={this.state.category}
                    onChange={e => this.setState({ category: e.target.value })}
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
  return { students: Object.values(state.students) };
};
const formWrapped = reduxForm({
  form: "createStudent"
})(createStudents);

export default connect(
  mapStateToProps,
  {
    createStudent,
    fetchStudents,
    deleteStudent,
    editStudent
  }
)(formWrapped);
