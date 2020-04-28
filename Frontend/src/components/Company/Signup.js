import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/Handshakebanner.jpg";
import { graphql, compose } from "react-apollo";
import { addCompanyMutation } from "../mutation/Company/mutations";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      location: "",
      errormessages: {},
    };
  }

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
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

  locationChangeHandler = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  signup = async (e) => {
    e.preventDefault();

    let { name, email, password, location } = this.state;

    let nameerrormsg = "";
    let locationerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";

    // Check that name and college inputs include letters only
    const lettandnumpatt = new RegExp("^[A-Za-z0-9 ]*$");
    const wspatt = new RegExp("^ *$");

    if (name === "" || wspatt.test(name)) {
      nameerrormsg = "Required. Enter Company Name.";
    } else if (!lettandnumpatt.test(name)) {
      nameerrormsg = "Company can include letters and numbers only";
    }

    if (location === "" || wspatt.test(location)) {
      locationerrormsg = "Required. Enter Location.";
    } else if (!lettandnumpatt.test(location)) {
      locationerrormsg = "Location can include letters and numbers only";
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
      nameerrormsg === "" &&
      locationerrormsg === "" &&
      emailerrormsg === "" &&
      passerrormsg === ""
    ) {
      try {
        let data = await this.props.addCompanyMutation({
          variables: {
            name: name,
            email: email,
            password: password,
            location: location,
          },
        });

        console.log(data);

        if (!data.loading) {
          localStorage.setItem("id", data.data.addCompany._id);
          localStorage.setItem("type", data.data.addCompany.__typename);

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
          nameerrormsg,
          emailerrormsg,
          passerrormsg,
          locationerrormsg,
        },
      });
    }
  };

  render() {
    // if sign up then redirect to the company profile
    let redirectVar = null;
    const path = `/company/${localStorage.getItem("id")}`;
    if (localStorage.getItem("type") === "Company") {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.nameChangeHandler}
              placeholder="Enter Company Name"
            />
            <p className="errormessage">
              {" "}
              {this.state.errormessages.nameerrormsg}
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

          <Form.Group controlId="Location">
            <Form.Label className="labels">Location</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.locationChangeHandler}
              placeholder="Enter Location"
            />
            <p className="errormessage">
              {" "}
              {this.state.errormessages.locationerrormsg}
            </p>
          </Form.Group>

          <p className="errormessage">
            {" "}
            {this.state.errormessages.accounterrormsg}
          </p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="signinlink" to="/company/signin">
            Already have an account? Sign In
          </Link>
        </Form>
      </div>
    );
  }
}

export default compose(
  graphql(addCompanyMutation, { name: "addCompanyMutation" })
)(Signup);
