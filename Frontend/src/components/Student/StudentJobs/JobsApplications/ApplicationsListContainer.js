import React from "react";
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const EventListContainer = (props) => {
  let img = "";

  if (props.application.photo === "" || props.application.photo === null) {
    img = (
      <div style={{ paddingLeft: "40px" }}>
        <div className="eventslistpics">
          <p style={{ paddingTop: "10px" }}>
            {props.application.name.charAt(0)}
          </p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="eventslistpics"
        src={`http://localhost:3001/resumesandimages/${props.application.photo}`}
      />
    );
  }

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col
          sm={2}
          style={{ paddingRight: "0", paddingLeft: "0", textAlign: "center" }}
        >
          {img}
        </Col>
        <Col sm={10} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">
            {props.application.title}
          </Card.Title>
          <Card.Title
            className="studentslistcollege"
            style={{ textTransform: "none" }}
          >
            {props.application.name}
          </Card.Title>
        </Col>
      </Row>
    </Card>
  );
};

export default EventListContainer;
