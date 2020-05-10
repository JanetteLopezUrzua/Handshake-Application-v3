import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import JobInfo from "../JobInfo/JobInfo";
import JobApplications from "../JobApplications/JobApplications";
import { graphql, compose } from "react-apollo";
import {
  getCompanyJobQuery,
  getCompanyJobsListQuery,
} from "../../../queries/Company/jobs_queries";
import { deleteCompanyJobPostMutation } from "../../../mutation/Company/jobs_mutations";

class JobContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  handleDelete = async () => {
    try {
      let data = await this.props.deleteCompanyJobPostMutation({
        variables: {
          id: this.props.match.params.job_id,
        },
        refetchQueries: [
          {
            query: getCompanyJobsListQuery,
            variables: { id: localStorage.getItem("id") },
          },
        ],
      });

      console.log(data);

      this.setState({ redirect: true });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (!localStorage.getItem("id")) {
      redirectVar = <Redirect to="/" />;
    }

    if (this.state.redirect === true) {
      redirectVar = <Redirect to="/company/jobs" />;
    }

    let del = "";
    let data = this.props.data;
    console.log(data);

    let company_id = "";

    if (!data.loading) {
      company_id = data.job.companyid;
    }

    if (
      localStorage.getItem("id") === company_id &&
      localStorage.getItem("type") === "Company"
    ) {
      del = (
        <Button
          className="delete"
          style={{ margin: "15px" }}
          onClick={this.handleDelete}
        >
          Delete Job Post
        </Button>
      );
    }

    return (
      <Container>
        {redirectVar}
        <Card>
          <JobApplications job_id={this.props.match.params.job_id} />
          <JobInfo job_id={this.props.match.params.job_id} />
        </Card>
        {del}
      </Container>
    );
  }
}

export default compose(
  graphql(getCompanyJobQuery, {
    options: (props) => ({ variables: { id: props.match.params.job_id } }),
  }),
  graphql(deleteCompanyJobPostMutation, {
    name: "deleteCompanyJobPostMutation",
  })
)(JobContainer);
