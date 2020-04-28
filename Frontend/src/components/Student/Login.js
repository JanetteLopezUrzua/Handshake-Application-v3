import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/Handshakebanner.jpg";
import { graphql } from "react-apollo";
import { loginStudentMutation } from "../mutation/Student/mutations";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errormessages: {},
    };
  }

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

  login = async (e) => {
    e.preventDefault();

    let { email, password } = this.state;

    let emailerrormsg = "";
    let passerrormsg = "";

    const wspatt = new RegExp("^ *$");

    // Check that email input is valid
    if (wspatt.test(email) || email === "") {
      emailerrormsg = "Required. Enter Email.";
    }

    // password is at least 8 characters and 1 number
    if (wspatt.test(password) || password === "") {
      passerrormsg = "Required. Enter Password.";
    }

    if (email !== "" && password !== "") {
      try {
        let data = await this.props.loginStudentMutation({
          variables: {
            email: email,
            password: password,
          },
        });

        console.log(data);

        if (!data.loading) {
          localStorage.setItem("id", data.data.loginStudent._id);
          localStorage.setItem("type", data.data.loginStudent.__typename);

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
          emailerrormsg,
          passerrormsg,
        },
      });
    }
  };

  render() {
    // if log in then redirect to the student profile
    let redirectVar = null;
    const path = `/student/${localStorage.getItem("id")}`;
    if (localStorage.getItem("type") === "Student") {
      redirectVar = <Redirect to={path} />;
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign In</h2>
        <Form id="signup-form">
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

          <p className="errormessage">
            {" "}
            {this.state.errormessages.accounterrormsg}
          </p>

          <Button onClick={this.login} className="submitbutton" type="submit">
            Sign In
          </Button>

          <Link className="loginlink" to="/student/signup">
            Don&apos;t have an account? Sign Up
          </Link>
        </Form>
      </div>
    );
  }
}

export default graphql(loginStudentMutation, { name: "loginStudentMutation" })(
  Login
);
