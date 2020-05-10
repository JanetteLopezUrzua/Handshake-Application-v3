import React from "react";
import DisplayContactInfo from "./DisplayContactInfo";
import EditContactInfo from "./EditContactInfo";
import { graphql, compose } from "react-apollo";
import { getStudentContactInfoQuery } from "../../../queries/Student/auth_and_profile_queries";
import { updateStudentContactInfoMutation } from "../../../mutation/Student/auth_and_profile_mutations";

class ContactInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      email: "",
      phonenum: "",
      editWasTriggered: false,
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  phoneChangeHandler = (e) => {
    this.setState({
      phonenum: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const numbers = this.state.phonenum.replace(/\D/g, "");

    // Check that email input is valid
    const emailpatt = new RegExp("\\S+@\\S+\\.\\S+");
    const wspatt = new RegExp("^ *$");

    if (wspatt.test(this.state.email)) {
      this.setState({
        errormessage: "Required. Enter Email.",
      });
    } else if (!emailpatt.test(this.state.email)) {
      this.setState({
        errormessage: "Email is not valid.",
      });
    } else if (numbers.length > 10 || numbers.length < 10) {
      this.setState({
        errormessage: "Please enter a 10 digit phone number.",
      });
    } else {
      let { id, email, phonenum } = this.state;

      try {
        let data = await this.props.updateStudentContactInfoMutation({
          variables: {
            id: id,
            email: email.trim(),
            phonenumber: phonenum.trim(),
          },
          refetchQueries: [
            {
              query: getStudentContactInfoQuery,
              variables: { id: this.props.id },
            },
          ],
        });

        console.log(data);

        this.setState({ errormessage: "", editWasTriggered: false });
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  handleCancel = () => {
    this.setState({
      errormessage: "",
      editWasTriggered: false,
    });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let email = null;
    let phonenumber = null;
    if (!data.loading) {
      email = this.props.data.student.email;
      phonenumber = this.props.data.student.phonenumber;
    }

    const { editWasTriggered, errormessage } = this.state;

    let display = "";
    display = (
      <DisplayContactInfo
        id={this.state.id}
        clicked={this.handleClick}
        email={email}
        phonenum={phonenumber}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditContactInfo
          emailchange={this.emailChangeHandler}
          phonechange={this.phoneChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          email={this.state.email}
          phonenum={this.state.phonenum}
          errormessage={errormessage}
        />
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  graphql(getStudentContactInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateStudentContactInfoMutation, {
    name: "updateStudentContactInfoMutation",
  })
)(ContactInformation);
