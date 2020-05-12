import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const JobApplicationModal = (props) => {
  let studentsList = "";
  if (props.students === undefined || props.students.length === 0)
    studentsList = "";
  else {
    studentsList = props.students.map((student) => {
      let img = "";

      if (student.studentphoto === "" || student.studentphoto === null) {
        img = (
          <div>
            <div className="studentslistpics">
              <p style={{ paddingTop: "10px" }}>
                {student.studentfname.charAt(0)}
                {student.studentlname.charAt(0)}
              </p>
            </div>
          </div>
        );
      } else {
        img = (
          <Image
            className="studentslistpics"
            src={`http://localhost:3001/resumesandimages/${student.studentphoto}`}
          />
        );
      }

      const path = `/student/${student.studentid}`;

      return (
        <Container key={student.student_id}>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={2}>{img}</Col>
            <Col sm={4} style={{ paddingTop: "10px" }}>
              <Link
                to={path}
                className="studentslistinfo"
                style={{ color: "#1569e0", fontSize: "16px" }}
              >
                {student.studentfname} {student.studentlname}
              </Link>
            </Col>
          </Row>
        </Container>
      );
    });
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Applications</Modal.Title>
      </Modal.Header>
      <Modal.Body>{studentsList}</Modal.Body>
      <Modal.Footer>
        <p>{props.students.length} students have applied. </p>
      </Modal.Footer>
    </Modal>
  );
};

export default JobApplicationModal;
