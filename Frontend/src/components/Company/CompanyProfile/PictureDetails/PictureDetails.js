import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCamera } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import ModalPicture from "./Modal";
import { graphql, compose } from "react-apollo";
import { getCompanyPictureInfoQuery } from "../../../queries/Company/auth_and_profile_queries";
import {
  updateCompanyPictureInfoMutation,
  updateCompanyNameMutation,
  deleteCompanyPictureMutation,
} from "../../../mutation/Company/auth_and_profile_mutations";

class PictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      show: false,
      data: "",
      photo: "",
      validimage: "",
      errormessage: "",
      nameerrormessage: "",
      editWasTriggered: false,
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
      console.log(data);
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
          let data = await this.props.updateCompanyPictureInfoMutation({
            variables: {
              id: this.props.id,
              photo: photo,
            },
            refetchQueries: [
              {
                query: getCompanyPictureInfoQuery,
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
      let data = await this.props.deleteCompanyPictureMutation({
        variables: {
          id: id,
        },
        refetchQueries: [
          {
            query: getCompanyPictureInfoQuery,
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

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const wspatt = new RegExp("^ *$");

    if (wspatt.test(this.state.name) || this.state.name === "") {
      this.setState({
        nameerrormessage: "Enter Company Name",
      });
    } else {
      let { id, name } = this.state;

      try {
        let data = await this.props.updateCompanyNameMutation({
          variables: {
            id: id,
            name: name,
          },
          refetchQueries: [
            {
              query: getCompanyPictureInfoQuery,
              variables: { id: this.props.id },
            },
          ],
        });

        console.log(data);

        this.setState({ nameerrormessage: "", editWasTriggered: false });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  handleCancel = () => {
    this.setState({ name: "", nameerrormessage: "", editWasTriggered: false });
  };

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let name = "";
    let photo = null;
    if (!data.loading) {
      name = this.props.data.company.name;
      photo = this.props.data.company.photo;
    }

    let has_image = null;
    if (photo === null) has_image = false;
    else has_image = true;

    let profilePhoto = "";

    if (has_image === false) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "Company"
      ) {
        profilePhoto = (
          <Button className="CompanyProfilePicButton" onClick={this.handleShow}>
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
        profilePhoto = (
          <p className="CompanyProfilePicNoImage">{name.charAt(0)}</p>
        );
      }
    } else if (has_image === true) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "Company"
      ) {
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
            />
            <Button
              className="CompanyProfilePicButtononImage"
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
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
            />
          </>
        );
      }
    }
    let button = "";
    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "Company"
    ) {
      button = (
        <Col style={{ textAlign: "right" }}>
          <Button className="editbutton" onClick={this.handleClick}>
            <MdEdit style={{ color: "black" }} />
          </Button>
        </Col>
      );
    }

    let display = "";
    display = (
      <Row>
        <Col>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {name}
          </Card.Title>
        </Col>
        {button}
      </Row>
    );

    if (this.state.editWasTriggered) {
      display = (
        <Card>
          <Form.Group controlId="Name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.nameChangeHandler}
              name="name"
              type="text"
              value={this.state.name}
            />
            <p className="errormessage" style={{ fontSize: "13px" }}>
              {this.state.nameerrormessage}
            </p>
          </Form.Group>
          <Card.Footer>
            <Button className="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button className="save" onClick={this.handleSave}>
              Save
            </Button>
          </Card.Footer>
        </Card>
      );
    }

    return (
      <Card style={{ padding: "0" }}>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={has_image}
          onDelete={this.onDelete}
        />
        <Row>
          <Col sm={2}>
            <Card style={{ height: "122px", width: "122px", padding: "0" }}>
              {profilePhoto}
            </Card>
          </Col>
          <Col sm={10}>
            <Card.Body style={{ paddingBottom: "0" }}>
              <NavDropdown.Divider style={{ color: "rgba(0, 0, 0, 0.98)" }} />
              <Card
                style={{
                  border: "none",
                  boxShadow: "none",
                  color: "rgba(0, 0, 0, 0.98)",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                {display}
              </Card>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default compose(
  graphql(getCompanyPictureInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateCompanyPictureInfoMutation, {
    name: "updateCompanyPictureInfoMutation",
  }),
  graphql(updateCompanyNameMutation, {
    name: "updateCompanyNameMutation",
  }),
  graphql(deleteCompanyPictureMutation, {
    name: "deleteCompanyPictureMutation",
  })
)(PictureDetails);
