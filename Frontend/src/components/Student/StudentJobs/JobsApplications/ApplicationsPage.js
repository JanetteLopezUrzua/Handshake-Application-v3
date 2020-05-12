import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import ApplicationsListContainer from "./ApplicationsListContainer";
import { graphql } from "react-apollo";
import { getStudentApplicationQuery } from "../../../queries/Student/jobs_queries";

class ApplicationsPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

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
    let jobs = null;
    if (!data.loading) {
      jobs = data.applications;
    }

    if (jobs === undefined || jobs === null) {
      message = "No Applications Found";
    } else if (jobs.length === 0) {
      message = "No Applications Found";
    } else message = "";

    let applicationsList = "";

    if (jobs === null || jobs === undefined) applicationsList = "";
    else if (jobs.length === 0) applicationsList = "";
    else {
      applicationsList = jobs.map((application) => (
        <ApplicationsListContainer application={application} />
      ));
    }

    return (
      <div>
        {redirectVar}
        <Container>
          <Row>
            <Col sm={12}>
              <Container>
                {applicationsList}
                <p className="errormessage">{message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default graphql(getStudentApplicationQuery, {
  options: () => ({ variables: { id: localStorage.getItem("id") } }),
})(ApplicationsPage);
