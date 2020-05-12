import React from "react";
import "../../../components.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaRegClock, FaBriefcase } from "react-icons/fa";
import { graphql } from "react-apollo";
import { applyMutation } from "../../../mutation/Student/jobs_mutations";

class JobDescriptionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  apply = async (e) => {
    e.preventDefault();
    try {
      let data = await this.props.applyMutation({
        variables: {
          jobid: this.props.job._id,
          studentid: localStorage.getItem("id"),
        },
      });

      console.log(data);

      this.setState({ editWasTriggered: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    const path = `/company/${this.props.job.companyid}`;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];

    let applicants;
    applicants = this.props.job.applicants;

    let alreadyApplied = false;
    let applicant;
    for (applicant of applicants) {
      if (applicant.studentid === localStorage.getItem("id")) {
        alreadyApplied = true;
      }
    }

    let button = "";
    if (alreadyApplied === true) {
      button = (
        <Button className="cancel" style={{ backgroundColor: "#ccc" }} disabled>
          Applied
        </Button>
      );
    } else
      button = (
        <Button className="save" onClick={this.apply}>
          Apply
        </Button>
      );

    return (
      <div>
        <Card.Body style={{ paddingBottom: "0" }}>
          <Row>
            <Card.Title
              style={{
                textTransform: "capitalize",
                margin: "0",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                lineHeight: "none",
              }}
            >
              {this.props.job.title}
            </Card.Title>
          </Row>
          <Card.Title>
            <Link to={path} style={{ color: "black", fontSize: "16px" }}>
              {this.props.job.companyname}
            </Link>
          </Card.Title>
          <Row>
            <Card.Text
              style={{
                marginRight: "5px",
                marginLeft: "5px",
                fontSize: "14px",
              }}
            >
              <FaBriefcase /> {this.props.job.category}{" "}
            </Card.Text>
            <Card.Text
              style={{
                marginRight: "5px",
                marginLeft: "5px",
                fontSize: "14px",
              }}
            >
              <MdLocationOn /> {this.props.job.location}{" "}
            </Card.Text>
            <Card.Text
              style={{
                marginRight: "5px",
                marginLeft: "5px",
                fontSize: "14px",
              }}
            >
              <FaRegMoneyBillAlt /> {`$${this.props.job.salary}`} per{" "}
              {this.props.job.salarytime}{" "}
            </Card.Text>
            <Card.Text
              style={{
                marginRight: "5px",
                marginLeft: "5px",
                fontSize: "14px",
              }}
            >
              <FaRegClock /> Posted {this.props.job.postingdate}{" "}
            </Card.Text>
          </Row>
          <Card
            style={{ boxShadow: "none", marginLeft: "0", marginRight: "0" }}
          >
            <Row>
              <Col sm={10}>
                <Card.Title style={{ fontSize: "16px" }}>
                  Applications close on{" "}
                  {months[this.props.job.deadlinemonth - 1]}{" "}
                  {this.props.job.deadlineday}, {this.props.job.deadlineyear} at{" "}
                  {this.props.job.deadlinetime}{" "}
                  {this.props.job.deadlinedaytime.toLowerCase()}
                </Card.Title>
              </Col>
              <Col sm={2}>{button}</Col>
            </Row>
          </Card>
          <Card.Title style={{ fontSize: "14px" }}>
            {this.props.job.description}
          </Card.Title>
        </Card.Body>
      </div>
    );
  }
}

export default graphql(applyMutation, {
  name: "applyMutation",
})(JobDescriptionDisplay);
