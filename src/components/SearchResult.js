import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchStudent,
  fetchExamination,
  fetchCourses,
  resetCourses
} from "../actions";
import { Segment, Header, Container, Table, List } from "semantic-ui-react";

class SearchResult extends Component {
  state = {
    semesters: ["First", "Second"],
    FirstTotal: null,
    SecondTotal: null,
    ThirdTotal: null,
    FourthTotal: null
  };
  async componentDidMount() {
    this.props.fetchExamination(this.props.match.params.id);
    this.props.fetchCourses();
    this.props.fetchStudent(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.resetCourses();
  }
  Tables = () => {
    return (
      <Segment>
        <Container>
          <Table
            selectable
            color="green"
            celled
            structured
            stackable
            size="small"
            compact
            striped
          >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">SEM</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">CODE</Table.HeaderCell>
                <Table.HeaderCell textAlign="center" colSpan={2}>
                  Corse Name
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">FM</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">PM</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Sess</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Sem</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Total</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderMarks("First")}</Table.Body>

            <Table.Body>{this.renderMarks("Second")}</Table.Body>
            <Table.Body>{this.renderMarks("Third")}</Table.Body>
            <Table.Body>{this.renderMarks("Fourth")}</Table.Body>
          </Table>
          <Table celled striped size="small">
            <Table.Body>
              <Table.Row>
                <Table.Cell
                  style={{ padding: 0 }}
                  textAlign="center"
                  collapsing
                >
                  <b>Semester</b>
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  I
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  II
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  III
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  IV
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  Grand Total
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  <b>Total Marks</b>
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  {this.renderTotal("First")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  {this.renderTotal("Second")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  {this.renderTotal("Third")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  {this.renderTotal("Fourth")}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{ padding: 0 }}
                  collapsing
                >
                  <b>
                    {this.renderTotal("First") +
                      this.renderTotal("Second") +
                      this.renderTotal("Third") +
                      this.renderTotal("Fourth")}
                  </b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Segment>
    );
  };
  renderInput = ({ placeholder, input }) => {
    return (
      <div>
        <input {...input} placeholder={placeholder} />
      </div>
    );
  };
  renderStudents = () => {
    if (this.props.students) {
      return Array(this.props.students).map(std => {
        return (
          <Segment key={std.id}>
            <List key={std.id}>
              <List.Item>
                <List.Content floated="right">
                  Exam. Roll Number: {std.id}
                </List.Content>

                <List.Content>Student Name: {std.name}</List.Content>
              </List.Item>
            </List>
          </Segment>
        );
      });
    }
  };
  renderTotal = sem => {
    if (this.props.marks[sem]) {
      const totals = this.props.marks[sem].reduce(
        (totalss, mark) => mark.session + mark.semester + totalss,
        0
      );
      return totals;
    }
    return "-";
  };
  renderMarks = sem => {
    const style = { padding: 0 };
    if (this.props.marks[sem]) {
      var semcount = 0;

      return this.props.marks[sem]
        .sort((c, cu) => {
          var a = c.code.toLowerCase();
          var b = cu.code.toLowerCase();
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        })
        .map(mark => {
          if (mark) {
            const course = this.props.courses.map(course => {
              if (course.code === mark.code) {
                return course.name;
              }
              return <React.Fragment key={course.id} />;
            });

            return (
              <React.Fragment key={mark.mid}>
                <Table.Row
                  key={mark.mid}
                  negative={mark.type === "repeat" ? true : false}
                >
                  <Table.Cell
                    textAlign="center"
                    rowSpan="2"
                    style={style}
                    collapsing
                  >
                    {(semcount = semcount + 1) === 1 ? sem : null}
                  </Table.Cell>
                  <Table.Cell rowSpan="2" collapsing style={style}>
                    {mark.code}
                  </Table.Cell>
                  <Table.Cell rowSpan="2" style={style}>
                    {course}
                  </Table.Cell>
                  <Table.Cell style={style} collapsing textAlign="center">
                    <b> Theory</b>
                  </Table.Cell>
                  <Table.Cell style={style} collapsing textAlign="center">
                    100
                  </Table.Cell>
                  <Table.Cell style={style} collapsing textAlign="center">
                    40
                  </Table.Cell>
                  <Table.Cell style={style} collapsing textAlign="center">
                    {mark.session}
                  </Table.Cell>
                  <Table.Cell style={style} collapsing textAlign="center">
                    {mark.semester}
                  </Table.Cell>
                  <Table.Cell
                    style={style}
                    textAlign="center"
                    collapsing
                    rowSpan="2"
                  >
                    {mark.semester + mark.session}
                  </Table.Cell>
                  <Table.Cell
                    rowSpan="2"
                    collapsing
                    style={style}
                    textAlign="center"
                  >
                    {mark.type}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={style} collapsing textAlign="center">
                    <b>Practical</b>
                  </Table.Cell>
                  <Table.Cell style={style} textAlign="center">
                    -
                  </Table.Cell>
                  <Table.Cell style={style} textAlign="center">
                    -
                  </Table.Cell>
                  <Table.Cell style={style} textAlign="center">
                    -
                  </Table.Cell>
                  <Table.Cell style={style} textAlign="center">
                    -
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            );
          }
          return mark;
        });
    }
  };
  render() {
    if (this.props.students) {
      if (this.props.marks.name) {
        return (
          <React.Fragment>
            <Container> {this.renderStudents()} </Container>
            <Header as="h1" textAlign="center">
              No Marks
            </Header>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Container> {this.renderStudents()} </Container>
            {this.Tables()}
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <Container>
            <Header as="h5" textAlign="center">
              Search Not Found
            </Header>
          </Container>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    students: state.students[ownProps.match.params.id],
    marks: state.marks,
    courses: Object.values(state.courses)
  };
};

export default connect(
  mapStateToProps,
  {
    fetchStudent,
    fetchExamination,
    fetchCourses,
    resetCourses
  }
)(SearchResult);
