import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import JobsListContainer from "./JobsListContainer/JobsListContainer";
import { graphql } from "react-apollo";
import { getCompanyJobsListQuery } from "../../queries/Company/jobs_queries";

class JobsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      company_id: localStorage.getItem("id"),
    };
  }

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    }

    let data = this.props.data;
    console.log(data);

    let message = null;
    let jobs = null;
    if (!data.loading) {
      jobs = data.jobs;
    }

    if (jobs === undefined || jobs === null) {
      message = "You Have 0 Job Posts";
    } else if (jobs.length === 0) {
      message = "You Have 0 Job Posts";
    } else message = "";

    let jobsList = "";

    if (jobs === null || jobs === undefined) jobsList = "";
    else if (jobs.length === 0) jobsList = "";
    else
      jobsList = jobs.map((job) => (
        <JobsListContainer key={job._id} job={job} />
      ));

    return (
      <Container style={{ width: "60%" }}>
        {redirectVar}
        <Link
          style={{ margin: "15px", display: "block" }}
          to="/company/jobs/new"
        >
          Create a New Job Posting
        </Link>
        <p className="errormessage">{message}</p>
        {jobsList}
      </Container>
    );
  }
}

export default graphql(getCompanyJobsListQuery, {
  options: () => ({ variables: { id: localStorage.getItem("id") } }),
})(JobsPage);
