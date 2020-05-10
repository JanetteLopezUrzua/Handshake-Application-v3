import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const DisplayStudent = (props) => {
  const path = `/student/${props.student._id}`;
  let img = "";

  if (props.student.photo === "" || props.student.photo === null) {
    img = (
      <div>
        <div className="studentslistpics">
          <p style={{ paddingTop: "10px" }}>
            {props.student.fname.charAt(0)}
            {props.student.lname.charAt(0)}
          </p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="studentslistpics"
        src={`http://localhost:3001/resumesandimages/${props.student.photo}`}
        roundedcircle="true"
      />
    );
  }

  const degree =
    props.student.degree === "" || props.student.schools[0].degree === null
      ? "No Degree Listed"
      : props.student.schools[0].degree;
  const passingdate =
    props.student.schools[0].passingmonth === "" ||
    props.student.schools[0].passingmonth === null ||
    props.student.schools[0].passingyear === 0 ||
    props.student.schools[0].passingyear === null
      ? "No Passing Date Listed"
      : `${props.student.schools[0].passingmonth} ${props.student.schools[0].passingyear}`;
  const major =
    props.student.schools[0].major === "" ||
    props.student.schools[0].major === null
      ? "No Major Listed"
      : props.student.schools[0].major;

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col sm={2}>{img}</Col>
        <Col sm={5} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">
            <Link to={path} style={{ color: "black" }}>
              {`${props.student.fname} ${props.student.lname}`}
            </Link>
          </Card.Title>
          <Card.Title className="studentslistcollege">
            {props.student.schools[0].name}
          </Card.Title>
          <Card.Title className="studentslistinfo">{degree}</Card.Title>
          <Card.Title className="studentslistinfo">{passingdate}</Card.Title>
        </Col>
        <Col sm={5} style={{ paddingTop: "38px" }}>
          <Card.Title className="studentslistinfo">{major}</Card.Title>
          <Link
            to={path}
            className="studentslistinfo"
            style={{ color: "#1569e0" }}
          >
            Student Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayStudent;
