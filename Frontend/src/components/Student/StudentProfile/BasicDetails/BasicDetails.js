import React from "react";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";
import { graphql, compose } from "react-apollo";
import { getStudentBasicInfoQuery } from "../../../queries/Student/auth_and_profile_queries";
import { updateStudentBasicInfoMutation } from "../../../mutation/Student/auth_and_profile_mutations";

class BasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      fname: "",
      lname: "",
      dob: "",
      city: "",
      state: "",
      country: "",
      editWasTriggered: false,
      fnameerrormessage: "",
      lnameerrormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

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

  dobChangeHandler = (e) => {
    this.setState({
      dob: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  stateChangeHandler = (e) => {
    this.setState({
      state: e.target.value,
    });
  };

  countryChangeHandler = (e) => {
    this.setState({
      country: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    let fnameerrormessage = "";
    let lnameerrormessage = "";

    const wspatt = new RegExp("^ *$");

    if (wspatt.test(this.state.fname.trim())) {
      fnameerrormessage = "Required. Enter First Name.";
    }

    if (wspatt.test(this.state.lname.trim())) {
      lnameerrormessage = "Required. Enter Last Name.";
    }

    if (fnameerrormessage === "" && lnameerrormessage === "") {
      let { id, fname, lname, dob, city, state, country } = this.state;

      try {
        let data = await this.props.updateStudentBasicInfoMutation({
          variables: {
            id: id,
            fname: fname.trim(),
            lname: lname.trim(),
            dob: dob.trim(),
            city: city.trim(),
            state: state.trim(),
            country: country.trim(),
          },
          refetchQueries: [
            {
              query: getStudentBasicInfoQuery,
              variables: { id: this.props.id },
            },
          ],
        });

        console.log(data);

        this.setState({
          fnameerrormessage: "",
          lnameerrormessage: "",

          editWasTriggered: false,
        });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      this.setState({
        fnameerrormessage,
        lnameerrormessage,
      });
    }
  };

  handleCancel = () => {
    this.setState({
      fnameerrormessage: "",
      lnameerrormessage: "",
      editWasTriggered: false,
    });
  };

  render() {
    let data = this.props.data;
    console.log(data);

    let fname = null;
    let lname = null;
    let dob = null;
    let city = null;
    let state = null;
    let country = null;
    if (!data.loading) {
      fname = this.props.data.student.fname;
      lname = this.props.data.student.lname;
      dob = this.props.data.student.dob;
      city = this.props.data.student.city;
      state = this.props.data.student.state;
      country = this.props.data.student.country;
    }

    const {
      editWasTriggered,
      fnameerrormessage,
      lnameerrormessage,
    } = this.state;

    let display = "";
    display = (
      <DisplayInfo
        id={this.state.id}
        clicked={this.handleClick}
        fname={fname}
        lname={lname}
        dob={dob}
        city={city}
        state={state}
        country={country}
      />
    );

    if (editWasTriggered) {
      display = (
        <EditInfo
          fnamechange={this.fnameChangeHandler}
          lnamechange={this.lnameChangeHandler}
          dobchange={this.dobChangeHandler}
          citychange={this.cityChangeHandler}
          statechange={this.stateChangeHandler}
          countrychange={this.countryChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          data={this.state}
          fnameerrormessage={fnameerrormessage}
          lnameerrormessage={lnameerrormessage}
        />
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  graphql(getStudentBasicInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateStudentBasicInfoMutation, {
    name: "updateStudentBasicInfoMutation",
  })
)(BasicDetails);
