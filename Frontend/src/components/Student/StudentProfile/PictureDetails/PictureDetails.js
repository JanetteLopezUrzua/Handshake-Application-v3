import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import ModalPicture from "./Modal";
import { graphql, compose } from "react-apollo";
import { getStudentPictureInfoQuery } from "../../../queries/Student/queries";
import {
  updateStudentPictureInfoMutation,
  deleteStudentPictureMutation,
} from "../../../mutation/Student/mutations";

class PictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      fname: "",
      lname: "",
      college: "",
      show: false,
      data: "",
      photo: "",
      validimage: "",
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  photoHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getImage(file);
  };

  getImage = (file) => {
    const data = new FormData();

    if (file && file.type.match("image.*")) {
      data.append("file", file);
      data.append("name", "file");
      this.setState({
        data,
        validimage: true,
        errormessage: "",
      });
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image.",
      });
    }
  };

  onUpload = async (e) => {
    console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      console.log(this.state.data);

      try {
        let response = await axios.post(
          "http://localhost:3001/upload",
          this.state.data
        );

        console.log(response.data);

        let photo = response.data;

        try {
          let data = await this.props.updateStudentPictureInfoMutation({
            variables: {
              id: this.props.id,
              photo: photo,
            },
            refetchQueries: [
              {
                query: getStudentPictureInfoQuery,
                variables: { id: this.props.id },
              },
            ],
          });

          console.log(data);

          this.setState({ show: false });
          this.props.photochange();
        } catch (err) {
          console.log(err.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  handleClose = () => {
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: false,
      errormessage: "",
    });
  };

  handleShow = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    this.setState({
      show: true,
    });

  onDelete = async (e) => {
    e.preventDefault();

    let { id } = this.state;

    try {
      let data = await this.props.deleteStudentPictureMutation({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: getStudentPictureInfoQuery,
            variables: { id: this.props.id },
          },
        ],
      });

      console.log(data);

      this.setState({ show: false });
      this.props.photochange();
    } catch (err) {
      console.log(err.message);
    }
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let fname = null;
    let lname = null;
    let college = null;
    let photo = null;
    if (!data.loading) {
      fname = this.props.data.student.fname;
      lname = this.props.data.student.lname;
      college = this.props.data.student.schools.filter((school) => {
        if (school.primaryschool === "true") return school;
      });
      if (college === undefined) college = "";
      else college = college[0].name;
      photo = this.props.data.student.photo;
    }

    let has_image = null;
    if (photo === null) has_image = false;
    else has_image = true;

    let studentPhoto = "";

    if (has_image === false) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "Student"
      ) {
        studentPhoto = (
          <Button className="ProfilePicButton" onClick={this.handleShow}>
            <Row>
              <FaCamera size={25} style={{ margin: "0 auto" }} />
            </Row>
            <Row>
              <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                Add a Photo
              </h5>
            </Row>
          </Button>
        );
      } else {
        studentPhoto = (
          <div>
            <p className="ProfilePicNoImage">
              {fname.charAt(0)}
              {lname.charAt(0)}
            </p>
          </div>
        );
      }
    } else if (has_image === true) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "Student"
      ) {
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
            <Button
              className="ProfilePicButtononImage"
              onClick={this.handleShow}
            >
              <Row>
                <FaCamera size={25} style={{ margin: "0 auto" }} />
              </Row>
              <Row>
                <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                  Change Photo
                </h5>
              </Row>
            </Button>
          </>
        );
      } else {
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
          </>
        );
      }
    }

    return (
      <Card>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={has_image}
          onDelete={this.onDelete}
        />
        {studentPhoto}
        <Card.Title
          style={{
            fontSize: "34px",
            fontWeight: "500",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {fname}
          <br />
          {lname}
        </Card.Title>
        <Card.Subtitle
          style={{
            fontSize: "18px",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {college}
        </Card.Subtitle>
      </Card>
    );
  }
}

export default compose(
  graphql(getStudentPictureInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateStudentPictureInfoMutation, {
    name: "updateStudentPictureInfoMutation",
  }),
  graphql(deleteStudentPictureMutation, {
    name: "deleteStudentPictureMutation",
  })
)(PictureDetails);
