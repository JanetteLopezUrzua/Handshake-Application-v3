import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import DisplayStudent from "./StudentsList/DisplayStudent";
import { graphql } from "react-apollo";
import { getStudentStudentsTabQuery } from "../../queries/Student/students_tab_queries";

class StudentTab extends React.Component {
  constructor() {
    super();
    this.state = {
      nameorcollege: "",
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.nameorcollege !== this.state.nameorcollege) {
      let search = this.state.nameorcollege;
      this.props.data.refetch({ search: search });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    } else if (
      localStorage.getItem("id") &&
      localStorage.getItem("type") === "Company"
    ) {
      redirectVar = <Redirect to={`/company/${localStorage.getItem("id")}`} />;
    }

    let data = this.props.data;
    console.log(data);

    let message = null;
    let students = null;
    if (!data.loading) {
      students = data.students;
    }

    if (students === null || students.length === 0) {
      message = "No Students Found";
    } else message = "";

    let studentsList = "";

    if (students === null || students.length === 0) studentsList = "";
    else
      studentsList = students.map((student) => (
        <DisplayStudent key={student._id} student={student} />
      ));

    return (
      <div>
        {redirectVar}
        <Card className="studentslistbarcard">
          <Container>
            <Row>
              <Col sm={4}>
                <Card.Title className="studentslistbar">
                  <h2>Explore Students</h2>
                </Card.Title>
              </Col>
            </Row>
          </Container>
        </Card>
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>Search</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">
                      Name or College
                    </Card.Text>
                    <Form.Group controlId="nameorcollege">
                      <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        type="search"
                        value={this.state.nameorcollege}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {studentsList}
                <p className="errormessage">{message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default graphql(getStudentStudentsTabQuery, {
  options: () => ({
    variables: { search: "" },
  }),
})(StudentTab);
