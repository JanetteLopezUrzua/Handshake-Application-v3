import React from "react";
import DisplayEducation from "./DisplayEducation";
import EditEducation from "./EditEducation";
import { graphql, compose } from "react-apollo";
import { getStudentSchoolsInfoQuery } from "../../../queries/Student/auth_and_profile_queries";
import { updateStudentEducationInfoMutation } from "../../../mutation/Student/auth_and_profile_mutations";

class EducationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      schoolid: "",
      primaryschool: "",
      school: {
        name: props.school.name,
        location: props.school.location,
        degree: props.school.degree,
        major: props.school.major,
        passingmonth: props.school.passingmonth,
        passingyear: props.school.passingyear,
        gpa: props.school.gpa,
      },
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({
    id: props.id,
    schoolid: props.schoolid,
    primaryschool: props.school.primaryschool,
  });

  handleClick = (e) => {
    e.preventDefault();

    this.setState({ editWasTriggered: true });
  };

  schoolNameChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.schoolname = e.target.value;
    this.setState({
      school,
    });
  };

  locationChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.location = e.target.value;
    this.setState({
      school,
    });
  };

  degreeChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.degree = e.target.value;
    this.setState({
      school,
    });
  };

  majorChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.major = e.target.value;
    this.setState({
      school,
    });
  };

  passingMonthChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.passingmonth = e.target.value;
    this.setState({
      school,
    });
  };

  passingYearChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.passingyear = e.target.value;
    this.setState({
      school,
    });
  };

  gpaChangeHandler = (e) => {
    const school = { ...this.state.school };
    school.gpa = e.target.value;
    this.setState({
      school,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    try {
      await this.props.updateStudentEducationInfoMutation({
        variables: {
          id: this.state.id,
          schoolid: this.state.schoolid,
          location: this.state.school.location,
          degree: this.state.school.degree,
          major: this.state.school.major,
          passingmonth: parseInt(this.state.school.passingmonth),
          passingyear: parseInt(this.state.school.passingyear),
          gpa: this.state.school.gpa,
        },
        refetchQueries: [
          {
            query: getStudentSchoolsInfoQuery,
            variables: { id: this.state.id },
          },
        ],
      });

      this.setState({
        editWasTriggered: false,
      });
    } catch (err) {
      console.log(err.message);
      this.setState({
        school: "",
      });
    }
  };

  handleCancel = () => {
    this.setState({
      school: this.props.school,
      editWasTriggered: false,
    });
  };

  handleDelete = () => {
    this.props.delete(this.state.schoolid);

    this.setState({
      editWasTriggered: false,
    });
  };

  render() {
    let display = "";
    display = (
      <DisplayEducation
        id={this.state.id}
        clicked={this.handleClick}
        school={this.state.school}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditEducation
          schoolnamechange={this.schoolNameChangeHandler}
          locationchange={this.locationChangeHandler}
          degreechange={this.degreeChangeHandler}
          majorchange={this.majorChangeHandler}
          passingmonthchange={this.passingMonthChangeHandler}
          passingyearchange={this.passingYearChangeHandler}
          gpachange={this.gpaChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          school={this.state.school}
          delete={this.handleDelete}
        />
      );
    }

    return <>{display}</>;
  }
}

export default compose(
  graphql(getStudentSchoolsInfoQuery, {
    options: (props) => ({ variables: { id: props.id } }),
  }),
  graphql(updateStudentEducationInfoMutation, {
    name: "updateStudentEducationInfoMutation",
  })
)(EducationContainer);
