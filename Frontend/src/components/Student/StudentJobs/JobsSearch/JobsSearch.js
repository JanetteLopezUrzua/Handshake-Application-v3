import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import JobsList from "./JobsList/JobsList";
import JobsDescription from "./JobsDescription";
import { graphql } from "react-apollo";
import { getStudentJobsListQuery } from "../../../queries/Student/jobs_queries";

let search = "";
class JobSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameortitle: "",
      job: "",
      message: "",
      jobs: "",
      search: "",
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.nameortitle !== this.state.nameortitle) {
      search = this.state.nameortitle;
      this.props.data.refetch({ search: search });
    }

    if (previousProps.data !== this.props.data) {
      let data = this.props.data;
      console.log(data);

      let message = null;
      let jobs = null;
      if (!data.loading) {
        jobs = data.jobsSearch;
      }

      if (jobs === undefined || jobs === null) {
        message = "You Have 0 Job Posts";
      } else if (jobs.length === 0) {
        message = "You Have 0 Job Posts";
      } else message = "";

      let jobsList = "";
      // let job = "";

      if (jobs === null || jobs === undefined) jobsList = "";
      else if (jobs.length === 0) jobsList = "";
      else {
        jobsList = jobs;
        // job = jobsList[0];
      }

      this.setState({
        // job,
        message,
        jobs: jobsList,
        search,
      });
    }
  }

  componentDidMount() {
    let data = this.props.data;
    console.log(data);

    let message = null;
    let jobs = null;
    if (!data.loading) {
      jobs = data.jobsSearch;
    }

    if (jobs === undefined || jobs === null) {
      message = "You Have 0 Job Posts";
    } else if (jobs.length === 0) {
      message = "You Have 0 Job Posts";
    } else message = "";

    let jobsList = "";
    let job = "";

    if (jobs === null || jobs === undefined) jobsList = "";
    else if (jobs.length === 0) jobsList = "";
    else {
      jobsList = jobs;
      job = jobsList[0];
    }

    this.setState({
      job,
      message,
      jobs: jobsList,
    });
  }

  handleNameOrTitle = (e) => {
    // e.preventDefault();
    this.setState({
      nameortitle: e.target.value,
    });
  };

  changeJob = (e, pjob) => {
    // e.preventDefault();
    this.setState({
      job: pjob,
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <Container>
        {redirectVar}
        <Card style={{ padding: "15px" }}>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  onChange={this.handleNameOrTitle}
                  type="search"
                  placeholder="Company name or job title"
                />
              </InputGroup>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col sm={4} style={{ paddingRight: "0" }}>
            <JobsList
              jobs={this.state.jobs}
              message={this.state.message}
              changeJob={this.changeJob}
            />
          </Col>
          <Col sm={8} style={{ paddingLeft: "0" }}>
            <JobsDescription job={this.state.job} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default graphql(getStudentJobsListQuery, {
  options: () => ({
    variables: { search: search },
  }),
})(JobSearch);
