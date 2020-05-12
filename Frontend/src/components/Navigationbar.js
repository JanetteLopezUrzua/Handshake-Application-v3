import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import hslogo from "../assets/logo.JPG";
import { graphql, compose } from "react-apollo";
import { getCompanyPictureInfoQuery } from "../components/queries/Company/auth_and_profile_queries";
import { getStudentPictureInfoQuery } from "../components/queries/Student/auth_and_profile_queries";

class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      photo: "",
      has_image: false,
      firstnameletter: "",
      lastnameletter: "",

      // Company
      nameletter: "",
    };
  }

  // handle logout by removing items in localstorage
  handleLogout = () => {
    localStorage.removeItem("id", { path: "/" });
    localStorage.removeItem("type", { path: "/" });
  };

  render() {
    let data = this.props.getCompanyPictureInfoQuery;
    console.log(data);

    let name = "";
    let photo = null;

    console.log(
      "VVVVVVVVVVVVVVVVVVVVVVVVVVVvv",
      this.props.getCompanyPictureInfoQuery
    );
    if (!data.loading) {
      if (localStorage.getItem("type") === "Company") {
        name = this.props.getCompanyPictureInfoQuery.company.name;
        photo = this.props.getCompanyPictureInfoQuery.company.photo;
      } else {
        name =
          this.props.getStudentPictureInfoQuery.student.fname.charAt(0) +
          this.props.getStudentPictureInfoQuery.student.lname.charAt(0);
        photo = this.props.getStudentPictureInfoQuery.student.photo;
      }
    }

    let has_image = null;
    if (photo === null) has_image = false;
    else has_image = true;

    let img = "";

    if (localStorage.getItem("type") === "Student") {
      if (has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p className="navbarpic">{name}</p>
          </div>
        );
      }
    }

    if (localStorage.getItem("type") === "Company") {
      if (has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p className="navbarpic">{name.charAt(0)}</p>
          </div>
        );
      }
    }

    let jobspath = "";
    if (localStorage.getItem("type") === "Student") {
      jobspath = "/student/jobs/search";
    } else {
      jobspath = "/company/jobs";
    }

    return (
      <Navbar id="navbar" expand="lg">
        <Nav.Link>
          <img id="logo" src={hslogo} alt="handshake logo" />
        </Nav.Link>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="searchbar">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="searchbar"
            id="searchtext"
            type="search"
            placeholder="Search"
          />
        </InputGroup>
        <Nav className="ml-auto">
          <Link className="navbaritem" to={jobspath}>
            <span>Jobs</span>
          </Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Events</span>
          </Nav.Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Q&amp;A</span>
          </Nav.Link>
          <Link
            className="navbaritem"
            to={`/${localStorage.getItem("type").toLowerCase()}/students`}
          >
            <span>Students</span>
          </Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Messages</span>
          </Nav.Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Career Center</span>
          </Nav.Link>
          <NavDropdown className="navbardropdown" title={img}>
            <Link
              style={{ color: "black" }}
              to={`/${localStorage
                .getItem("type")
                .toLowerCase()}/${localStorage.getItem("id")}`}
            >
              Profile
            </Link>
            <NavDropdown.Divider />
            <Link style={{ color: "black" }} onClick={this.handleLogout} to="/">
              Sign Out
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

export default compose(
  graphql(getCompanyPictureInfoQuery, {
    name: "getCompanyPictureInfoQuery",
    options: () => ({ variables: { id: localStorage.getItem("id") } }),
  }),
  graphql(getStudentPictureInfoQuery, {
    name: "getStudentPictureInfoQuery",
    options: () => ({ variables: { id: localStorage.getItem("id") } }),
  })
)(Navigationbar);
