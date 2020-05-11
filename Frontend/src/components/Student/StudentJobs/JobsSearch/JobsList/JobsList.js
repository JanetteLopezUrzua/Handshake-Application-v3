import React from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import JobsListDisplay from "./JobsListDisplay";

class JobsLists extends React.Component {
  render() {
    let jobsList = "";

    if (this.props.jobs === undefined || this.props.jobs === null)
      jobsList = "";
    else if (this.props.jobs.length === 0) jobsList = "";
    else
      jobsList = this.props.jobs.map((job) => (
        <JobsListDisplay
          key={job._id}
          job={job}
          changeJob={this.props.changeJob}
        />
      ));

    return (
      <Card
        style={{
          marginRight: "0",
          borderBottomRightRadius: "0",
          borderTopRightRadius: "0",
          maxHeight: "450px",
          height: "450px",
          overflowY: "scroll",
        }}
      >
        <p>{jobsList.length} Job Posts </p>
        <Nav>{jobsList}</Nav>
        <p className="errormessage">{this.props.message}</p>
      </Card>
    );
  }
}

export default JobsLists;
