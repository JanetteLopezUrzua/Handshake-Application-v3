import React from "react";
import Button from "react-bootstrap/Button";
import JobApplicationsModal from "./JobApplicationsModal";
import { graphql } from "react-apollo";
import { getCompanyJobQuery } from "../../../queries/Company/jobs_queries";

class JobApplications extends React.Component {
  constructor() {
    super();

    this.state = {
      job_id: "",
      show: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id });

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true,
    });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let applicants = [];

    if (!data.loading) {
      applicants = data.job.applicants;
    }

    console.log("GGGGGGGGGGGG", data.job);

    let message = "";
    let button = "";
    if (applicants.length === 0) {
      message = "No one has applied to this job.";
      button = (
        <Button style={{ cursor: "not-allowed" }} disabled>
          View Applications
        </Button>
      );
    } else {
      message = "";
      button = <Button onClick={this.handleShow}>View Applications</Button>;
    }

    return (
      <div style={{ textAlign: "right" }}>
        <JobApplicationsModal
          show={this.state.show}
          close={this.handleClose}
          students={applicants}
          handleStatus={this.handleStatus}
        />
        {button}
        <br />
        <p className="errormessage">{message}</p>
      </div>
    );
  }
}

export default graphql(getCompanyJobQuery, {
  options: (props) => ({ variables: { id: props.job_id } }),
})(JobApplications);
