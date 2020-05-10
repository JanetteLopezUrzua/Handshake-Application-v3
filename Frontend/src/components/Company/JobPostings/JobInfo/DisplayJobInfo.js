import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaRegClock, FaBriefcase } from "react-icons/fa";

const DisplayInfo = (props) => {
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
    "October",
    "November",
    "December",
  ];

  const posteddatemonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let posteddate = `${posteddatemonths[props.postingmonth]} ${
    props.postingday
  }, ${props.postingyear}`;

  return (
    <Card style={{ border: "none", boxShadow: "none", padding: "0" }}>
      <Card.Body style={{ paddingBottom: "0" }}>
        <Row>
          <Col>
            <Card.Title
              style={{
                textTransform: "capitalize",
                margin: "0",
                color: "black",
                fontSize: "40",
                fontWeight: "bold",
                lineHeight: "none",
              }}
            >
              {props.title}
            </Card.Title>
          </Col>
        </Row>
        <Card.Title>{props.company_name}</Card.Title>
        <Row>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaBriefcase /> {props.category}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <MdLocationOn /> {props.location}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaRegMoneyBillAlt /> {`$${props.salary}`} per {props.salarytime}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaRegClock /> Posted {posteddate}{" "}
          </Card.Text>
        </Row>
        <Card style={{ boxShadow: "none" }}>
          <Card.Title>
            Applications close on {months[props.deadlinemonth - 1]}{" "}
            {props.deadlineday}, {props.deadlineyear} at {props.deadlinetime}{" "}
            {props.deadlinedaytime.toLowerCase()}
          </Card.Title>
        </Card>
        <Card.Title>{props.description}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default DisplayInfo;
