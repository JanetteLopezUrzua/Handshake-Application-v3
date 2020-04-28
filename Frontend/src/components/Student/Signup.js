import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/Handshakebanner.jpg";
import { graphql } from "react-apollo";
import { addStudentMutation } from "../mutation/Student/mutations";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      college: "",
      errormessages: {},
    };
  }

  fnameChangeHandler = (e) => {
    this.setState({
      fname: e.target.value,
    });
  };

  lnameChangeHandler = (e) => {
    this.setState({
      lname: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  collegeChangeHandler = (e) => {
    this.setState({
      college: e.target.value,
    });
  };

  signup = async (e) => {
    e.preventDefault();

    let { fname, lname, email, password, college } = this.state;

    let fnameerrormsg = "";
    let lnameerrormsg = "";
    let collegeerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that name and college inputs include letters only
    const lettpatt = new RegExp("^[a-zA-Z ]*$");
    const wspatt = new RegExp("^ *$");

    if (fname === "" || wspatt.test(fname)) {
      fnameerrormsg = "Required. Enter First Name.";
    } else if (!lettpatt.test(fname)) {
      fnameerrormsg = "First name can include letters only";
    }

    if (lname === "" || wspatt.test(lname)) {
      lnameerrormsg = "Required. Enter Last Name.";
    } else if (!lettpatt.test(lname)) {
      lnameerrormsg = "Last name can include letters only";
    }

    if (college === "" || wspatt.test(college)) {
      collegeerrormsg = "Required. Enter College Name.";
    } else if (!lettpatt.test(college)) {
      collegeerrormsg = "College name can include letters only";
    }

    // Check that email input is valid
    const emailpatt = new RegExp("\\S+@\\S+\\.\\S+");

    if (email === "" || wspatt.test(email)) {
      emailerrormsg = "Required. Enter Email.";
    } else if (!emailpatt.test(email)) {
      emailerrormsg = "Email is not valid.";
    }

    // password is at least 8 characters and 1 number
    const passpatt = new RegExp("^[a-zA-Z0-9]{8,16}$");

    if (password === "" || wspatt.test(password)) {
      passerrormsg = "Required. Enter Password.";
    } else if (!passpatt.test(password)) {
      passerrormsg = "Password must be between 8 and 16 characters.";
    }

    if (
      fnameerrormsg === "" &&
      lnameerrormsg === "" &&
      collegeerrormsg === "" &&
      emailerrormsg === "" &&
      passerrormsg === ""
    ) {
      try {
        let data = await this.props.addStudentMutation({
          variables: {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            college: college,
          },
        });

        console.log(data);

        if (!data.loading) {
          localStorage.setItem("id", data.data.addStudent._id);
          localStorage.setItem("type", data.data.addStudent.__typename);

          this.setState({
            errormessages: {
              accounterrormsg: "",
            },
          });
        }
      } catch (err) {
        console.log(err.message);
        this.setState({
          errormessages: {
            accounterrormsg: err.message.split(":")[1],
          },
        });
      }
    } else {
      this.setState({
        errormessages: {
          fnameerrormsg,
          lnameerrormsg,
          emailerrormsg,
          passerrormsg,
          collegeerrormsg,
        },
      });
    }
  };

  render() {
    // if sign up then redirect to the student profile
    let redirectVar = null;
    const path = `/student/${localStorage.getItem("id")}`;
    if (localStorage.getItem("type") === "Student") {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="fName">
            <Form.Label className="labels">First Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.fnameChangeHandler}
              placeholder="Enter First Name"
            />
            <p className="errormessage">
              {" "}
              {this.state.errormessages.fnameerrormsg}
            </p>
          </Form.Group>

          <Form.Group controlId="lName">
            <Form.Label className="labels">Last Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.lnameChangeHandler}
              placeholder="Enter Last Name"
            />
            <p className="errormessage">
              {" "}
              {this.state.errormessages.lnameerrormsg}
            </p>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="Email">
              <Form.Label className="labels">Email</Form.Label>
              <Form.Control
                onChange={this.emailChangeHandler}
                type="email"
                placeholder="Enter email"
              />
              <p className="errormessage">
                {" "}
                {this.state.errormessages.emailerrormsg}
              </p>
            </Form.Group>

            <Form.Group as={Col} controlId="Password">
              <Form.Label className="labels">Password</Form.Label>
              <Form.Control
                onChange={this.passwordChangeHandler}
                type="password"
                placeholder="Password"
              />
              <p className="errormessage">
                {" "}
                {this.state.errormessages.passerrormsg}
              </p>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="CollegeName">
            <Form.Label className="labels">College Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.collegeChangeHandler}
              placeholder="Enter College Name"
            />
            <p className="errormessage">
              {" "}
              {this.state.errormessages.collegeerrormsg}
            </p>
          </Form.Group>

          <p className="errormessage">
            {" "}
            {this.state.errormessages.accounterrormsg}
          </p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="loginlink" to="/student/login">
            Already have an account? Sign In
          </Link>
        </Form>
      </div>
    );
  }
}

export default graphql(addStudentMutation, { name: "addStudentMutation" })(
  Signup
);
