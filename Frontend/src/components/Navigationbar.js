import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import hslogo from "../assets/logo.JPG";

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

  componentDidMount() {
    if (localStorage.getItem("type") === "Student") this.getStudentImage();
    if (localStorage.getItem("type") === "Company") this.getCompanyImage();
  }

  getStudentImage() {
    axios
      .get(`http://localhost:3001/student/navbar/${this.state.id}`)
      .then((response) => {
        const info = response.data;

        const fn = info.fname.charAt(0);
        const ln = info.lname.charAt(0);

        console.log(response.data);
        this.setState({
          photo: info.photo,
          firstnameletter: fn,
          lastnameletter: ln,
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false,
          });
        } else {
          this.setState({
            has_image: true,
          });
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  }

  getCompanyImage() {
    axios
      .get(`http://localhost:3001/company/navbar/${this.state.id}`)
      .then((response) => {
        const info = response.data;

        const cn = info.name.charAt(0);

        console.log(response.data);
        this.setState({
          photo: info.photo,
          nameletter: cn,
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false,
          });
        } else {
          this.setState({
            has_image: true,
          });
        }

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
      });
  }

  // handle logout by removing items in localstorage
  handleLogout = () => {
    localStorage.removeItem("id", { path: "/" });
    localStorage.removeItem("type", { path: "/" });
  };

  render() {
    let img = "";

    if (localStorage.getItem("type") === "Student") {
      if (this.state.has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p className="navbarpic">
              {this.state.firstnameletter}
              {this.state.lastnameletter}
            </p>
          </div>
        );
      }
    }

    if (localStorage.getItem("type") === "Company") {
      if (this.state.has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${this.state.photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p className="navbarpic">{this.state.nameletter}</p>
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

export default Navigationbar;
